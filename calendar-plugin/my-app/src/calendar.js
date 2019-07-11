import React, { Component } from "react";
import TripData from "./data/data1.json";
// import moment from "moment";

class Calendar extends Component {
    // constructor(props) {
    //     super(props)

    // }

    state = {
        'tripData': TripData
    }


    render() {
        return (
            <div className="calendar">
                <div className="cly-header">
                    <ul>
                        <li><a href={'http://localhost:3000/'}>行程1</a></li>
                    </ul>
                    <button type="button" className="ic-ln">切換列表顯示</button>
                </div>
                <div className="nv">
                    <button type="button" className="bt bt-prev"></button>
                    <button type="button" className="bt bt-next"></button>
                    <ul className="nvb months">
                        <li className="nvt">
                            <a href={'http://localhost:3000/'} className="nvt-link">2019 10月</a>
                        </li>
                        <li className="nvt">
                            <a href={'http://localhost:3000/'} className="nvt-link active">2019 11月</a>
                        </li>
                        <li className="nvt">
                            <a href={'http://localhost:3000/'} className="nvt-link">2019 12月</a>
                        </li>
                    </ul>
                </div>
                <div className="cy-table">
                    <div className="cy-head weeks">
                        <ul>
                            <li>星期日</li>
                            <li>星期一</li>
                            <li>星期二</li>
                            <li>星期三</li>
                            <li>星期四</li>
                            <li>星期五</li>
                            <li>星期六</li>
                        </ul>
                    </div>
                    <div className="cy-body">
                        <ul>
                            <li className="disabled"></li>
                            <li className="has-data">
                                <ol>
                                    <li className="days">1</li>
                                    <li className="guaranteed success"></li>
                                    <li className="status sign-up">報名</li>
                                    <li className="vacancy">80</li>
                                    <li className="total">60</li>
                                    <li className="price">69888</li>
                                </ol>
                            </li>
                            <li>
                                <span className="days">2</span>
                            </li>
                            <li className="has-data">
                                <ol>
                                    <li className="days">3</li>
                                    <li className="guaranteed"></li>
                                    <li className="status sign-up">報名</li>
                                    <li className="vacancy">80</li>
                                    <li className="total">60</li>
                                    <li className="price price-up">69888</li>
                                </ol>
                            </li>
                            <li>
                                <ol>
                                    <li className="days">4</li>

                                </ol>
                            </li>
                            <li>
                                <ol>
                                    <li className="days">5</li>

                                </ol>
                            </li>
                            <li>
                                <ol>
                                    <li className="days">6</li>

                                </ol>
                            </li>
                            <li>
                                <ol>
                                    <li className="days">7</li>

                                </ol>
                            </li>
                            <li>
                                <ol>
                                    <li className="days">8</li>

                                </ol>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar;