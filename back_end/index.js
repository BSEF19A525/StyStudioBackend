const cors = require("cors");
const express = require("express");
const app = express();
const multer = require("multer");
const connectDB = require("./connection/connection");
const SalonOwner = require("./models/ownerSchema");

connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// middleware to allow different ports to share data
app.use(cors());

const upload = multer({ dest: "public/uploads/" });

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

app.listen(8000, () => {
  console.log("Server Started Successfully");
});
