const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://genius-car-project:DLD5jmuhw5tjNO5K@cluster0.lp833.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const userCollection = client
      .db("a1_steel")
      .collection("calculated_users_data", );
    const itemCollection = client
      .db("a1_steel")
      .collection("item", );

    app.get("/calculation", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/items", async (req, res) => {
      const query = {};
      const cursor = itemCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.post('/calculation', async(req,res) => {
        const data = req.body;
        const result = await userCollection.insertOne(data);
        res.send(result);
      })
    app.post('/items', async(req,res) => {
        const data = req.body;
        const result = await itemCollection.insertOne(data);
        res.send(result);
      })

    app.get("/calculation/:id", async(req,res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const user = await userCollection.findOne(query);
      res.send(user);
    })
    app.post('/calculation', async(req,res) => {
      const data = req.body;
      const result = await userCollection.insertOne(data);
      res.send(result);
    })
    app.delete('/calculation/:id', async(req,res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(port, () => {
  console.log("Listening port", port);
});
