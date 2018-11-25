import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import Login from "./components/LogIn/Login";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import History from "./components/History/History";
import Payment from "./components/Payment/Payment";
import MovieBooking from "./components/MovieBooking";
import BookingConfirm from "./components/BookingConfirm/BookingConfirm";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/home";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>
            <Switch>
              <Route exact path="/movie/:name" component={MovieDetail} />
            </Switch>
            <Switch>
              <Route exact path="/history" component={History} />
            </Switch>
            <Switch>
              <Route exact path="/payment" component={Payment} />
            </Switch>
            <Switch>
              <Route exact path="/booking/:name" component={MovieBooking} />
            </Switch>
            <Switch>
              <Route
                exact
                path="/booking/:name/confirm"
                component={BookingConfirm}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
