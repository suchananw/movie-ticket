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
  price: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  bookingTime: {
    type: Date,
    required: false
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = Ticket = mongoose.model("tickets", TicketSchema);