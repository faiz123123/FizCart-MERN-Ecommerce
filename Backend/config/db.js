const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI is not set. Skipping MongoDB connection for now.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.error("Mongo connection failed:", error.message);
  }
};

module.exports = connectDB;
