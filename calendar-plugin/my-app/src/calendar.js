import React, { Component } from "react";
import TripData from "./data/data1.json";
// import Moment from "Moment";

class Calendar extends Component {
    constructor(props) {
        super(props)

    }

    state = {
        'tripData': TripData
    }


    render() {
        return (
            <div className="calendar">
                <div className="tabs-nav">
                    <ul>
                        <li className="tabs-link"></li>
                        <li className="tabs-link"></li>
                        <li className="tabs-link"></li>
                    </ul>
                </div>
                <div className="table"></div>
            </div>
        )
    }
}

export default Calendar;