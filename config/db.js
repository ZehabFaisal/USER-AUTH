const mongoose = require('mongoose');
require('dotenv').config();

const connect_DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Successfully!');
  } 
  catch (error) {
    console.error('Error! connecting to MongoDB occurred:', error);
    process.exit(1);
  }
};

module.exports = connect_DB;