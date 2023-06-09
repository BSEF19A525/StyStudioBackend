require('dotenv').config();
const cors = require("cors");
const fs = require("fs");
const express = require("express");
const app = express();
const multer = require("multer");
const connectDB = require("./connection/connection");
const SalonOwner = require("./models/ownerSchema");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticate = require("./authentication/authenticate");
const cookieParser = require("cookie-parser");




connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// middleware to allow different ports to share data
app.use(
  cors({
    origin: "http://localhost:3000",
    //exposedHeaders: ['jwtoken'], // Expose the custom token header
    credentials: true, // cookies to be included in the request
  })
);

app.use(router);

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
  console.log(req.body);

  try {
    const user = await SalonOwner.findOne({ email: email });

    if (user && user.pass == pass) {
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        // httpOnly:true,
        //secure: false, // For HTTPS connections
        sameSite: "lax", // Allow cross-site access
        path: "/", // Set the cookie to be accessible from the root path
      });
      res.cookie("user", user.username, {
        sameSite: "lax",
        path: "/",
      });
      // console.log(
      //   "cookie has been saved successfully : ",
      //   res.get("Set-Cookie")
      // );
      res.status(200).json({ msg: "Login Successfull" });
      // this below line is causing app crash because we are sending multiple responses for same request
      // 1st one ---> Login msg
      // 2nd one ---> redirecting towards another page
      // so their is a conflict here

      // res.redirect("/individual");  // I have commented this line, better approach is to handle redirection based on client-side (react)
    } else {
      res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/logout", (req, res) => {
  try {
    //console.log("Inside the logout page");
    res.clearCookie("jwtoken", { path: "/" });
    res.clearCookie("user", { path: "/" });
   // res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    //res.header('Pragma', 'no-cache');
    //res.header('Expires', '0');
    console.log("logged out successfully");
    res.status(200).send("User logged out");
    

  } catch (error) {
    console.log(error);
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

// authenticating user
// router.get("/individual", authenticate, (req, res) => {
//   // console.log("Inside Individual page");
//   // console.log("Individual user : ", req.rootUser.username);
//   res.send("http://localhost:3000/individual", {
//     name: req.rootUser.username,
//   });
// });

// Ali Malik Code
router.get("/individual", authenticate, (req, res) => {
  res.json({ name: req.rootUser.username });
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

// app.get("/book/:salonName", async (req, res) => {
//   const { salonName } = req.params;
//   console.log(salonName);

//   try {
//     const salon = await SalonOwner.find({ salonName });
//     if (!salon) {
//       res.status(404).json({ msg: "No Such Salon" });
//     }
//     // const salonsData = salon.data;
//     res.status(200).json(salon);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// });

app.listen(8000, () => {
  console.log("The Server Started Successfully");
});
