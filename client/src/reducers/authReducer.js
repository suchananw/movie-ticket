import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, GET_USER_DETAIL } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  userDeatil: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload
      };
    default:
      return state;
  }
}
