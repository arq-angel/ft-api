import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/finance_tracker";

export const conMongoDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    conn && console.log("mongoDb connected");
  } catch (error) {
    console.log(error);
  }
};
