const mongoose = require("mongoose");

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
});

const SalonOwner = mongoose.model("SalonOwner", ownerSchema);
module.exports = SalonOwner;
