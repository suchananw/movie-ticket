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

// @route   GET api/movies/test
// @desc    Tests users route
// @access  Public
router.get("/testmovie", (req, res) => res.json({ msg: "Movies Works" }));

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
// @desc    Return cinema detail
// @access  Private
router.get("/detail/:cinemaNum", (req, res) => {
    const errors = {};

    Cinema.findOne({ cinemaNumber: req.params.cinemaNum }).then(cinemas => {
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

  Movie.findOne({ cinema: req.params.cinemaNum })
  .then(movies => {
    if (!movies) {
        errors.nomovie = "movie not exists";
        res.status(404).json(errors);
    } 
    res.json(movies);
    console.log(movies.enddate)
    var openTime= new Date()
    var endTime = new Date()
    openTime.setHours(10,00)
    endTime.setHours(22,00)
    console.log(openTime.getHours())
    var currentRound = openTime
    var thisRow = ""
    do{
        // console.log(currentRound.getHours()+":"+currentRound.getMinutes())
        var roundMinute = currentRound.getMinutes()
        if (roundMinute<10){
            roundMinute = "0"+roundMinute
        }
        round.push(currentRound.getHours()+":"+roundMinute)
        currentRound = moment(currentRound).add(Number(movies.length)+30, 'm').toDate();
    } while(currentRound < endTime);
    console.log(round)
    
    var myquery = { cinemaNumber:req.params.cinemaNum };
    var newvalues = { $set: {timeTable: round} };
    Cinema.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
    })
    .catch(err => res.status(404).json({ movie: "movie not exists" }));
});

    // var timeConvert = function(n){
    //     var minutes = n%60
    //     var hours = (n - minutes) / 60
    //     return hours + ":" + minutes
    // }
    // if (moviestart < movieend) {
    //     console.log('The first date is before the second.')
    //     console.log('Today : '+currentDate)
    //     if(currentDate > moviestart || currentDate === moviestart){
    //         if(currentDate < movieend || currentDate === movieend){
    //         }
    //     }
    //     else{
    //         console.log('Coming soon')
    //     }
    //   } else if (movieend === movieend) {
    //     console.log('The dates are the same!')
    //   } else {
    //     console.log('The first date is after the second.')
    //   }

module.exports = router;