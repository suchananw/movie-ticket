import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getMovieDetail } from "../actions/movieActions";

class MovieDetail extends Component {
  componentDidMount() {
    if (this.props.location.state.movieID) {
      this.props.getMovieDetail(this.props.location.state.movieID);
    }
  }

  render() {
    const { movie, loading } = this.props.movies;
    if (movie === null || loading) {
      return (
        <div className="container">
          <div className="row m-4">Loading...</div>
        </div>
      );
    } else {
      const status = this.props.location.state.status;
      let genreList = "";
      movie.genre.map((genre, index) => {
        if (index === movie.genre.length - 1) {
          return (genreList += genre);
        }
        genreList += genre + ", ";
      });

      return (
        <div class="container p-3">
          <div class="row">
            <div class="col-md-6 img">
              <img src={movie.poster} alt={movie.name} class="img-rounded" />
            </div>
            <div class="col-md-6 details p-3 movie-detail-table rounded">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <h4 className="text-uppercase">{movie.name}</h4>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Synopsis : </p>
                      {movie.synopsis}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Length : </p>
                      {movie.length}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Rate : </p>
                      {movie.rate}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Genre : </p>
                      {genreList}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {status === "coming" ? null : (
              <div className="container m-3">
                <Link
                  to={{
                    pathname: `/booking/${movie.name}`,
                    state: { movie: movie }
                  }}
                >
                  <input type="button" value="Buy Ticket" />
                </Link>
              </div>
            )}
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
