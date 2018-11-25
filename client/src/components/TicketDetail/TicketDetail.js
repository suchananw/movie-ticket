import React,{Component} from 'react';
import "./TicketDetail.css";

class TicketDetail extends Component {
    render(){
        const data = {
            "movie": "ROBIN HOOD",
            "cinema": "2",
            "seat": ["1"],
            "showtime": "10:20",
            "date": "20/12/2018",
            "price": "1500",
            "poster": "https://cdn.traileraddict.com/content/lionsgate/robin-hood-2018-6.jpg"
        }
        return(
            <div class="container">
            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6 ticketdetail">
                <div class="col-sm img">
                <img src={data.poster} alt="img" class="img-rounded" />
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">
                        <h4 className="font-weight-bold">{data.movie} </h4>
                        </th>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <th scope="col">
                            <p className="">Seat : {data.seat} </p>
                            <p className="">Cinema : {data.cinema} </p>
                            <p className="">Showtime : {data.showtime} </p>
                            <p className="">Date : {data.date} </p>
                            <p className="">Price : {data.price} </p>
                        </th>
                    </tr>
                    <button class="btn btn-danger">Cancel</button>
                    <button class="btn btn-success">Confrim</button>
                    </thead>
                </table>
              </div>
              </div>
              </div>
        );
    }
}

export default TicketDetail;