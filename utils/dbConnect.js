import mongoose from "mongoose";

/* Loads all variables from .env file to "process.env" */
require("dotenv").config();

const connection = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const mongooseOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };

    const connectionString = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_URL + "/" + process.env.MONGO_DB + "?retryWrites=true&w=majority"

    console.log("--- SOURCE FROM --- ", process.env.SOURCE);
    console.log("--- ATTEMPING DB CONNECTION TO: ", connectionString);

    const db = await mongoose.connect(connectionString, mongooseOptions);

    connection.isConnected = db.connections[0].readyState;

  } catch (error) {
    console.log("Error connecting to DB", error);
  }

}