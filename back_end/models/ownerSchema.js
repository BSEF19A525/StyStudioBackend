const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//const crypto = require('crypto');

const ownerSchema = new mongoose.Schema({
  username: {
    type: String,
  },

  email: {
    type: String,

    unique: true,
  },

  pass: {
    type: String,
  },

  cpass: {
    type: String,
  },

  salonName: {
    type: String,
  },

  location: {
    type: String,
  },

  description: {
    type: String,
  },

  profileImg: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  // Adding Services to Salon Owner Schema
  services: [
    {
      type: String,
      required: true,
    },
  ],
});

const SalonOwner = mongoose.model("SalonOwner", ownerSchema);
module.exports = SalonOwner;
