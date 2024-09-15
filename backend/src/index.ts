import express, {  Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { ObjectId } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express()
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5002
dotenv.config();

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
    await client.connect();

    const servicesCollection = client.db('nailSalonDB').collection('services');
    const reviewsCollection = client.db('nailSalonDB').collection('reviews')
    const appointmentCollection = client.db('nailSalonDB').collection('appointments');
    const userCollection = client.db('nailSalonDB').collection('users')

    app.post('/jwt', async(req,res) =>{
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
      }
      res.send({isAdmin})
    });

    app.post('/addservice', verifyToken, verifyAdmin, async(req,res) =>{
      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      res.send(result)
    })
    
    app.get('/users',verifyToken,verifyAdmin, async(req : Request ,res: Response) =>{
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
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
    
    app.post('/users', async(req,res) =>{
      const user = req.body;
      const query = {email: user.email}
      const userExists = await userCollection.findOne(query);
      if(userExists){
        return res.send({message: 'User Already Exists'})
      }
      const result = await userCollection.insertOne(user);
      res.send(result)
    })

    app.get('/services' , async(req,res) =>{
        const result = await servicesCollection.find().toArray();
        res.send(result)
    })

    app.get('/reviews', async(req,res) =>{
      const result = await reviewsCollection.find().toArray();
      res.send(result)
    })

    app.get('/appointments', async(req,res) =>{
      const email = req.query.email;
      const query = {email: email}
      const result = await appointmentCollection.find(query).toArray();
      res.send(result)
    })

    app.post('/appointments', async(req,res) =>{
      const appointmentDetails = req.body;
      if(appointmentDetails.email){
        const result = await appointmentCollection.insertOne(appointmentDetails)
        res.send(result)
      }
    })

    app.delete('/appointments/:id',async(req,res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await appointmentCollection.deleteOne(query);
      res.send(result)
    })
    
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req,res )=>{
    res.send('Server is running');
})
app.listen(port, () =>{
    console.log('server running', port);
})