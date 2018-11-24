const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CinemaSchema = new Schema({
  cinemaNumber: {
    type: Number,
    required: true
  },
  timeTable: {
    type: [String],
    required: false
  },
  numberofSeat: {
    type: Number,
    required: true
  },
  seat: {
    type: [String],
    required: false
  }
});

module.exports = Cinema = mongoose.model("cinemas", CinemaSchema);
