const cors = require("cors");
const fs = require("fs");
const express = require("express");
const app = express();
const multer = require("multer");
const connectDB = require("./connection/connection");
const SalonOwner = require("./models/ownerSchema");

const client = connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// middleware to allow different ports to share data
app.use(cors());

const upload = multer({ dest: "public/uploads/" });
// Signup
app.post("/signup", upload.single("profileImg"), async (req, res) => {
  const { username, email, pass, cpass, salonName, location, description } =
    req.body;
  const file = req.file;
  const imageUrl = file.filename;
  console.log(imageUrl);
  const alreadyExist = await SalonOwner.findOne({ email: email });

  if (alreadyExist) {
    return res.status(422).json({ msg: "User with same email already exists" });
  } else {
    try {
      const user = new SalonOwner({
        username,
        email,
        pass,
        cpass,
        salonName,
        location,
        description,
        profileImg: imageUrl,
      });
      const isSaved = await user.save();
      res.status(200).json({ msg: "user is registered successfully" });
    } catch (error) {
      console.log("Error in inserting record", error);
    }
  }
});
// Login
app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await SalonOwner.findOne({ email: email });
    console.log(user);
    if (user && user.pass == pass) {
      res.status(200).json({ msg: "Login Successfull" });
    } else {
      res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// this code is working fine
// app.get("/image/:filename", (req, res) => {
//   const filename = req.params.filename;
//   const imagePath = `${__dirname}/public/uploads/${filename}`;

//   // Check if the file exists
//   if (fs.existsSync(imagePath)) {
//     // Set the appropriate content type
//     res.setHeader("Content-Type", "image/jpeg");

//     // Send the image file as a response
//     res.sendFile(imagePath);
//   } else {
//     // Return a 404 response if the file doesn't exist
//     res.status(404).json({ msg: "Image not found" });
//   }
// });

app.listen(8000, () => {
  console.log("Server Started Successfully");
});
