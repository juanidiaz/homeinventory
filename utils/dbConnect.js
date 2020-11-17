import mongoose from "mongoose";

/* Loads all variables from .env file to "process.env" */
require("dotenv").config();

const connection = {};

export async function dbConnect() {
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

    // console.log("--- SOURCE FROM --- ", process.env.SOURCE);

    // console.log("-----------------\nVARIABLES\n-----------------\n", {
    //   MONGO_DB: process.env.MONGO_DB,
    //   MONGO_USERNAME: process.env.MONGO_USERNAME,
    //   MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    //   MONGO_URL: process.env.MONGO_URL,
    //   MONGO_FULL_URI: process.env.MONGO_FULL_URI,
    //   JWT_SECRET: process.env.JWT_SECRET,
    //   JWT_maxAge: process.env.JWT_maxAge,
    //   Cookie_maxAge: process.env.Cookie_maxAge,
    //   AWSSecretKey : process.env.AWSSecretKey,
    //   AWSAccessKeyId : process.env.AWSAccessKeyId,
    //   AWSfiles_BucketRegion : process.env.AWSfiles_BucketRegion,
    //   AWSfiles_BucketName : process.env.AWSfiles_BucketName
    // });

    // console.log("--- ATTEMPING DB CONNECTION TO: ", connectionString);

    const db = await mongoose.connect(connectionString, mongooseOptions);

    connection.isConnected = db.connections[0].readyState;

  } catch (error) {
    console.log("Error connecting to DB", error);
  }

};

export async function dbDisconnect() {
  mongoose.connection.close();
};
