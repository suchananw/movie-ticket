import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSeat } from "../../actions/bookingActions";

import "./Seatplan.css";

class Seatplan extends Component {
  constructor() {
    super();
    this.state = {
      "1": true,
      "2": true,
      "3": true,
      "4": true,
      "5": true,
      "6": true,
      "7": true,
      "8": true,
      "9": true,
      "10": true,
      "11": true,
      "12": true,
      "13": true,
      "14": true,
      "15": true,
      "16": true,
      "17": true,
      "18": true,
      "19": true,
      "20": true,
      "21": true,
      "22": true,
      "23": true,
      "24": true,
      "25": true,
      "26": true,
      "27": true,
      "28": true,
      "29": true,
      "30": true,
      "31": true,
      "32": true,
      "33": true,
      "34": true,
      "35": true,
      "36": true,
      "37": true,
      "38": true,
      "39": true,
      "40": true
    };
  }

  componentDidMount = () => {
    if (this.props.cinema.cinema) {
      console.log("set initial seat status");
      this.setInitialSeatStatus(this.props.cinema.cinema.seats);
    }
  };

  // Seat Status in Checkbox
  // True === Checked === Booked
  // False === Not checked === Available
  handleSeatChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        [name]: !value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  // Seat Status in database
  // True === Available
  // False === Booked
  setInitialSeatStatus = seats => {
    console.log(this.props.timeIndex);
    console.log(seats);
    seats.map(seat => {
      console.log(seat);
      this.setState({
        [seat.seatNumber]: seat.status[this.props.timeIndex - 1]
      });
    });
  };

  genSeat = seats => {
    let row = [];
    let rowLabel = 65;
    for (var i = 0; i < seats.length; i = i + 8) {
      row.push(
        <tr>
          <td className="row-label">{String.fromCharCode(rowLabel)}</td>
          {this.genSeatRow(seats.slice(i, i + 8))}
          <td className="row-label">{String.fromCharCode(rowLabel)}</td>
        </tr>
      );
      rowLabel += 1;
    }
    return row;
  };

  genSeatRow = row => {
    return row.map(seat => {
      let seatNumber = seat.seatNumber;
      return (
        <td className="seat">
          <input
            name={seatNumber}
            type="checkbox"
            id={seatNumber}
            checked={!this.state[seatNumber]}
            onChange={this.handleSeatChange}
          />
          <label for={seatNumber}>{seatNumber}</label>
        </td>
      );
    });
  };

  render() {
    const { cinema } = this.props.cinema;
    console.log(this.props);
    const seats = cinema.seats;

    return (
      <div className="container seatplan p-4">
        <table class="fuselage">
          <thead colspan="2">
            <th colspan="2">
              <td className="screen-row p-3 ">
                <span className="screen-pointer">SCREEN</span>
              </td>
            </th>
          </thead>
          <tbody>{this.genSeat(seats)}</tbody>
        </table>
      </div>
    );
  }
}

Seatplan.propTypes = {
  getSeat: PropTypes.func.isRequired,
  cinema: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cinema: state.cinema
});

export default connect(
  mapStateToProps,
  { getSeat }
)(Seatplan);
