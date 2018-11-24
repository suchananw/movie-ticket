import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Showtime extends Component {
  render() {
    const { cinema } = this.props;
    console.log(this.props);
    const timetable = cinema.timetable;
    const timeButton = timetable.map(time => (
      <input type="button" value={time} />
    ));

    return (
      <div className="container">
        <h2>CINEMA {cinema.cinemaNumber}</h2>
        {timeButton}
      </div>
    );
  }
}
