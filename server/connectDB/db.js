const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.log("DB connection failed");
  }
};

module.exports = connectDB;
