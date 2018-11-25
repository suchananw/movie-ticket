import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserDetail, getTicketDetail } from "../../actions/userActions";
import "./History.css";

class ProductRow extends Component {
  render() {
    const { data, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td className="text-uppercase">{data.movie}</td>
        <td>{data.cinema}</td>
        <td>{data.seat}</td>
        <td>{data.showtime}</td>
        <td>{data.date}</td>
        <td>{data.price} baht</td>
        <td>{data.expried}</td>
        <td>{data.status}</td>
        <td>
          <Link
            to={{
              pathname: `/payment`,
              state: { data: data }
            }}
          >
            <button type="button" class="btn btn-info">
              Payment
            </button>
          </Link>
        </td>
      </tr>
    );
  }
}
class ProductTable extends Component {
  render() {
    const data = [
      {
        movie: "Fantastic Beasts: The Crimes of Grindelwald",
        seat: "1",
        cinema: "1",
        showtime: "11:11",
        date: "12/11/2018",
        price: "1234",
        expried: "aaaa",
        status: "PAID"
      },
      {
        movie: "punchpunch",
        seat: "2,3,4",
        cinema: "2",
        showtime: "11:11",
        date: "12/11/2018",
        price: "123421",
        expried: "12213",
        status: "WAITING"
      }
    ];

    const rows = data.map((data, index) => (
      <ProductRow data={data} index={index} />
    ));
    return (
      <table className="history">
        <thead>
          <tr>
            <th>No.</th>
            <th>Movie</th>
            <th>Cinema</th>
            <th>Seat</th>
            <th>Showtime</th>
            <th>Date</th>
            <th>Price</th>
            <th>Expried</th>
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
    this.props.getUserDetail(this.props.auth.user._id);
    if (this.props.user.userDetail)
      this.props.getTicketDetail(this.props.user.userDetail.history);
  };

  render() {
    console.log(this.props);
    return <ProductTable />;
  }
}

History.propTypes = {
  getUserDetail: PropTypes.func.isRequired,
  getTicketDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserDetail, getTicketDetail }
)(withRouter(History));
