import React, { Component } from "react";
import moment from "moment";
import _ from 'lodash'

class Calendar extends Component {
    constructor(props) {
        super(props)

        this.calendarDisplay = this.calendarDisplay.bind(this)
        this.changeMonth = this.changeMonth.bind(this)
        this.prevMonth = this.prevMonth.bind(this)
        this.nextMonth = this.nextMonth.bind(this)

        console.log(this.props.tripData)
    }

    state = {
        raw: [],
        parsed: {},
        range: {
            min: null,
            max: null
        },
        calendarDisplay: true,
        currentYearMonth: '2018-07'
    }

    componentWillMount() {
        this.setState({
            raw: this.props.tripData,
            parsed: this.splitData(this.props.tripData),
            range: {
                min: this.parseMinDate(this.props.tripData),
                max: this.parseMaxDate(this.props.tripData),
            },
            dataKeySetting: this.props.dataKeySetting
        }, () => {
            console.log(this.state.parsed)
        })
    }

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

    changeMonth(yearMonth) {
        this.setState({
            currentYearMonth: yearMonth
        })
    }

    prevMonth() {
        if (this
            .getDateMoment()
            .subtract(2 ,'month')
            .isBetween(this.state.range.min, this.state.range.max)) {
            
                this.setState({
                    currentYearMonth: this.getDateMoment().subtract(2, 'month').format('YYYY-MM')
                })
        }

    }

    nextMonth() {
        if (this
            .getDateMoment().add(2, 'month')
            .isBetween(this.state.range.min, this.state.range.max)) {
            
                this.setState({
                    currentYearMonth: this.getDateMoment().add(2, 'month').format('YYYY-MM')
                })
        }
    }

    currentDayCount() {
        return moment(this.state.currentYearMonth, 'YYYY-MM').daysInMonth()
    }

    currentDays() {
        return this.generate1toNArray(this.currentDayCount())
    }

    getDateMoment(date) {
        return moment(this.state.currentYearMonth + '-' + date, 'YYYY-MM-DD')
    }

    generate1toNArray(n) {
        return [...Array(n).keys()]
    }

    prevMonthMoment() {
        return this.getDateMoment().subtract(1, 'month')
    }

    nextMonthMoment() {
        return this.getDateMoment().add(1, 'month')
    }

    splitData(raw) {
        let pool = {}
        let min, max

        _.map(raw, (value, key) => {
            let date = moment(value.date, 'YYYY/MM/DD').format('YYYY-MM-DD')
            
            pool[date] = pool[date] ? pool[date] : value

            min = moment(min || value.date, 'YYYY/MM/DD').isAfter(value.date) ? value.date : min
        })

        return pool
    }

    parseMinDate(raw) {
        let min = moment()

        _.map(raw, (value, key) => {
            min = moment(value.date, 'YYYY/MM/DD').isBefore(min) ? moment(value.date, 'YYYY/MM/DD') : moment(min)
        })

        return min
    }

    parseMaxDate(raw) {
        let max = moment('1970-01-01')

        _.map(raw, (value, key) => {
            max = moment(value.date, 'YYYY/MM/DD').isAfter(max) ? moment(value.date, 'YYYY/MM/DD') : moment(max)
        })

        return max
    }

    getDataFromDate(date) {
        let m = this.getDateMoment(date)

        return _.get(this.state.parsed, m.format('YYYY-MM-DD')) || {}
    }

    getDateStatus(date) {
        return this.getDataFromDate(date + 1)[this.state.dataKeySetting.status]
    }

    getDateAvailable(date) {
        return this.getDataFromDate(date + 1)[this.state.dataKeySetting.available]
    }

    getDateTotal(date) {
        return this.getDataFromDate(date + 1)[this.state.dataKeySetting.total]
    }

    getDatePrice(date) {
        return this.getDataFromDate(date + 1)[this.state.dataKeySetting.price]
    }

    isDateEmpty(date) {
        return !!this.getDataFromDate(date + 1)[this.state.dataKeySetting.status]
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
                    <button type="button" className="bt bt-prev" onClick={() => {
                        this.prevMonth()
                    }}></button>
                    <ul className="nvb months">
                        <li className="nvt">
                            <a className={`nvt-link 
                            ${this.getDateMoment().isSame(this.prevMonthMoment()) ? 'active' : ''}`} 
                            onClick={() => {
                                this.changeMonth(this.prevMonthMoment().format('YYYY-MM'))
                            }
                            }>{this.prevMonthMoment().format('YYYY MM月')}</a>
                        </li>
                        <li className="nvt">
                            <a className={
                                `nvt-link ${this.getDateMoment().isSame(this.getDateMoment()) ? 'active' : ''}`
                            }>{this.getDateMoment().format('YYYY MM月')}</a>
                        </li>
                        <li className="nvt">
                            <a className={
                                `nvt-link ${this.getDateMoment().isSame(this.nextMonthMoment()) ? 'active' : ''}`
                            } onClick={() => {
                                this.changeMonth(this.nextMonthMoment().format('YYYY-MM'))
                            }
                            }>{this.nextMonthMoment().format('YYYY MM月')}</a>
                        </li>
                    </ul>
                    <button type="button" className="bt bt-next" onClick={() => {
                        this.nextMonth()
                    }}></button>
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
                        {/* {this.renderWeeks()} */}

                        <ul>
                            {this.generate1toNArray(this.getDateMoment(1).day()).map(() => {
                                return (<li className="disabled" key={Math.random()}></li>)
                            })}

                            {this.currentDays().map((date) => {
                                return (
                                    <li className={this.isDateEmpty(date + 1) ? 'has-data' : ''} key={date}>
                                        <ol>
                                            <li className="days">
                                                {this.getDateMoment(date + 1).format('D')}

                                                <span className="weekday">
                                                    {this.getDateMoment(date + 1).format('dddd')}
                                                </span>
                                            </li>
                                            
                                            {this.isDateEmpty(date + 1) ? (
                                                <li>
                                                    <ul>
                                                        <li className="guaranteed success"></li>
                                                        <li className="status sign-up">{this.getDateStatus(date + 1)}</li>
                                                        <li className="vacancy">可賣:{this.getDateTotal(date + 1)}</li>
                                                        <li className="total">團位:{this.getDateAvailable(date + 1)}</li>
                                                        <li className="price">{
                                                            this.getDataFromDate(date + 1).price
                                                        }</li>
                                                    </ul>
                                                </li>
                                            ) : ''}

                                        </ol>
                                    </li>
                                )
                            })}
                            
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar;