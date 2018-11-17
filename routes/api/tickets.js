const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load Input Validation
// const validateMovieInput = require("../../validation/movie");

// Load User model
const Movie = require("../../models/Ticket");

// @route   GET api/movies/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "ticket Works" }));
