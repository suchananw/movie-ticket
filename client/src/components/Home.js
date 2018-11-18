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

    let content;

    if (movieList === null || loading) {
      content = "Loading...";
    } else {
      content = movieList.map(movie => <Card movie={movie} />);
    }

    return (
      <div className="container">
        <div className="row m-4">{content}</div>
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
