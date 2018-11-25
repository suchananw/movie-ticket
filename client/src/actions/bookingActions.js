import axios from "axios";
import { GET_SHOWTIME, SHOWTIME_LOADING, GET_ERRORS } from "./types";

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

// Create ticket
export const createTicket = (ticketDetail, history) => dispatch => {
  axios
    .post("/api/tickets/add", ticketDetail)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Showtime loading
export const setShowtimeLoading = () => {
  return {
    type: SHOWTIME_LOADING
  };
};
