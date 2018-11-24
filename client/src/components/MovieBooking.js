import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getShowtime } from "../actions/bookingActions";

import Showtime from "./Booking/Showtime";

class MovieBooking extends Component {
  componentDidMount() {
    if (this.props.location.state.cinemaID) {
      this.props.getShowtime(this.props.location.state.cinemaID);
    }
  }

  render() {
    const { cinema, loading } = this.props.cinema;
    console.log(cinema);
    let content;

    if (cinema === null || loading) {
      content = "Loading...";
    } else {
    }

    return (
      <div className="container">
        <div>
          <Showtime cinema={cinema} />
        </div>
        <div className="row m-4">{content}</div>
      </div>
    );
  }
}

MovieBooking.propTypes = {
  getShowtime: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  cinema: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies,
  cinema: state.cinema
});

export default connect(
  mapStateToProps,
  { getShowtime }
)(withRouter(MovieBooking));
