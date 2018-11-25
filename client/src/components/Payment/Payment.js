import React, { Component } from "react";
import './Payment.css';
import { Link } from "react-router-dom";
class Payment extends Component {
    render(){
      const {data} = this.props.location.state
      console.log(this.props.location.state)
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
                <thead>
                  <tr>
                    <th scope="col">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Confirm Payment</button>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Confrim Payment</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary">Confirm</button>
                          </div>
                        </div>
                      </div>
                    </div>
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