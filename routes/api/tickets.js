const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load Input Validation
const validateTicketInput = require("../../validation/ticket");

// Load User model
const Ticket = require("../../models/Ticket");

// @route   GET api/tickets/test
// @desc    ticket test
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "ticket Works" }));

// @route   POST api/tickets/add
// @desc    Add ticket
// @access  Public
router.post("/add", (req, res) => {
    const { errors, isValid } = validateTicketInput(req.body);
  
    // // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
        const newTicket = new Ticket({
          movie: req.body.movie,
          seat: req.body.seat,
          cinema: req.body.cinema,
          date: req.body.date,
          showTime: req.body.showTime,
          price: req.body.price,
          bookingTime: req.body.bookingTime,
          paid: req.body.paid,
          user: req.body.user
        });
  
        newTicket
          .save()
          .then(ticket => res.json(ticket))
          .catch(err => console.log(err));
    });

// @route   GET api/tickets/:ticketid/status
// @desc    Return ticket status 
// @access  Private
router.post("/:ticketid/status", (req, res) => {
    // const { errors, isValid } = validateMovieInput(req.body);
  
    // Check Validation
    //if (!isValid) {
    //return res.status(400).json(errors);
   Ticket.findById(req.params.ticketid)
      .then( ticket => {
        if (!ticket) {
          errors.noticket = "ticket not exists";
          res.status(404).json(errors);
        }
        res.json(ticket.paid);
      })
      .catch(err => res.status(404).json({ ticket: "Ticket not exists" }));
  });
module.exports = router;