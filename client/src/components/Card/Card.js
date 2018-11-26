import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default class Card extends Component {
  render() {
    const { movie } = this.props;
    const movieID = movie._id;
    let status = null;
    if (this.props.status) {
      status = this.props.status;
    }

    return (
      <div class="col-sm-4">
        <Link
          to={{
            pathname: `/movie/${movie.name}`,
            state: { movieID: movieID, status: status }
          }}
        >
          <img class="item img-thumbnail" src={movie.poster} alt={movie.name} />
        </Link>
        <p className="text-uppercase movie-title">{movie.name}</p>
        <Link
          to={{
            pathname: `/movie/${movie.name}`,
            state: { movieID: movieID, status: status }
          }}
        >
          <input className="p-2" type="button" value="Detail" />
        </Link>
        {status === null ? (
          <Link
            to={{
              pathname: `/booking/${movie.name}`,
              state: { movie: movie }
            }}
          >
            <input className="p-2" type="button" value="Buy Ticket" />
          </Link>
        ) : null}
      </div>
    );
  }
}
