const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load Input Validation
const validateMovieInput = require("../../validation/movie");

// Load User model
const Movie = require("../../models/Movie");

// @route   GET api/movies/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Movies Works" }));

// @route   POST api/movies/add
// @desc    Add movie
// @access  Public
router.post("/add", (req, res) => {
  const { errors, isValid } = validateMovieInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find movie by movie
  Movie.findOne({ name: req.body.name }).then(name => {
    if (name) {
      errors.name = "Movie already exists";
      return res.status(400).json(errors);
    } else {
      const newMovie = new Movie({
        name: req.body.name,
        synopsis: req.body.synopsis,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        length: req.body.length,
        rate: req.body.rate,
        genre: req.body.genre,
        cinema: req.body.cinema,
        poster: req.body.poster
      });

      newMovie
        .save()
        .then(movie => res.json(movie))
        .catch(err => console.log(err));
    }
  });
});

// @route   GET api/movies/:id
// @desc    Return movie detail
// @access  Private
router.get("/:id", (req, res) => {
  const errors = {};

  Movie.findOne({ id: req.params.id })
    .then(movie => {
      if (!movie) {
        errors.nomovie = "Movie not exists";
        res.status(404).json(errors);
      }
      res.json(movie);
    })
    .catch(err => res.status(404).json({ movie: "Movie not exists" }));
});

// @route   GET api/movies/all
// @desc    Return all movies
// @access  Private
router.get("/all", (req, res) => {
  const errors = {};

  Movie.find()
    .then(movies => {
      if (!movies) {
        errors.nomovie = "Movies not exists";
        res.status(404).json(errors);
      }
      res.json(movies);
    })
    .catch(err => res.status(404).json({ movie: "Movie not exists" }));
});

module.exports = router;
