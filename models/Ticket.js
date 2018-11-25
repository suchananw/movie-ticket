const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TicketSchema = new Schema({
  seat: {
    type: [String],
    required: true
  },
  cinema: {
    type: Number,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  bookingTime: {
    type: Date,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = Ticket = mongoose.model("tickets", TicketSchema);