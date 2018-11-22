const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMovieInput(data) {
  let errors = {};
  console.log(data);
  data.name = !isEmpty(data.name) ? data.name : "";
  data.synopsis = !isEmpty(data.synopsis) ? data.synopsis : "";
  // data.startdate = !isEmpty(data.startdate) ? data.startdate : "";
  // data.enddate = !isEmpty(data.enddate) ? data.enddate : "";
  // data.length = !isEmpty(data.length) ? data.length : "";
  data.rate = !isEmpty(data.rate) ? data.rate : "";
  // data.genre = !isEmpty(data.genre) ? data.genre : [];
  // data.cinema = !isEmpty(data.cinema) ? data.cinema : "";
  data.poster = !isEmpty(data.poster) ? data.poster : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.synopsis)) {
    errors.synopsis = "Synopsis field is required";
  }

  // if (!Validator.isEmpty(data.startdate)) {
  //   errors.startdate = "Startdate field is required";
  // }

  // if (!Validator.isEmpty(data.enddate)) {
  //   errors.enddate = "Enddate field is required";
  // }

  if (Validator.isEmpty(data.length)) {
    errors.length = "Length field is required";
  }

  if (Validator.isEmpty(data.rate)) {
    errors.rate = "Rate field is required";
  }

  // if (Validator.isEmpty(data.genre)) {
  //   errors.genre = "Genre field is required";
  // }

  if (Validator.isEmpty(data.cinema)) {
    errors.cinema = "Cinema field is required";
  }

  if (Validator.isEmpty(data.poster)) {
    errors.poster = "Poster field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
