import React, { Component } from "react";
import './Payment.css';

class Payment extends Component {
    render(){
      const {data} = this.props.location.state
      console.log(this.props.location.state)
      const imgscr = "https://api.qrserver.com/v1/create-qr-code/?data="+"billbill"+"&amp;size=100x100";
        return (
            <div class="container p-3">
            <div class="row">
              <div class="col-md-6 img p-3">
              <img src="https://api.qrserver.com/v1/create-qr-code/?data=billbill&amp;size=350x350" alt="" title="" />
              <br />
              <h4 className="font-weight-bold">Status : {data.status} </h4>
              </div>
              <div class="col-md-6 paymentdetail p-3">
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <h4 className="text-uppercase">{data.movie} </h4>
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th scope="col">
                      <p className="font-weight-bold">Seat : {data.seat} </p>
                      <p className="font-weight-bold">Cinema : {data.cinema} </p>
                      <p className="font-weight-bold">Showtime : {data.showtime} </p>
                      <p className="font-weight-bold">Date : {data.date} </p>
                      <p className="font-weight-bold">Price : {data.price} </p>
                      <p className="font-weight-bold">Expried : {data.expried} </p>
                    </th>
                  </tr>
                </thead>
                </table>
              </div>
            </div>
          </div>
        );
    }
}

export default Payment;