import React, { Component } from "react";
import TripData from "./data/tripData.json";

class Fztable extends Component {
    state = { 'tripData': TripData.data }
    renderTableHeader() {
        const { tripData } = this.state;
        const createTd = tripData.map(({ date, date_year }, index) => {
            return (
                <div key={date} className={`th ${date_year ? 'new-year' : ''}`} data-year={date_year}>{date}</div>
            )
        })
        return createTd
    }

    renderTableRow() {
        const { tripData } = this.state;
        const createTr = tripData.map(({ data, date_year }, index) => {
            return (
                <div className="tr" key={index}>
                    {
                        data.map((row, index2) => {
                            const { date_tripStart, price, isTheCheapest } = row
                            return (
                                <React.Fragment key={index2}>
                                    {index2 === 0 &&
                                        <div className={`th ${date_year ? 'new-year' : ''}`}
                                            data-year={date_year}>
                                            {date_tripStart}
                                        </div>
                                    }
                                    <div className={`td ${isTheCheapest ? 'cheapest' : ''}`} onClick={
                                        e => console.log(index, index2)
                                    }>{
                                            !isNaN(price) ?
                                                <>
                                                    <span className="price">${price.toLocaleString()}</span>
                                                    <span>起</span>
                                                </> :
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
                    <button className="btn btn-prev"></button>
                    <button className="btn btn-next"></button>
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
