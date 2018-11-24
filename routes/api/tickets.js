const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load Input Validation
// const validateMovieInput = require("../../validation/movie");

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
    // const { errors, isValid } = validateMovieInput(req.body);
  
    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    // Ticket.findOne({ name: req.body.name }).then(name => {
    //   if (name) {
    //     errors.name = "Movie already exists";
    //     return res.status(400).json(errors);
    //   } else {
    //     const newMovie = new Movie({
    //       name: req.body.name,
    //       synopsis: req.body.synopsis,
    //       startdate: req.body.startdate,
    //       enddate: req.body.enddate,
    //       length: req.body.length,
    //       rate: req.body.rate,
    //       genre: req.body.genre,
    //       cinema: req.body.cinema,
    //       poster: req.body.poster
    //     });
  
    //     newMovie
    //       .save()
    //       .then(movie => res.json(movie))
    //       .catch(err => console.log(err));
    //   }
    // });
    });

module.exports = router;