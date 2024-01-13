const mongoose = require("mongoose");

const signupschema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: String,
    default: 0,
  },
});
module.exports = new mongoose.model("Signup", signupschema);
