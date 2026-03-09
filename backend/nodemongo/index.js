//const mongoose = require('mongoose');
import mongoose from 'mongoose';

// Replace with your MongoDB Atlas connection string
const uri = 'mongodb+srv://saurabhsurve257_db_user:yMqJU95YURLUWGY2@cluster0.uktkeqp.mongodb.net/?appName=Cluster0';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Add your application logic here