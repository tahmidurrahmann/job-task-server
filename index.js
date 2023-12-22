const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process?.env?.DB_USER}:${process?.env?.DB_PASS}@cluster0.glcj3l3.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const taskCollection = client.db("jobTask").collection("tasks");

    app.post("/createTask", async (req, res) => {
      const taskData = req?.body;
      const result = await taskCollection.insertOne(taskData);
      res.send(result);
    })

    app.get("/previousTask", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    })

    app.delete("/taskDelete/:id", async (req, res) => {
      const id = req?.params?.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    })

    app.put("/updateTask/:id", async (req, res) => {
      const updatedData = req?.body;
      const id = req?.params?.id;
      const filter = {_id : new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set : {
          ...updatedData
        }
      }
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    app.put("/statusChange/:id", async (req, res) => {
      const updatedData = req?.body;
      const id = req?.params?.id;
      const filter = {_id : new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set : {
          ...updatedData
        }
      }
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

  } finally {
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Job Task Server is getting me a Job")
})

app.listen(port, () => {
  console.log(`Job Task Server is getting me a job on port ${port}`);
})