import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { createTicket, updateStatusSeat } from "../../actions/bookingActions";
import "./BookingConfirm.css";

class BookingConfirm extends Component {
  constructor() {
    super();
    this.state = {
      movie: null,
      cinema: null,
      showtime: null,
      seats: [],
      price: null
    };
  }

  componentDidMount = () => {
    if (this.props.location.state.timeIndex) {
      const timeIndex = this.props.location.state.timeIndex;
      const seats = this.getSelectedSeats(this.props.location.state);
      const price = this.calculatePrice(this.props.cinema.cinema.price, seats);
      this.setState({
        movie: this.props.movies.movie,
        cinema: "" + this.props.cinema.cinema.cinemaNumber,
        showtime: this.props.cinema.cinema.timeTable[timeIndex],
        seats: seats,
        price: "" + price
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const ticketDetail = {
      movie: this.state.movie.name,
      seat: this.state.seats,
      cinema: this.state.cinema,
      showTime: this.state.showtime,
      amount: this.state.price,
      status: "waiting",
      bookingTime: new Date(),
      user: this.props.auth.user.email
    };

    const seatDetail = {
      cinemaNum: this.state.cinema,
      seatNum: this.state.seats,
      timeIndex: "" + this.props.location.state.timeIndex,
      status: "false"
    };

    this.props.updateStatusSeat(seatDetail);
    this.props.createTicket(ticketDetail, this.props.history);
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  getSelectedSeats = state => {
    let selectedSeats = [];
    for (var i = 0; i < Object.keys(state).length; i++) {
      if (state[i] === false) {
        selectedSeats.push(i.toString());
      }
    }
    return selectedSeats;
  };

  calculatePrice = (moviePrice, seats) => {
    const price = moviePrice * seats.length;
    return price;
  };

  render() {
    const { movies, cinema } = this.props;
    const selectedMovie = movies.movie;
    const selectedCinema = cinema.cinema;
    if (cinema === null) {
      return (
        <div className="container">
          <div className="row m-4">Loading...</div>
        </div>
      );
    } else {
      let seatList = "";
      this.state.seats.map((seat, index) => {
        if (index === this.state.seats.length - 1) {
          return (seatList += seat);
        }
        seatList += seat + ", ";
      });

      return (
        <div class="container">
          <div className="row p-4 text-uppercase">
            <h5>Confirm Booking Movie</h5>
          </div>
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
                      <p className="font-weight-bold text-left">Seat : </p>
                      {seatList}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-weight-bold text-left">Price : </p>
                      {this.state.price}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="container">
              <button class="btn btn-danger m-3" onClick={this.onCancel}>
                Cancel
              </button>
              <button class="btn btn-success m-3" onClick={this.onSubmit}>
                Confrim
              </button>
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

export default connect(
  mapStateToProps,
  { createTicket, updateStatusSeat }
)(withRouter(BookingConfirm));
