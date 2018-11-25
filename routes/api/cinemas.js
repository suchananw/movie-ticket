const express = require("express");
const moment = require("moment");
const router = express.Router();
const keys = require("../../config/keys");

// Load Input Validation
// const validateMovieInput = require("../../validation/movie");

// Load cinema model
const Cinema = require("../../models/Cinema");
const Movie = require("../../models/Movie");

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

// @route   GET api/cinemas/detail/:cinemaNum
// @desc    Return cinema detail find by cinema id
// @access  Private
router.get("/detail/:cinemaNum", (req, res) => {
  const errors = {};

  Cinema.findOne({ cinemaNumber: req.params.cinemaNum })
    .then(cinemas => {
      if (!cinemas) {
        errors.nocinema = "Cinemas not exists";
        res.status(404).json(errors);
      }
      res.json(cinemas);
    })
    .catch(err => res.status(404).json({ cinema: "Cinema not exists" }));
});

// @route   GET api/cinemas/generateRound/:cinemaNum
// @desc    Generate round movie by cinemaNum
// @access  Private
router.get("/generateRound/:cinemaNum", (req, res) => {
  const errors = {};
  var round = [];

  Movie.find({ cinema: req.params.cinemaNum })
    .then(movies => {
      if (!movies) {
        errors.nomovie = "movie not exists";
        return res.status(404).json(errors);
      }
      var currentDate = new Date();
      var movieShow;
      for (var i = 0; i < movies.length; i++) {
        if (
          currentDate > movies[i].startdate ||
          currentDate === movies[i].startdate
        ) {
          if (
            currentDate < movies[i].enddate ||
            currentDate === movies[i].enddate
          ) {
            movieShow = movies[i];
            // console.log(movies[i])
            break;
          }
        } else {
          errors.movieError = "Current time have no movie showing";
          return res.status(404).json(errors);
        }
      }
      console.log(movieShow);
      return movieShow;
    })
    .then(movie => {
      console.log(movie);
      var openTime = new Date();
      var endTime = new Date();
      openTime.setHours(10, 00);
      endTime.setHours(22, 00);
      var currentRound = openTime;
      do {
        var roundMinute = currentRound.getMinutes();
        if (roundMinute < 10) {
          roundMinute = "0" + roundMinute;
        }
        round.push(currentRound.getHours() + ":" + roundMinute);
        currentRound = moment(currentRound)
          .add(Number(movie.length) + 30, "m")
          .toDate();
      } while (currentRound < endTime);

      console.log(round);
      var myquery = { cinemaNumber: req.params.cinemaNum };
      var newvalues = { $set: { timeTable: round } };
      Cinema.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
      Cinema.findOne({ cinemaNumber: req.params.cinemaNum }).then(cinema => {
        return res.json(cinema);
      });
    })
    .catch(err => res.status(404).json({ movie: "movie not exists" }));
});

// @route   GET api/cinemas/:cinemaNum/seatStatus/:seatNum
// @desc    Return seat status in cinema
// @access  Private
router.get("/:cinemaNum/seatStatus/:seatNum", (req, res) => {
  const errors = {};

  Cinema.findOne({ cinemaNumber: req.params.cinemaNum })
    .then(cinema => {
      // console.log(cinema)
      if (!cinema) {
        errors.nocinema = "Cinemas not exists";
        res.status(404).json(errors);
      }
      for (var i = 0; i < cinema.seats.length; i++) {
        if (cinema.seats[i].seatNumber === req.params.seatNum) {
          console.log(cinema.seats[i]);
          res.json(cinema.seats[i]);
        }
      }
    })
    .catch(err => res.status(404).json({ cinema: "Cinema not exists" }));
});

// @route   POST api/cinemas/updatestatusSeat
// @desc    update seat status in cinema
// @access  Private
router.post("/updatestatusSeat", (req, res) => {
  const errors = {};

  Cinema.findOne({ cinemaNumber: req.body.cinemaNum })
    .then(cinema => {
      if (!cinema) {
        errors.nocinema = "Cinemas not exists";
        res.status(404).json(errors);
      }
      for (var j = 0; j < req.body.seatNum.length; j++) {
        for (var i = 0; i < cinema.seats.length; i++) {
          if (req.body.seatNum[j] === cinema.seats[i].seatNumber) {
            // console.log(cinema.seats[i])
            // console.log(cinema.seats[i].status[0])
            cinema.seats[i].status[req.body.timeIndex] =
              req.body.status === "true";
            // console.log(cinema.seats[i].status[0])
          }
        }
      }
      // console.log(cinema.seats)
      Cinema.findOne({ cinemaNumber: req.body.cinemaNum }, function(err, doc) {
        doc.seats = cinema.seats;
        doc.save();
      });
      res.json(cinema);
    })
    .catch(err => res.status(404).json({ cinema: "Cinema not exists" }));
});

module.exports = router;
