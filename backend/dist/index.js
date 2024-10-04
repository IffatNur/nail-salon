"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = (0, express_1.default)();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5002;
dotenv_1.default.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ypkrnke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            // await client.connect();
            const servicesCollection = client.db('nailSalonDB').collection('services');
            const reviewsCollection = client.db('nailSalonDB').collection('reviews');
            const appointmentCollection = client.db('nailSalonDB').collection('appointments');
            const userCollection = client.db('nailSalonDB').collection('users');
            const paymentCollection = client.db('nailSalonDB').collection('payment-history');
            app.post('/jwt', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const user = req.body;
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                // console.log(token);
                res.send({ token });
            }));
            // middleware: token verify
            const verifyToken = (req, res, next) => {
                // console.log("inside verify token", req.headers.authorization);
                if (!req.headers.authorization) {
                    return res.status(404).send({ message: "Forbidden Access" });
                }
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return res.status(401).send({ message: "Unauthorized access" });
                    }
                    req.decoded = decoded;
                    next();
                });
            };
            // middleware: to verify admin
            const verifyAdmin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const email = req.decoded.email;
                const query = { email: email };
                const user = yield userCollection.findOne(query);
                const isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin';
                if (!isAdmin) {
                    return res.status(403).send({ message: "Forbidden access" });
                }
                next();
            });
            app.post("/create-payment-intent", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const { cost } = req.body;
                const amount = parseInt(cost) * 100;
                const paymentIntent = yield stripe.paymentIntents.create({
                    amount: amount,
                    currency: "usd",
                    payment_method_types: ["card"],
                });
                res.send({ clientSecret: paymentIntent.client_secret });
            }));
            app.post('/payment-history', verifyToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const paymentDetails = req.body;
                console.log(paymentDetails);
                const result = yield paymentCollection.insertOne(paymentDetails);
                const query = {
                    _id: {
                        $in: paymentDetails.appointmentIds.map((id) => new mongodb_1.ObjectId(id)),
                    },
                };
                const deletedAppointments = yield appointmentCollection.deleteMany(query);
                res.send({ result, deletedAppointments });
            }));
            app.get("/payment-history/:id", verifyToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const email = req.params.id;
                const query = { clientEmail: email };
                const result = yield paymentCollection.find(query).toArray();
                res.send(result);
            }));
            app.get("/users/admin/:email", verifyToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const email = req.params.email;
                const decodedEmail = (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.email;
                if (email !== decodedEmail) {
                    res.status(403).send({ message: 'Unauthorized access ' });
                }
                let isAdmin = false;
                const query = { email: email };
                const user = yield userCollection.findOne(query);
                if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
                    isAdmin = true;
                }
                else {
                    isAdmin = false;
                }
                res.send({ isAdmin });
            }));
            app.get('/admin-stat', verifyToken, verifyAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const users = yield userCollection.estimatedDocumentCount();
                const services = yield servicesCollection.estimatedDocumentCount();
                const appointments = yield appointmentCollection.estimatedDocumentCount();
                const result = yield paymentCollection.aggregate([
                    {
                        $group: {
                            _id: null,
                            totalRevenue: {
                                $sum: "$totalCost",
                            },
                        },
                    },
                ]).toArray();
                const revenue = result.length > 0 ? result[0].totalRevenue : 0;
                res.send({ users, services, appointments, revenue });
            }));
            app.get('/revenue-stats', verifyToken, verifyAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield paymentCollection
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
                res.send(result);
            }));
            app.get("/services", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield servicesCollection.find().toArray();
                res.send(result);
            }));
            app.get('/services/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield servicesCollection.findOne(query);
                res.send(result);
            }));
            app.post('/addservice', verifyToken, verifyAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const service = req.body;
                const result = yield servicesCollection.insertOne(service);
                res.send(result);
            }));
            app.delete('/service/:id', verifyToken, verifyAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield servicesCollection.deleteOne(query);
                res.send(result);
            }));
            // PENDING UPDATE SERVICE
            // app.patch('/service/:id',verifyToken,verifyAdmin, async(req,res) =>{
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
            app.get('/users', verifyToken, verifyAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield userCollection.find().toArray();
                res.send(result);
            }));
            app.delete("/users/:id", verifyToken, verifyAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield userCollection.deleteOne(query);
                res.send(result);
            }));
            app.patch("/users/:id", verifyToken, verifyAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const filter = { _id: new mongodb_1.ObjectId(id) };
                const updateDoc = {
                    $set: {
                        role: "admin",
                    },
                };
                const options = { upsert: true };
                const result = yield userCollection.updateOne(filter, updateDoc, options);
                res.send(result);
            }));
            app.post('/users', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const user = req.body;
                const query = { email: user.email };
                const userExists = yield userCollection.findOne(query);
                if (userExists) {
                    return res.send({ message: 'User Already Exists' });
                }
                const result = yield userCollection.insertOne(user);
                res.send(result);
            }));
            app.get('/reviews', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield reviewsCollection.find().toArray();
                res.send(result);
            }));
            app.get('/appointments', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const email = req.query.email;
                const query = { email: email };
                const result = yield appointmentCollection.find(query).toArray();
                res.send(result);
            }));
            app.post('/appointments', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const appointmentDetails = req.body;
                if (appointmentDetails.email) {
                    const result = yield appointmentCollection.insertOne(appointmentDetails);
                    res.send(result);
                }
            }));
            app.delete('/appointments/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield appointmentCollection.deleteOne(query);
                res.send(result);
            }));
        }
        finally {
        }
    });
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.listen(port, () => {
    console.log('server running', port);
});
//# sourceMappingURL=index.js.map