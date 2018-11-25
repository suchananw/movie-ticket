import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { getUserDetail, getTicketsDetail } from "../../actions/userActions";
import "./History.css";

class ProductRow extends Component {
  render() {
    const { ticket, index } = this.props;
    let seatList = "";
    ticket.seat.map((seatNumber, index) => {
      if (index === ticket.seat.length - 1) {
        return (seatList += seatNumber);
      }
      seatList += seatNumber + ", ";
    });
    const bookingTime = new Date(ticket.bookingTime);
    const expired = moment(bookingTime)
      .add(30, "m")
      .toDate();
    const expiredTime = expired.getHours() + ":" + expired.getMinutes();

    let paymentButton = [];
    let status = null;
    if (ticket.paid) {
      status = "PAID";
    } else {
      status = "WAITING";
      paymentButton.push(
        <button type="button" class="btn btn-info">
          Payment
        </button>
      );
    }
    const data = {
      id: ticket._id,
      movie: ticket.movie,
      seat: seatList,
      cinema: ticket.cinema,
      showtime: ticket.showTime,
      price: ticket.amount,
      expried: expiredTime,
      status: status
    };

    return (
      <tr>
        <td>{index + 1}</td>
        <td className="text-uppercase">{data.movie}</td>
        <td>{data.cinema}</td>
        <td>{data.seat}</td>
        <td>{data.showtime}</td>
        <td>{data.price} baht</td>
        <td>{data.expried}</td>
        <td>{data.status}</td>
        <td>
          <Link
            to={{
              pathname: `/history/payment/${data.id}`,
              state: { data: data }
            }}
          >
            {paymentButton}
          </Link>
        </td>
      </tr>
    );
  }
}
class ProductTable extends Component {
  render() {
    const ticketList = this.props.ticketList;
    const rows = [];
    ticketList.map((ticket, index) =>
      rows.push(<ProductRow key={index} ticket={ticket} index={index} />)
    );
    return (
      <table className="history">
        <thead>
          <tr>
            <th>No.</th>
            <th>Movie</th>
            <th>Cinema</th>
            <th>Seat</th>
            <th>Showtime</th>
            <th>Price</th>
            <th>Expired</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class History extends Component {
  componentDidMount = () => {
    this.props.getUserDetail(this.props.auth.user.id);
  };

  componentWillReceiveProps = nextprops => {
    if (nextprops.user.userDetail !== this.props.user.userDetail) {
      const ticketList = { ticketid: nextprops.user.userDetail.history };
      this.updateTicketsDetail(ticketList);
    }
  };

  updateTicketsDetail = ticketList => {
    this.props.getTicketsDetail(ticketList);
  };

  render() {
    const { ticketsDetail, loading } = this.props.user;
    if (ticketsDetail === null || loading) {
      return (
        <div className="container">
          <div className="row m-4">Loading...</div>
        </div>
      );
    } else {
      return <ProductTable ticketList={this.props.user.ticketsDetail} />;
    }
  }
}

History.propTypes = {
  getUserDetail: PropTypes.func.isRequired,
  getTicketsDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserDetail, getTicketsDetail }
)(withRouter(History));
