const mongoose = require("mongoose");

const mongoURI =  "";
  
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongoDB");
  });
};

module.exports = connectToMongo;