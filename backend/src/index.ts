import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express()
const port = process.env.PORT || 5001
dotenv.config();

// middleware
app.use(cors())
app.use(express.json())


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