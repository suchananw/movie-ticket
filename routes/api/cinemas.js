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
// @desc    Return cinema detail find by cinema id
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
  
  Movie.find({ cinema: req.params.cinemaNum })
  .then(movies => {
    if (!movies) {
        errors.nomovie = "movie not exists";
        return res.status(404).json(errors);
    } 
    if(movies.length>1){
        var currentDate = new Date()
        var movieShow
        for (var i = 0; i < movies.length; i++) {
            if(currentDate > movies[i].startdate || currentDate === movies[i].startdate){
                if(currentDate < movies[i].enddate || currentDate === movies[i].enddate){
                    movieShow = movies[i];
                    // console.log(movies[i])
                    break;
                }
            }
            else{
                errors.movieError = "Current time have no movie showing";
                return res.status(404).json(errors);
            }
        }
        // console.log(movieShow)
        return movieShow;
    }
    else{
        return movie;
    }
    })
   .then( movie => {
        res.json(movie);
        var openTime= new Date()
        var endTime = new Date()
        openTime.setHours(10,00)
        endTime.setHours(22,00)
        var currentRound = openTime
        do{
            var roundMinute = currentRound.getMinutes()
            if (roundMinute<10){
                roundMinute = "0"+roundMinute
            }
            round.push(currentRound.getHours()+":"+roundMinute)
            currentRound = moment(currentRound).add(Number(movie.length)+30, 'm').toDate();
        } while(currentRound < endTime);
        console.log(round)
        
        var myquery = { cinemaNumber:req.params.cinemaNum };
        var newvalues = { $set: {timeTable: round} };
        Cinema.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
    }).catch(err => res.status(404).json({ movie: "movie not exists" }));
});

// @route   GET api/cinemas/seat/status/:cinemaNum/:seatNum
// @desc    Return seat status in cinema
// @access  Private
router.get("/:cinemaNum/seat/status/:seatNum", (req, res) => {
    const errors = {};

    Cinema.findOne({ cinemaNumber: req.params.cinemaNum })
    .then(cinema => {
        console.log(cinema)
        if (!cinema) {
            errors.nocinema = "Cinemas not exists";
            res.status(404).json(errors);
        } 
        for (var i = 0; i < cinema.seats.length; i++) {
            if(cinema.seats[i].seatNumber ===  req.params.seatNum){
                console.log(cinema.seats[i])
                res.json(cinema.seats[i]);
            }
        }
    }).catch(err => res.status(404).json({ cinema: "Cinema not exists" }));
});

// @route   GET api/cinemas/seat/status/:seatNum/update/:status
// @desc    update seat status in cinema
// @access  Private
router.get("/:cinemaNum/seat/status/update/:status", (req, res) => {
    const errors = {};

    Cinema.findOne({ cinemaNumber: req.params.cinemaNum })
    .then(cinema => {
        console.log(cinema)
        if (!cinema) {
            errors.nocinema = "Cinemas not exists";
            res.status(404).json(errors);
        } 
        // var seat;
        // for (var i = 0; i < cinema.seats.length; i++) {
        //     if(cinema.seats[i].seatNumber ===  req.params.seatNum){
        //         console.log(cinema.seats[i])
        //         res.json(cinema.seats[i]);
        //         // seat = cinema.seats[i]
        //     }
        // }
        var myquery = { cinemaNumber:req.params.cinemaNum };
        var newvalues = { $set: {timeTable: round} };
        Cinema.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
        // console.log(seat)
        // res.json(seat);
    }).catch(err => res.status(404).json({ cinema: "Cinema not exists" }));
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