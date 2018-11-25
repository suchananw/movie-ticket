import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "./BookingConfirm.css";

class BookingConfirm extends Component {
  constructor() {
    super();
    this.state = {
      showtime: null,
      seats: []
    };
  }

  componentDidMount = () => {
    if (this.props.location.state.timeIndex) {
      const timeIndex = this.props.location.state.timeIndex;
      const seats = this.getSelectedSeats(this.props.location.state);
      this.setState({
        showtime: this.props.cinema.cinema.timeTable[timeIndex],
        seats: seats
      });
    }
  };

  getSelectedSeats = state => {
    let selectedSeats = [];
    for (var i = 0; i < Object.keys(state).length; i++) {
      if (state[i] === false) {
        selectedSeats.push(i);
      }
    }
    return selectedSeats;
  };

  render() {
    const { movies, cinema } = this.props;
    const selectedMovie = movies.movie;
    const selectedCinema = cinema.cinema;
    const data = {
      movie: "ROBIN HOOD",
      cinema: "2",
      seat: ["1"],
      showtime: "10:20",
      price: "1500",
      poster:
        "https://cdn.traileraddict.com/content/lionsgate/robin-hood-2018-6.jpg"
    };
    if (cinema === null) {
      return (
        <div className="container">
          <div className="row m-4">Loading...</div>
        </div>
      );
    } else {
      console.log("movie ", selectedMovie);
      console.log("cinema ", selectedCinema);
      let seatList = "";
      this.state.seats.map((seat, index) => {
        if (index === this.state.seats.length - 1) {
          return (seatList += seat);
        }
        seatList += seat + ", ";
      });

      return (
        <div class="container">
          <div class="row">
            <div class="col-md-6 img">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.name}
                class="img-rounded"
              />
            </div>
            <div class="col-md-6 details p-3 movie-detail-table rounded">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <h4 className="text-uppercase">{selectedMovie.name}</h4>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Seat : </p>
                      {seatList}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Cinema : </p>
                      {selectedCinema.cinemaNumber}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Showtime : </p>
                      {this.state.showtime}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Price : </p>
                      {"this is price"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <button class="btn btn-danger m-3">Cancel</button>
              <button class="btn btn-success m-3">Confrim</button>
            </div>
          </div>
        </div>
      );
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
