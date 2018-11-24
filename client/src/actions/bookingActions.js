import axios from "axios";
import {
  GET_SHOWTIME,
  GET_SEAT,
  SHOWTIME_LOADING,
  SEAT_LOADING
} from "./types";

export const getShowtime = cinemaNumber => dispatch => {
  dispatch(setShowtimeLoading());
  axios
    .get(`/api/cinemas/detail/${cinemaNumber}`)
    .then(res =>
      dispatch({
        type: GET_SHOWTIME,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SHOWTIME,
        payload: {}
      })
    );
};

export const getSeat = () => dispatch => {
  dispatch(setSeatLoading());
  axios
    .get("/api/movies/all")
    .then(res =>
      dispatch({
        type: GET_SEAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SEAT,
        payload: null
      })
    );
};

// Showtime loading
export const setShowtimeLoading = () => {
  return {
    type: SHOWTIME_LOADING
  };
};
// Seat loading
export const setSeatLoading = () => {
  return {
    type: SEAT_LOADING
  };
};
