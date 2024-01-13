const mongoose = require("mongoose");

const libraryschema = mongoose.Schema({
  book_name: {
    type: String,
    required: true,
    trim: true,
  },
  student_name: {
    type: String,
    required: true,
    trim: true,
  },
  student_id: {
    type: String,
    required: true,
    trim: true,
  },
  class: {
    type: String,
    required: true,
    trim: true,
  },
  group_name: {
    type: String,
    required: true,
    trim: true,
  },
  subject_type: {
    type: String,
    required: true,
  },
  book_year: {
    type: String,
    required: true,
    trim: true,
  },
  days: {
    type: String,
    required: true,
  },
  receiving_time: {
    type: String,
    required: true,
  },
  giving_time: {
    type: String,
    required: true,
  },
});
module.exports = new mongoose.model("libraryuser", libraryschema);
