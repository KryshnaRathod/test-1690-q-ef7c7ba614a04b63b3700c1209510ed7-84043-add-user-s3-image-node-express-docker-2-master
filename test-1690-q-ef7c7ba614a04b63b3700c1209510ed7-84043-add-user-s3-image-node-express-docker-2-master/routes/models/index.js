const connectToMongo = require("./db");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const Item = require("./models/Item");
const User = require("./models/User");

connectToMongo();
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// ENDPOINT 1: Get all the items using: GET "/fetchallitems",
app.get("/fetch", async (req, res) => {
  try {
    const items = await Item.find();
    await res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Saving the uploaded images

// creating storage for file
const storage = multer.diskStorage({
  destination: "",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Define middleware
const middleware = {
  validationMiddleware: [
    body("name", "name must be between 5 to 50 character").isLength({
      min: 5,
      max: 50,
    }),
    body("email", "email must be between 3 to 50 character").isLength({
        min: 5,
        max: 50,
      }),
      body("phonenumber", "phonenumber must be between 10 to 10 character").isLength({
        min: 10,
        max: 10,
      }),
      body("orig_image_url", " ").isLength({
       
      }),
   
    body("price", "Please provide valid price").isInt({ min: 0 }),
  ],
//   upload: multer({
//     storage: storage,
//   }).single("image"),
};

app.use(express.static(__dirname + "../e_shopping/public/upload"));

// ENDPOINT 2: Add a new item using: POST "/additem"
app.post(
  "/additem",
  [middleware.validationMiddleware, middleware.upload],
  async (req, res) => {
    try {
      const { name, email, phone_number, orig_image_url } = req.body;
      // const { image } = req.file;
      const image =
        "https://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-sample/sample-user.png";

      // console.log(title + "  " + image);

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const item = new Item({
        name,
        email,
        phone_number,
        orig_image_url,
        
      });
      const savedNote = await item.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// module.exports = mongoose.model("items", ItemsSchema);
// {
//     "name": "",               ----------------> string, required
//     "email": "",              ----------------> string, required, should be unique
//     "phone_number":           ----------------> number, required, equal to 10 digits
//     "orig_image_url": "",     ----------------> string, required
    
// } 