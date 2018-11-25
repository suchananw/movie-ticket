import axios from "axios";

import {
  GET_USER_DETAIL,
  GET_TICKET_DETAIL,
  USER_LOADING,
  TICKET_LOADING
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
export const getTicketDetail = ticketID => dispatch => {
  dispatch(setTicketDetailLoading());
  axios
    .post("/api/tickets/detail", ticketID)
    .then(res =>
      dispatch({
        type: GET_TICKET_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TICKET_DETAIL,
        payload: {}
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
export const setTicketDetailLoading = () => {
  return {
    type: TICKET_LOADING
  };
};
