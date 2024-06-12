require('dotenv').config();
const mongoose = require('mongoose');


const dbConnection = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined. Check your .env file.");
    process.exit(1); // Exit process with failure
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }
  );
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = dbConnection;
