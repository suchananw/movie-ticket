const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load Input Validation
// const validateMovieInput = require("../../validation/movie");

// Load seat model
const Seat = require("../../models/Seat");

// @route   GET api/seats/test
// @desc    Tests seat route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "seat Works" }));

// @route   GET api/seats/all
// @desc    Return all seat
// @access  private
router.get("/all", (req, res) => {
    const errors = {};
  
    Seat.find()
      .then(cinemas => {
        if (!cinemas) {
          errors.nocinema = "Cinemasseat not exists";
          res.status(404).json(errors);
        }
        res.json(cinemas);
      })
      .catch(err => res.status(404).json({ cinema: "Cinema not exists" }));
  });
// @route   GET api/seats/detail/:seatNum
// @desc    Return seat detail
// @access  Private
router.get("/detail/:seatNum", (req, res) => {
    const errors = {};

    Seat.findOne({ seatNumber: req.params.seatNum }).then(seats => {
        if (!seats) {
            errors.noseat = "Seats not exists";
            res.status(404).json(errors);
        } 
        res.json(seats);
    })
    .catch(err => res.status(404).json({ seats: "seat not exists" }));
  });

// @route   GET api/seats/detail/:seatNum
// @desc    Return seat detail
// @access  Private
router.get("/status/:seatNum", (req, res) => {
    const errors = {};

    Seat.findOne({ seatNumber: req.params.seatNum }).then(seats => {
        if (!seats) {
            errors.noseat = "Seats not exists";
            res.status(404).json(errors);
        } 
        res.json(seats.status);
    })
    .catch(err => res.status(404).json({ seats: "seat not exists" }));
  });


module.exports = router;
