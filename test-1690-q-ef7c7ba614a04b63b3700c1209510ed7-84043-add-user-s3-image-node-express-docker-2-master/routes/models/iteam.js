const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
   origin_image_url: {
    type: String,
    required: true,
  },
 
});

