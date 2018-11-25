const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const moment = require("moment");

// Load Input Validation
const validateTicketInput = require("../../validation/ticket");

// Load User model
const Ticket = require("../../models/Ticket");
const User = require("../../models/User");

// router.use(function(req, res, next) {
//   Ticket.find()
//     .then(tickets => {
//       if (!tickets) {
//         console.log("No Ticket");
//       }
//       let currentDate = new Date();
//       for (var i = 0; i < tickets.length; i++) {
//         const bookingTime = new Date(tickets[i].bookingTime);
//         const expired = moment(bookingTime)
//           .add(30, "m")
//           .toDate();
//         if (expired < currentDate) {
//           Ticket.findById(tickets[i]._id, function(err, doc) {
//             doc.paid = req.params.status === "true";
//             doc.save();
//           });
//         }
//       }
//     })
//     .catch(err => console.log(err));
//   next();
// });

// @route   GET api/tickets/test
// @desc    ticket test
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "ticket Works" }));

// @route   POST api/tickets/add
// @desc    Add ticket
// @access  Public
router.post("/add", (req, res) => {
  const { errors, isValid } = validateTicketInput(req.body);
  var currentDate = new Date();
  // // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newTicket = new Ticket({
    movie: req.body.movie,
    seat: req.body.seat,
    cinema: req.body.cinema,
    showTime: req.body.showTime,
    amount: req.body.amount,
    paid: req.body.paid,
    bookingTime: currentDate,
    user: req.body.user
  });

  newTicket.save().then(ticket => {
    //  console.log(ticket)
    User.findOne({ email: ticket.user }).then(user => {
      // console.log(user)
      if (!user) {
        errors.nouser = "User not exists";
        return res.status(400).json(errors);
      } else {
        user.history.push(ticket._id);
        // res.json(user)
      }
      // User.findOneAndUpdate({ email: ticket.user },{history : user.history})
      User.findOne({ email: ticket.user }, function(err, doc) {
        doc.history = user.history;
        // doc.visits.$inc();
        doc.save();
      }).then(user => {
        res.json({
          success: true
        });
      });
    });
  });
});

// @route   GET api/tickets/:ticketid/status
// @desc    Return ticket status
// @access  Private
router.get("/:ticketid/status", (req, res) => {
  const errors = {};
  // Check Validation
  //if (!isValid) {
  //return res.status(400).json(errors);
  Ticket.findById(req.params.ticketid)
    .then(ticket => {
      if (!ticket) {
        errors.noticket = "ticket not exists";
        res.status(404).json(errors);
      }
      res.json(ticket.paid);
    })
    .catch(err => res.status(404).json({ ticket: "Ticket not exists" }));
});

// @route   GET api/tickets/:ticketid/updateStatus/:status
// @desc    update status of ticket specific ticket id
// @access  Private
router.get("/:ticketid/updateStatus/:status", (req, res) => {
  // const { errors, isValid } = validateMovieInput(req.body);

  // Check Validation
  //if (!isValid) {
  //return res.status(400).json(errors);
  // console.log(req.params.ticketid)
  Ticket.findById(req.params.ticketid, function(err, doc) {
    doc.paid = req.params.status === "true";
    doc.save();
  })
    .then(ticket => res.json(ticket))
    .catch(err => res.status(404).json({ ticket: "Ticket not exists" }));
});

// // @route   POST api/tickets/detail
// // @desc    return TicketList
// // @access  Private
router.post("/detail", (req, res) => {
  // const { errors, isValid } = validateMovieInput(req.body);
  const ticketlist = [];
  // Check Validation
  //if (!isValid) {
  //return res.status(400).json(errors);
  // findticket = (id) => {
  //   Ticket.findById(id).then( ticket => {
  //     // console.log(ticket)
  //     if (!ticket) {
  //       errors.noticket = "ticket not exists";
  //       res.status(404).json(errors);
  //     }
  //     return ticket;
  //   })
  // }

  for (var i = 0; i < req.body.ticketid.length; i++) {
    // var tmpticket = findticket(req.body.ticketid[i])
    // console.log(tmpticket)
    ticketlist.push(new mongoose.Types.ObjectId(req.body.ticketid[i]));
  }
  // console.log(ticketlist)
  // return res.json(ticketlist)
  Ticket.find({ _id: { $in: ticketlist } }, function(err, docs) {
    //  console.log(docs);
    return res.json(docs);
  });
});

module.exports = router;
