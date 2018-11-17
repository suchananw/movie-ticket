const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CinemaSchema = new Schema({
  timeTable: {
    type: String,
    required: true
  },
  numberofSeat: {
    type: Number,
    required: true
  }
});

module.exports = Cinema = mongoose.model("cinemas", CinemaSchema);
