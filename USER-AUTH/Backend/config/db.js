const mongoose = require('mongoose');
require('dotenv').config();
let cachedDb = null;

const connect_DB = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    cachedDb = db;
    console.log('Connected to MongoDB Successfully!');
    return db;
  } 
  catch (error) {
    console.error('Error! connecting to MongoDB occurred:', error);
    process.exit(1);
  }
};

module.exports = connect_DB;