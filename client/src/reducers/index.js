import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import movieReducer from "./movieReducer";
import cinemaReducer from "./cinemaReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  errors: errorReducer,
  movies: movieReducer,
  cinema: cinemaReducer
});
