import React, { Component } from "react";
import TripData from "./data/tripData.json";

class Fztable extends Component {
    state = { 'tripData': TripData.data }
    renderTableHeader() {
        const { tripData } = this.state;
        // console.log(tripData);
        const createTd = tripData.map(({ date }, index) => {
            // console.log(ele.date)
            // console.log(date)
            return (
                <div key={date} className="th">{date}</div>
            )
        })
        return createTd
    }

    renderTableRow() {
        const { tripData } = this.state;
        const createTr = tripData.map(({ data }, index) => {
            return (
                <div className="tr" key={index}>
                    {
                        data.map((row, index) => {
                            const { date_tripStart, price } = row
                            return (
                                <React.Fragment key={index}>
                                    {index === 0 && <div className="th">{date_tripStart}</div>}
                                    <div className="td">{
                                        !isNaN(price) ?
                                            <><span className="price">${price.toLocaleString()}</span><span>起</span></> :
                                            <span>{price}</span>}
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            )
        })
        return createTr
    }

    render() {
        return (
            <div className="fztable">
                <h1 id='title'>React Dynamic Table</h1>
                <div className="table">
                    <div className="thead">
                        <div className="tr">
                            <div className="th title">
                                <p>回程</p>
                                <p>去程</p>
                            </div>
                            {this.renderTableHeader()}
                        </div>
                    </div>
                    <div className="tbody">
                        {this.renderTableRow()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Fztable;
