const cors = require("cors");
const fs = require("fs");
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

// app.get("/api/data", async (req, res) => {
//   try {
//     const data = await SalonOwner.find();
//     const { _id, username, salonName, location, description, profileImg } =
//       data;

//     console.log(profileImg);
//   } catch (error) {
//     console.log("Error fetching data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/api/data", async (req, res) => {
  try {
    const data = await SalonOwner.find();

    const salonDataArray = data.map((owner) => ({
      _id: owner._id,
      username: owner.username,
      salonName: owner.salonName,
      location: owner.location,
      description: owner.description,
      profileImg: owner.profileImg,
    }));

    res.status(200).json(salonDataArray);
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// for fetching image data
app.get("/api/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = `${__dirname}/public/uploads/${filename}`;

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
});

// for searching salon based on location

app.get("/api/data/:location", async (req, res) => {
  const { location } = req.params;
  const area = decodeURIComponent(location);
  const searchLocation = area.toLowerCase();
  console.log(searchLocation); // Output: model town

  try {
    const salons = await SalonOwner.find({
      location: { $regex: searchLocation, $options: "i" },
    });

    if (salons.length === 0) {
      return res
        .status(404)
        .json({ msg: "No salons found in the specified location" });
    }

    res.status(200).json(salons);
  } catch (error) {
    if (error.name === "CastError") {
      // Handle the case when the provided location is not a valid search parameter
      return res.status(400).json({ msg: "Invalid search location" });
    }
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// for fetching salon email based on name

app.get("/book/:salonName", async (req, res) => {
  let { salonName } = req.params;
  salonName = new RegExp(`^${salonName}$`, "i"); // Case-insensitive regular expression

  console.log(salonName);

  try {
    const salon = await SalonOwner.findOne({ salonName });
    if (!salon) {
      return res.status(404).json({ msg: "No Such Salon" });
    }

    res.status(200).json(salon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


//change password logic 
// get email of owner and match with db email
app.get("/changePass/:email", async (req, res) => {
  let { email } = req.params;
  // salonemail = new RegExp(`^${email}$`, "i"); // Case-insensitive regular expression

  console.log(email);
  try {
    const salonmail = await SalonOwner.findOne({ email });
    if (!salonmail) {
      console.log("NO such data found")
      return res.status(404).json({ msg: "No Such Data found" });
    }
    res.status(200).json(salonmail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
})

//post new password in place of old password
app.post('/changePass', async (req, res) => {
  try {
    const { email, newpass } = req.body;

    // Retrieve the user from the database based on the email
    const user = await SalonOwner.findOne({ email });
    if (!user) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }
    // Assign the new password to the user
    user.pass = newpass;
    user.cpass=newpass;
    // Save the updated user record back to the database
    await user.save();
    // Password updated successfully
    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server error' });
  }
});


app.listen(8000, () => {
  console.log("Server Started Successfully");
});