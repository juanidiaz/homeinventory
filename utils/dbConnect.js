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

    console.log("VARIABLES", {
      MONGO_DB: process.env.MONGO_DB,
      MONGO_USERNAME: process.env.MONGO_USERNAME,
      MONGO_PASSWORD: process.env.MONGO_PASSWORD,
      MONGO_URL: process.env.MONGO_URL,
      MONGO_FULL_URI: process.env.MONGO_FULL_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_maxAge: process.env.JWT_maxAge,
      Cookie_maxAge: process.env.Cookie_maxAge
    });

    console.log("--- ATTEMPING DB CONNECTION TO: ", connectionString);

    const db = await mongoose.connect(connectionString, mongooseOptions);

    connection.isConnected = db.connections[0].readyState;

  } catch (error) {
    console.log("Error connecting to DB", error);
  }

}