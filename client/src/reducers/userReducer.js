import {
  GET_USER_DETAIL,
  GET_TICKET_DETAIL,
  USER_LOADING,
  TICKET_LOADING
} from "../actions/types";

const initialState = {
  userDetail: null,
  ticketDetail: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case TICKET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
        loading: false
      };
    case GET_TICKET_DETAIL:
      return {
        ...state,
        ticketDetail: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
