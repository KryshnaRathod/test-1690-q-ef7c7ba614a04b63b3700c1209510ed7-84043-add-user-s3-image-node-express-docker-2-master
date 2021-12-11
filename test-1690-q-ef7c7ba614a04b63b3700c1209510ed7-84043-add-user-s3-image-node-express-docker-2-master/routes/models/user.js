const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
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
  orig_image_url: {
     type: String,
    required: true,
  },
  s3_image_url: {
    type: String,
   required: true,
 },
});

// module.exports = mongoose.model("user", UserSchema);
// {
//     "_id": ,                   ---------------> string
//     "name": "",
//     "email": "",
//     "phone_number":
//     "orig_image_url": "",
//     "s3_image_url": ""        ----------------> S3 Url(ex: s3://codejudge-question-artifacts/q-sample/sample-user.png)
// } 