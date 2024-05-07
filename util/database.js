import { MongoClient } from 'mongodb';
const url =
  'mongodb+srv://kwgon0102:rladnrhs2@cluster0.gw34ewa.mongodb.net/nextjs?retryWrites=true&w=majority&appName=Cluster0';
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
