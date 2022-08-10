import mongoose from "mongoose";
import env from "./env.js";

const serverURL = `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@cluster0.hjcm0.mongodb.net/linkStore?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    await mongoose.connect(serverURL);
    console.log("Connected to database server");
  } catch (error) {
    console.log("Fail to connect to database server: " + error);
  }
};

export default connect;
