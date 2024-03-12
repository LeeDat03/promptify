import mongoose from "mongoose";

let isconnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isconnected) {
    console.log("MongoDB is already connected!");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "share_prompt",
    });
    isconnected = true;
    console.log("Connected to DB!");
  } catch (err) {
    console.error(err);
  }
};
