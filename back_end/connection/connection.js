const mongoose = require("mongoose");

const DB =
  "mongodb+srv://aliabbas:ialimalik66@cluster0.g2v370k.mongodb.net/stystudio?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const response = await mongoose.connect(DB);
    console.log("Successfully Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
