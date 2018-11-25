import {
  GET_SHOWTIME,
  SHOWTIME_LOADING,
  SEAT_LOADING,
  CLEAR_CURRENT_ROUND,
  CLEAR_CURRENT_SEAT
} from "../actions/types";

const initialState = {
  cinema: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOWTIME_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEAT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SHOWTIME:
      return {
        ...state,
        cinema: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_ROUND:
      return {
        ...state,
        movie: null
      };
    case CLEAR_CURRENT_SEAT:
      return {
        ...state,
        movie: null
      };
    default:
      return state;
  }
}
