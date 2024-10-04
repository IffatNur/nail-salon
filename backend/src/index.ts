import express, {  Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { ObjectId } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express()
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors())
app.use(express.json())

declare module "express-serve-static-core" {
  interface Request {
    decoded?: any;
  }
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ypkrnke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const servicesCollection = client.db('nailSalonDB').collection('services');
    const reviewsCollection = client.db('nailSalonDB').collection('reviews')
    const appointmentCollection = client.db('nailSalonDB').collection('appointments');
    const userCollection = client.db('nailSalonDB').collection('users');
    const paymentCollection = client.db('nailSalonDB').collection('payment-history');

    app.post('/jwt', async(req: Request,res:Response) =>{
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'} );
      // console.log(token);
      res.send({token})
    })

    // middleware: token verify
    const verifyToken = (req:Request,res:Response,next: NextFunction) => {
      // console.log("inside verify token", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(404).send({ message: "Forbidden Access" });
      }
      const token = req.headers.authorization.split(' ')[1]
        jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET,
          (err: Error, decoded: any) => {
            if (err) {
              return res.status(401).send({ message: "Unauthorized access" });
            }
            req.decoded = decoded;
            next();
          }
        );
    };

    // middleware: to verify admin
    const verifyAdmin = async(req: Request,res: Response,next: NextFunction) =>{
      const email = req.decoded.email;
      const query = {email: email}; 
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === 'admin';
      if(!isAdmin){
        return res.status(403).send({ message: "Forbidden access" });
      }
      next()
    }

    // STRIPE 
    app.post("/create-payment-intent", async(req: Request,res:Response) =>{
      const {cost} = req.body;
      const amount = parseInt(cost) * 100

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({clientSecret: paymentIntent.client_secret})
    });

    // SSLcommerz 
    app.post('/create-ssl-payment', async(req, res) =>{
      const details = req.body;
      res.send('ssl payment')
    })

    app.post('/payment-history',verifyToken, async(req: Request, res:Response) =>{
      const paymentDetails = req.body;
      console.log(paymentDetails);
      const result = await paymentCollection.insertOne(paymentDetails);
      const query = {
        _id: {
          $in:
            paymentDetails.appointmentIds.map((id: string) => new ObjectId(id)),
        },
      };
      const deletedAppointments = await appointmentCollection.deleteMany(query)
      res.send({result,deletedAppointments})
    })

    app.get("/payment-history/:id",verifyToken, async(req: Request,res:Response) =>{
      const email = req.params.id;
      const query = {clientEmail: email};
      const result = await paymentCollection.find(query).toArray();
      res.send(result)
    });

    app.get("/users/admin/:email",verifyToken, async (req: Request, res: Response) => {
      const email = req.params.email;
      const decodedEmail = req.decoded?.email;
      if(email !== decodedEmail){
        res.status(403).send({message: 'Unauthorized access '})
      }
      let isAdmin = false;
      const query = {email: email} ;
      const user = await userCollection.findOne(query);
      if(user?.role === 'admin'){
        isAdmin = true
      }else{
        isAdmin = false
      }
      res.send({isAdmin})
    });

    app.get('/admin-stat',verifyToken,verifyAdmin, async(req: Request,res:Response )=>{
      const users = await userCollection.estimatedDocumentCount()
      const services = await servicesCollection.estimatedDocumentCount()
      const appointments = await appointmentCollection.estimatedDocumentCount()
      const result = await paymentCollection.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalCost",
            },
          },
        },
      ]).toArray();
      const revenue = result.length > 0 ?result[0].totalRevenue : 0
      res.send({users,services,appointments, revenue})
    })

    app.get('/revenue-stats', verifyToken,verifyAdmin, async(req: Request,res:Response) =>{
      const result = await paymentCollection
        .aggregate([
          {
            $unwind: "$serviceIds", //distruct the serviceIds of payment collection
          },
          {
            $addFields: {
              serviceIds: { $toObjectId: "$serviceIds" }, // convert the serviceIds of payment collection as ObjectID(id) to match with service table's _id whic is form of ObjectID(id)
            },
          },
          {
            $lookup: {
              from: "services", // Lookup the "services" table
              localField: "serviceIds", // Field from payment_history
              foreignField: "_id", // Field from services table
              as: "allServices",
            },
          },
          {
            $unwind: "$allServices", //to bring the matched ids out of array
          },
          {
            $group: {
              _id: "$allServices.service_category", //group by service category
              totalQuantity: { $sum: 1 }, //calculate the qunatity of each category sold/booked
              totalAmount: { $sum: "$allServices.cost" },
            },
          },
          {
            $project: {
              _id: 0, //to discard _id in $group (0 means discard the field)
              service_category: "$_id", //to rename _id as service_cateogry
              totalQuantity: 1, //1 means keep the field
              totalAmount: 1,
            },
          },
        ])
        .toArray();
      res.send(result)
    })

     app.get("/services", async (req: Request, res:Response) => {
       const result = await servicesCollection.find().toArray();
       res.send(result);
     });

     app.get('/services/:id', async(req: Request,res:Response) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await servicesCollection.findOne(query);
      res.send(result)
     })

    app.post('/addservice', verifyToken, verifyAdmin, async(req: Request,res:Response) =>{
      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      res.send(result)
    })

    app.delete('/service/:id',verifyToken, verifyAdmin, async(req: Request,res:Response) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await servicesCollection.deleteOne(query);
      res.send(result)
    })

    // PENDING UPDATE SERVICE

    // app.patch('/service/:id',verifyToken,verifyAdmin, async(req: Request,res:Response) =>{
    //   const update = req.body;
    //   const id = req.params.id;
    //   console.log(id,update);
    //   const filter = {_id: new ObjectId(id)};
    //   const updateDoc = {
    //     $set: {
    //       service_category: update.service_category,
    //       cost: update.cost,
    //       image: update.image,
    //     },
    //   };
    //   const result = await servicesCollection.updateOne(filter, updateDoc);
    //   res.send(result)
    // })
    
    app.get('/users',verifyToken,verifyAdmin, async(req : Request ,res: Response) =>{
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    app.delete("/users/:id", verifyToken, verifyAdmin, async (req: Request, res:Response) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/users/:id", verifyToken, verifyAdmin, async (req: Request, res:Response) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const options = { upsert: true };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    
    app.post('/users', async(req: Request,res:Response) =>{
      const user = req.body;
      const query = {email: user.email}
      const userExists = await userCollection.findOne(query);
      if(userExists){
        return res.send({message: 'User Already Exists'})
      }
      const result = await userCollection.insertOne(user);
      res.send(result)
    })

    app.get('/reviews', async(req: Request,res:Response) =>{
      const result = await reviewsCollection.find().toArray();
      res.send(result)
    })

    app.get('/appointments',async(req: Request,res:Response) =>{
      const email = req.query.email;
      const query = {email: email}
      const result = await appointmentCollection.find(query).toArray();
      res.send(result)
    })

    app.post('/appointments', async(req: Request,res:Response) =>{
      const appointmentDetails = req.body;
      if(appointmentDetails.email){
        const result = await appointmentCollection.insertOne(appointmentDetails)
        res.send(result)
      }
    })

    app.delete('/appointments/:id',async(req: Request,res:Response) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await appointmentCollection.deleteOne(query);
      res.send(result)
    })
    
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req: Request,res:Response )=>{
    res.send('Server is running');
})
app.listen(port, () =>{
    console.log('server running', port);
})