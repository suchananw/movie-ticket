import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getShowtime } from "../actions/bookingActions";

import Showtime from "./Booking/Showtime";
import Seatplan from "./Booking/Seatplan";

class MovieBooking extends Component {
  constructor() {
    super();
    this.state = {
      time: null
    };
  }

  componentDidMount() {
    if (this.props.location.state.cinemaID) {
      this.props.getShowtime(this.props.location.state.cinemaID);
    }
  }

  onClickTime = index => {
    this.setState({
      time: index
    });
  };

  render() {
    const { cinema, loading } = this.props.cinema;

    if (cinema === null || loading) {
      return (
        <div className="container">
          <div className="row m-4">Loading...</div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div>
            <Showtime cinema={cinema} onClickTime={this.onClickTime} />
          </div>
          {this.state.time !== null ? (
            <div>
              <Seatplan />
              <input type="button" value="Confirm" />
            </div>
          ) : null}
        </div>
      );
    }
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
