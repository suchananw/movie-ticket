import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getMovieList } from "../actions/movieActions";
import Card from "./Card/Card";

class Home extends Component {
  componentDidMount() {
    this.props.getMovieList();
  }

  render() {
    const { movieList, loading } = this.props.movies;

    let content = {};

    if (movieList === null || loading) {
      content = "Loading...";
    } else {
      content["showing"] = movieList.showing.map(movie => (
        <Card movie={movie} />
      ));
      content["coming"] = movieList.comingsoon.map(movie => (
        <Card movie={movie} />
      ));
    }

    return (
      <div className="container home-header">
        <div className="row p-4 text-uppercase">
          <h5>Now Showing</h5>
        </div>
        <div className="row m-4">{content.showing}</div>
        <div className="row p-4 text-uppercase">
          <h5>Coming Soon</h5>
        </div>
        <div className="row m-4">{content.coming}</div>
      </div>
    );
  }
}

Home.propTypes = {
  getMovieList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  { getMovieList }
)(withRouter(Home));
