import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

let client;
let clientPromise: any;

if (!process.env.NEXT_MONGODB_URI) {
  throw new Error("Invalid/Missing environment: 'MONGODB_URI'");
}

const uri = process.env.NEXT_MONGODB_URI;

if (process.env.NODE_ENV === process.env.NEXT_AUTH_ENVIRONMENT) {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
