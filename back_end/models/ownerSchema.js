const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const generateRandomSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
};
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
  tokens: [{
    token :{
      type: String,
      required:true
    }
  }]
});


ownerSchema.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({_id:this._id}, generateRandomSecretKey());
    this.tokens = this.tokens.concat({token : token});
    await this.save();
    return token;
  }
  catch(err){
    console.log(err);
  }
}
const SalonOwner = mongoose.model("SalonOwner", ownerSchema);
module.exports = SalonOwner;
