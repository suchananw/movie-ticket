const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTicketInput(data) {
  let errors = {};
  console.log(data);
  // data.seat = !isEmpty(data.seat) ? data.seat : [];
  data.cinema = !isEmpty(data.cinema) ? data.cinema : "";
  data.movie = !isEmpty(data.movie) ? data.moive : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.paid = !isEmpty(data.paid) ? data.paid : "";
  // data.showTime = !isEmpty(data.showTime) ? data.showTime : "";
  data.length = !isEmpty(data.length) ? data.length : "";
  // data.bookingTime = !isEmpty(data.bookingTime) ? data.bookingTime : "";
  data.user = !isEmpty(data.user) ? data.user : "";

  // if (Validator.isEmpty(data.seat)) {
  //   errors.seat = "seat field is required";
  // }

  if (Validator.isEmpty(data.cinema)) {
    errors.cinema = "cinema field is required";
  }

  if (Validator.isEmpty(data.movie)) {
    errors.movie = "movie field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "price field is required";
  }

  if (!Validator.isEmpty(data.paid)) {
    errors.paid = "paid field is required";
  }

  // if (!Validator.isEmpty(data.showTime)) {
  //   errors.endshowTimedate = "showTime field is required";
  // }

  if (Validator.isEmpty(data.length)) {
    errors.length = "Length field is required";
  }

  // if (Validator.isEmpty(data.bookingTime)) {
  //   errors.bookingTime = "bookingTime field is required";
  // }
  
  if (Validator.isEmpty(data.user)) {
    errors.user = "user field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
