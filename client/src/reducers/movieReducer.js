import {
  GET_MOVIES_LIST,
  GET_MOVIE_DETAIL,
  CLEAR_CURRENT_MOVIE,
  MOVIE_LOADING
} from "../actions/types";

const initialState = {
  movieList: null,
  movie: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVIE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movie: action.payload,
        loading: false
      };
    case GET_MOVIES_LIST:
      return {
        ...state,
        movieList: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_MOVIE:
      return {
        ...state,
        movie: null
      };
    default:
      return state;
  }
}
