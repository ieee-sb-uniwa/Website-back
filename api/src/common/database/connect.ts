import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    console.log("Starting MongoDB connection...\n");

    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost:27017/mydatabase"
    );

    // Listen for connection events
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully!");
    });

    console.log("MongoDB Connected\n");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
