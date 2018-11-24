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
  seats: [
    {
     seatNumber:{
      type: String,
      required: true
     },
     status: {
      type: [Boolean],
      required: true
     }
    }
  ]
});

module.exports = Cinema = mongoose.model("cinemas", CinemaSchema);
