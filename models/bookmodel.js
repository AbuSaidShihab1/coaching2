const mongoose = require("mongoose");

const addbookscema = mongoose.Schema({
  book_name: {
    type: String,
    required: true,
    trim: true,
  },
  book_type: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  company_name: {
    type: String,
    required: true,
    trim: true,
  },
  group_name: {
    type: String,
    required: true,
  },
  writter_name: {
    type: String,
    required: true,
    trim: true,
  },
  class_name: {
    type: String,
    required: true,
    trim: true,
  },
  book_year: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});
module.exports = new mongoose.model("Bookinfo", addbookscema);
