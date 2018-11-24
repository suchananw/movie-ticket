import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getShowtime } from "../actions/bookingActions";

class MovieBooking extends Component {
  componentDidMount() {
    if (this.props.location.state.cinemaID) {
      this.props.getShowtime(this.props.location.state.cinemaID);
    }
  }

  render() {
    const { cinema, loading } = this.props.cinema;
    console.log(this.props.cinema);
    let content;

    // if (movieList === null || loading) {
    //   content = "Loading...";
    // } else {
    //   content = movieList.map(movie => );
    // }

    return (
      <div className="container">
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
