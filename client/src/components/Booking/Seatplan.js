import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSeat } from "../../actions/bookingActions";

import "./Seatplan.css";

class Seatplan extends Component {
  genSeat = seats => {
    let row = [];
    for (var i = 0; i < seats.length; i = i + 8) {
      row.push(<tr>{this.genSeatRow(seats.slice(i, i + 8))}</tr>);
    }
    return row;
  };
  genSeatRow = row => {
    return row.map(seat => {
      return (
        <td className="seat">
          <input type="checkbox" id={seat} />
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
          <thead>
            <th>
              <td className="screen-row p-3">
                <span className="screen-pointer">SCREEN</span>
              </td>
            </th>
          </thead>
          <tbody>{this.genSeat(seats)}</tbody>
        </table>
        <div>
          <input type="button" value="Confirm" />
        </div>
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
