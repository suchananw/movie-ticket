import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class BookingConfirm extends Component {
  constructor() {
    super();
    this.state = {
      time: null
    };
  }

  render() {
    const { cinema, loading } = this.props.cinema;

    if (cinema === null || loading) {
      return (
        <div className="container">
          <div className="row m-4">Loading...</div>
        </div>
      );
    } else {
      console.log(this.props);
      return <div className="container" />;
    }
  }
}

BookingConfirm.propTypes = {
  auth: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  cinema: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies,
  cinema: state.cinema
});

export default connect(mapStateToProps)(withRouter(BookingConfirm));
