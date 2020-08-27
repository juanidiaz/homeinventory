import mongoose from 'mongoose';

const connection = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

  const db = await mongoose.connect(process.env.MONGO_URI, mongooseOptions);

  connection.isConnected = db.connections[0].readyState;
  console.log("Connection status", connection.isConnected);

}