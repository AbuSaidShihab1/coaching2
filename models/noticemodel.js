const mongoose = require("mongoose");

const noticeschema = mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
});
module.exports = new mongoose.model("noticeimage", noticeschema);
