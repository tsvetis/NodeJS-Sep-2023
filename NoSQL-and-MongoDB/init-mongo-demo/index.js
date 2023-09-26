const mongodb = require("mongodb");

const connectionString = "mongodb://localhost:27017"; // mongodb://127.0.0.1:27017
const clinet = new mongodb.MongoClient(connectionString);

async function connectDb() {
  clinet.connect();

  const db = clinet.db("DogsDB");
  const dogs = db.collection("dogs");

  const result = await dogs.find().toArray();
  console.log(result);
}

connectDb();
