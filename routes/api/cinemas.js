const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load Input Validation
// const validateMovieInput = require("../../validation/movie");

// Load User model
const Cinema = require("../../models/Cinema");

// @route   GET api/cinemas/test
// @desc    Test cinema route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "cinema Works" }));

// @route   GET api/cinemas/all
// @desc    Return all cinema
// @access  private
router.get("/all", (req, res) => {
    const errors = {};
  
    Cinema.find()
      .then(cinemas => {
        if (!cinemas) {
          errors.nocinema = "Cinemas not exists";
          res.status(404).json(errors);
        }
        res.json(cinemas);
      })
      .catch(err => res.status(404).json({ cinema: "Cinema not exists" }));
  });

// @route   GET api/cinemas/detail/:id
// @desc    Return movie detail
// @access  Private
router.get("/detail/:cinemaNum", (req, res) => {
    const errors = {};

    Movie.findOne({ cinemaNumber: req.body.cinemaNum }).then(cinemas => {
        if (!cinemas) {
            errors.nocinema = "Cinemas not exists";
            res.status(404).json(errors);
        } 
        res.json(cinemas);
    })
    .catch(err => res.status(404).json({ cinema: "Cinema not exists" }));
  });

module.exports = router;