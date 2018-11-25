import axios from "axios";

import {
  GET_ERRORS,
  GET_USER_DETAIL,
  GET_TICKETS_DETAIL,
  USER_LOADING,
  TICKETS_LOADING
} from "./types";

// User Deatil
export const getUserDetail = userID => dispatch => {
  dispatch(setUserDetailLoading());
  axios
    .get(`/api/users/detail/${userID}`)
    .then(res =>
      dispatch({
        type: GET_USER_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_DETAIL,
        payload: {}
      })
    );
};

// Ticket Deatil
export const getTicketsDetail = ticketsID => dispatch => {
  dispatch(setTicketsDetailLoading());
  axios
    .post("/api/tickets/detail", ticketsID)
    .then(res =>
      dispatch({
        type: GET_TICKETS_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TICKETS_DETAIL,
        payload: {}
      })
    );
};

// Update ticket status
export const updateTicketStatus = (ticketID, status, history) => dispatch => {
  dispatch(setTicketsDetailLoading());
  axios
    .get(`/api/tickets/${ticketID}/updateStatus/${status}`)
    .then(res => history.push("/history"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// User Detail Loading
export const setUserDetailLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Ticket Detail Loading
export const setTicketsDetailLoading = () => {
  return {
    type: TICKETS_LOADING
  };
};
