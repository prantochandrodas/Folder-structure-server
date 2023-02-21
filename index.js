const express = require("express");
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
//middleware
app.use(cors());
app.use(express.json());
// rNU4XgUWUGCQEFEi
// folderstructuredb

const uri = "mongodb+srv://folderstructuredb:rNU4XgUWUGCQEFEi@cluster0.pbafkul.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const foldersCollection = client.db('foldersdb').collection('folders');
    //add watch later collection
    app.post('/folder', async (req, res) => {
      const folder = req.body;
      console.log(folder);
      const result = await foldersCollection.insertOne(folder);
      res.send(result);
    });
    app.get('/folders', async (req, res) => {
      const query = {};
      const result = await foldersCollection.find(query).toArray();
      res.send(result);
    })

    //myOrder delete 
    app.delete('/folders/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id:new ObjectId(id) };
      const result = await foldersCollection.deleteOne(query);
      res.send(result);
    });
  } finally {

  }
}
run().catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('server is running');
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})