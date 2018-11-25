import {
  GET_USER_DETAIL,
  GET_TICKETS_DETAIL,
  USER_LOADING,
  TICKETS_LOADING,
  UPDATE_TICKET_STATUS
} from "../actions/types";

const initialState = {
  userDetail: null,
  ticketsDetail: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case TICKETS_LOADING:
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
    case GET_TICKETS_DETAIL:
      return {
        ...state,
        ticketsDetail: action.payload,
        loading: false
      };
    case UPDATE_TICKET_STATUS:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
