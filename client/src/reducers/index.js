import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import movieReducer from "./movieReducer";
import cinemaReducer from "./cinemaReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  movies: movieReducer,
  cinema: cinemaReducer
});
