import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default class Card extends Component {
  // onClickBuy = () => {
  //   pass
  // }

  render() {
    const { movie } = this.props;
    const movieID = movie._id;
    return (
      <div class="col-sm-4">
        <Link
          to={{
            pathname: `/movie/${movie.name}`,
            state: { movieID: movieID }
          }}
        >
          <img class="item img-thumbnail" src={movie.poster} alt={movie.name} />
        </Link>
        <p className="text-uppercase movie-title">{movie.name}</p>
        <Link
          to={{
            pathname: `/movie/${movie.name}`,
            state: { movieID: movieID }
          }}
        >
          <input className="p-2" type="button" value="Detail" />
        </Link>
        <Link
          to={{
            pathname: `/booking/${movie.name}`,
            state: { cinemaID: movie.cinemaID }
          }}
        >
          <input className="p-2" type="button" value="Buy Ticket" />
        </Link>
      </div>
    );
  }
}
