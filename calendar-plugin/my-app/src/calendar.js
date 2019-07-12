import React, { Component } from "react";
import TripData from "./data/data1.json";
import moment from "moment";

class Week extends React.Component {
    render() {
        let days = [];
        let {
            date,
        } = this.props;

        const {
            month,
            selected,
            select,
        } = this.props;

        for (var i = 0; i < 7; i++) {
            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            };
            days.push(
                <Day day={day}
                    selected={selected}
                    select={select} />
            );

            date = date.clone();
            date.add(1, "day");
        }

        return (
            <div className="row week" key={days[0]}>
                {days}
            </div>
        );
    }

}

class Day extends React.Component {
    render() {
        const {
            day,
            day: {
                date,
                isCurrentMonth,
                isToday,
                number
            },
            select,
            selected
        } = this.props;

        return (
            <span
                key={date.toString()}
                className={"day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : "")}
                onClick={() => select(day)}>{number}</span>
        );
    }
}

class Calendar extends Component {
    constructor(props) {
        super(props)

        this.calendarDisplay = this.calendarDisplay.bind(this)
    }

    state = {
        'tripData': TripData,
        month: moment(),
        calendarDisplay: true
    }

    renderWeeks() {
        let weeks = [];
        let done = false;
        let date = this.state.month.clone().startOf("month").add("w" - 1).day("Sunday");
        let count = 0;
        let monthIndex = date.month();

        const {
            selected,
            month,
        } = this.state;

        while (!done) {
            weeks.push(
                <Week key={date}
                    date={date.clone()}
                    month={month}
                    select={(day) => this.select(day)}
                    selected={selected} />
            );

            date.add(1, "w");

            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    };


    calendarDisplay() {
        if (this.state.calendarDisplay) {
            this.setState({
                calendarDisplay: false
            })
        } else {
            this.setState({
                calendarDisplay: true
            })
        }
    }

    render() {
        return (
            <div className={`calendar${this.state.calendarDisplay ? '' : ' display-list'}`}>
                <div className="cly-header">
                    <ul>
                        <li><a href={'http://localhost:3000/'}>行程1</a></li>
                    </ul>
                    <button type="button" className="ic-ln" onClick={this.calendarDisplay}>
                        <i className="fa fa-list-ul" aria-hidden="true"></i>
                        切換列表顯示
                    </button>
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
                        {this.renderWeeks()}
                        {/* <div className="row week" key={days[0]}>
                            {days}
                        </div> */}
                        <ul>

                            {/* <li className="disabled"></li>
                            <li className="has-data">
                                <ol>
                                    <li className="days">
                                        1
                                        <span className="weekday">星期二</span>
                                    </li>
                                    <li className="guaranteed success"></li>
                                    <li className="status sign-up">報名</li>
                                    <li className="vacancy">可賣:80</li>
                                    <li className="total">團位:60</li>
                                    <li className="price">69888</li>
                                </ol>
                            </li>
                            <li>
                                <span className="days">2</span>
                            </li>
                            <li className="has-data">
                                <ol>
                                    <li className="days">
                                        3
                                        <span className="weekday">星期四</span>
                                    </li>
                                    <li className="guaranteed"></li>
                                    <li className="status sign-up">報名</li>
                                    <li className="vacancy">可賣:80</li>
                                    <li className="total">團位:60</li>
                                    <li className="price price-up">69888</li>
                                </ol>
                            </li>
                            <li>
                                <ol>
                                    <li className="days">4</li>

                                </ol>
                            </li>
                            <li className="has-data holiday">
                                <ol>
                                    <li className="days">
                                        5
                                        <span className="weekday">星期六</span>
                                    </li>
                                    <li className="guaranteed"></li>
                                    <li className="status sign-up">報名</li>
                                    <li className="vacancy">可賣:80</li>
                                    <li className="total">團位:60</li>
                                    <li className="price price-up">69888</li>
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
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar;