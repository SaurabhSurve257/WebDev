// const mongoose = require('mongoose');
import mongoose from "mongoose";

// MongoDB Atlas connection string
const uri =
  "mongodb://saurabhsurve257_db_user:yMqJU95YURLUWGY2@ac-iuviww8-shard-00-00.rklrmlf.mongodb.net:27017,ac-iuviww8-shard-00-01.rklrmlf.mongodb.net:27017,ac-iuviww8-shard-00-02.rklrmlf.mongodb.net:27017/?ssl=true&replicaSet=atlas-obuglc-shard-0&authSource=admin&appName=Cluster0";

// Function to connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
};

// Call connection
connectDB();

// Add your application logic here