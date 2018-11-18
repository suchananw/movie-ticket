import axios from "axios";
import { GET_MOVIES_LIST, GET_MOVIE_DETAIL, MOVIE_LOADING } from "./types";

// Get cat by id
export const getMovieDetail = id => dispatch => {
  dispatch(setMovieLoading());
  axios
    .get(`/api/movies/${id}`)
    .then(res =>
      dispatch({
        type: GET_MOVIE_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MOVIE_DETAIL,
        payload: {}
      })
    );
};

// Get all cats
export const getMovieList = () => dispatch => {
  dispatch(setMovieLoading());
  axios
    .get("/api/movies/all")
    .then(res =>
      dispatch({
        type: GET_MOVIES_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MOVIES_LIST,
        payload: null
      })
    );
};

// Cat loading
export const setMovieLoading = () => {
  return {
    type: MOVIE_LOADING
  };
};
