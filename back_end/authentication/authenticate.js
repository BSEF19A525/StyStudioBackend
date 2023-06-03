const jwt = require("jsonwebtoken");
const user = require("../models/ownerSchema");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");



  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:3000', 
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // cookies to be included in the request
  }));

const Authenticate = async (req,res,next) =>{
    try{
       
        console.log("inside authenticate");
        console.log(req.cookies);
        const token = req.cookies.jwtoken;
        console.log("token in authentication" , token);
        const verifyToken = jwt.verify(token,"Q68WR2IVEIV898skfbbsif8777we8rbkbfbfsiewbeuw932hjwe");

        const rootUser = await user.findOne({_id:verifyToken._id, "tokens.token" :token})
        if(!rootUser){
            throw new Error("User not Found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }
    catch(err){
       res.status(401).send("Unauthorized : no token provided");
       console.log(err);
    }
}

module.exports = Authenticate;