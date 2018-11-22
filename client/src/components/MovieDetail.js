import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getMovieDetail } from "../actions/movieActions";

class MovieDetail extends Component {
  componentDidMount() {
    if (this.props.location.state.movieID) {
      this.props.getMovieDetail(this.props.location.state.movieID);
    }
  }

  render() {
    const { movie, loading } = this.props.movies;
    console.log("movie " + movie)
    if (movie === null || loading) {
      return (
        <div className="container">
          <div className="row m-4">Loading...</div>
        </div>
      );
    } else {
      let genreList = "";
      const movieGenre = movie.genre.map((genre,index) => {
          if (index === movie.genre.length-1){
            return genreList += genre
          }
          genreList += genre + ", "
        });

      return (
        <div class="container p-3">
          <div class="row">
            <div class="col-md-6 img">
              <img src={movie.poster} alt={movie.name} class="img-rounded" />
            </div>
            <div class="col-md-6 details p-3">
              <h4 className="text-uppercase">{movie.name}</h4>
              <p>
                Synopsis : {movie.synopsis} <br />
                Length : {movie.length} mins<br />
                Rate : {movie.rate} <br />
                Genre : {genreList}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

MovieDetail.propTypes = {
  getMovieDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  { getMovieDetail }
)(withRouter(MovieDetail));
