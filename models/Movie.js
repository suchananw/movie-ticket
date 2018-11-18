const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MovieSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  rate: {
    type: String,
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  cinema: {
    type: Number,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
});

module.exports = Movie = mongoose.model("movies", MovieSchema);
