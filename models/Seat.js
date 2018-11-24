const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SeatSchema = new Schema({
  seatNumber:{
    type: String,
    required: true
  },
  status: {
    type: [Boolean],
    required: true
  },
  
});

module.exports = Seat = mongoose.model("seats", SeatSchema);