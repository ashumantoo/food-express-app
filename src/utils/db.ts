import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1gkcp.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority` as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose)
      .catch(error => {
        console.log("Error while connecting mongodb", error);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
