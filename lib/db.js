import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const mongoConnectionURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`

  const mongoConnectionOptions = { useUnifiedTopology: true };

  const client = await MongoClient.connect(mongoConnectionURL, mongoConnectionOptions);
  
  return client;
}
