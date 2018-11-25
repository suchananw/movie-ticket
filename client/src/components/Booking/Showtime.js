import React, { Component } from "react";
import "./Showtime.css";

export default class Showtime extends Component {
  onClick = index => {
    this.props.onClickTime(index);
  };

  render() {
    const currenttime = new Date().getHours();
    const { cinema } = this.props;
    const timetable = cinema.timeTable;
    const timeButton = [];
    timetable.map((time, index) => {
      const showtime = new Date();
      showtime.setHours(Number(time.slice(0, 2)));
      if (showtime.getHours() < currenttime) {
        timeButton.push(
          <input
            className="showtime-button p-3 m-2 showtime-disabled"
            key={index}
            type="button"
            value={time}
            disabled="disabled"
          />
        );
      } else {
        timeButton.push(
          <input
            className="showtime-button p-3 m-2"
            key={index}
            type="button"
            value={time}
            onClick={() => this.onClick(index)}
          />
        );
      }
    });

    return (
      <div className="container showtime-box p-4">
        <h5>CINEMA {cinema.cinemaNumber}</h5>
        <div className="">{timeButton}</div>
      </div>
    );
  }
}
