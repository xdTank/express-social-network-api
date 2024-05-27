import { MongoClient } from "mongodb";
import { User } from "../domein/users-service";


const uri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";
export const client = new MongoClient(uri);
export const usersCollection = client.db('users').collection<User>('users')

export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("users").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);