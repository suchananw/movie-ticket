import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSeat } from "../../actions/bookingActions";

import "./Seatplan.css";

class Seatplan extends Component {
  constructor() {
    super();
    this.state = {
      "1": false,
      "2": false,
      "3": false,
      "4": false,
      "5": false,
      "6": false,
      "7": false,
      "8": false,
      "9": false,
      "10": false,
      "11": false,
      "12": false,
      "13": false,
      "14": false,
      "15": false,
      "16": false,
      "17": false,
      "18": false,
      "19": false,
      "20": false,
      "21": false,
      "22": false,
      "23": false,
      "24": false,
      "25": false,
      "26": false,
      "27": false,
      "28": false,
      "29": false,
      "30": false,
      "31": false,
      "32": false,
      "33": false,
      "34": false,
      "35": false,
      "36": false,
      "37": false,
      "38": false,
      "39": false,
      "40": false
    };
  }

  handleSeatChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

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
      return (
        <td className="seat">
          <input
            name={seat}
            type="checkbox"
            id={seat}
            checked={this.state[seat]}
            onChange={this.handleInputChange}
          />
          <label for={seat}>{seat}</label>
        </td>
      );
    });
  };

  render() {
    const { cinema, seat } = this.props;
    console.log(this.props);
    const seats = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13"
    ];
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
