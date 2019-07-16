import React, { Component } from "react";
import moment from "moment";
import momentLocale from "moment/locale/zh-tw";
import _ from 'lodash';

class Calendar extends Component {
    constructor(props) {
        super(props)

        moment.updateLocale('zh-tw', momentLocale);

        this.switch = this.switch.bind(this)
        this.changeMonth = this.changeMonth.bind(this)
        this.prevMonth = this.prevMonth.bind(this)
        this.nextMonth = this.nextMonth.bind(this)

        // console.log(this.props.tripData)
    }

    state = {
        'tripData': this.props.tripData,
        raw: [],
        parsed: {},
        range: {
            min: null,
            max: null
        },
        dateSelect: null,
        consoleSelectDate: () => {
        },
        calendarDisplay: true,
        initYearMonth: '2018-07'
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
            // console.log(this.state.parsed)
        })
    }

    inputData() {
        this.setState({
            tripData: ({
                "guaranteed": false,
                "date": "2018/07/02",
                "price": 76263,
                "availableVancancy": 16,
                "totalVacnacy": 166,
                "status": "預定"
            })
        })
    }

    switch() {
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
            initYearMonth: yearMonth
        })
    }

    prevMonth() {
        if (this
            .getDateMoment()
            .subtract(1, 'month')
            .isBetween(this.state.range.min, this.state.range.max)) {

            this.setState({
                initYearMonth: this.getDateMoment().subtract(1, 'month').format('YYYY-MM')
            })
        }
    }

    nextMonth() {
        if (this
            .getDateMoment().add(1, 'month')
            .isBetween(this.state.range.min, this.state.range.max)) {
            this.setState({
                initYearMonth: this.getDateMoment().add(1, 'month').format('YYYY-MM')
            })
        }
        return this.getDateMoment().format('YYYY-MM')
    }

    handleDateClick(date) {
        this.setState({
            dateSelect: this.getDateMoment(date + 1)
        },
            () => {
                // console.log(this.state.dateSelect)
            })
    }

    currentDayCount() {
        return moment(this.state.initYearMonth, 'YYYY-MM').daysInMonth()
    }

    currentDays() {
        return this.generate1toNArray(this.currentDayCount())
    }

    getDateMoment(date) {
        return moment(this.state.initYearMonth + '-' + date, 'YYYY-MM-DD')
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
        let min

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
                    <button type="button" className="ic-ln" onClick={this.switch}>
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
                            <span className={`nvt-link 
                            ${this.getDateMoment().isSame(this.prevMonthMoment()) ? 'active' : ''}`}
                                onClick={() => {
                                    this.changeMonth(this.prevMonthMoment().format('YYYY-MM'))
                                }
                                }>{this.prevMonthMoment().format('YYYY MM月')}</span>
                        </li>
                        <li className="nvt">
                            <span className={
                                `nvt-link ${this.getDateMoment().isSame(this.getDateMoment()) ? 'active' : ''}`
                            }>{this.getDateMoment().format('YYYY MM月')}</span>
                        </li>
                        <li className="nvt">
                            <span className={
                                `nvt-link ${this.getDateMoment().isSame(this.nextMonthMoment()) ? 'active' : ''}`
                            } onClick={() => {
                                this.changeMonth(this.nextMonthMoment().format('YYYY-MM'))
                            }
                            }>{this.nextMonthMoment().format('YYYY MM月')}</span>
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
                        <ul>
                            {this.generate1toNArray(this.getDateMoment(1).day()).map(() => {
                                return (<li className="disabled" key={Math.random()}></li>)
                            })}

                            {this.currentDays().map((date) => {
                                return (
                                    <li className={
                                        (this.isDateEmpty(date) ? 'has-data' : '') +
                                        (this.getDateMoment(date + 1).isSame(this.state.dateSelect) ? ' active' : '')
                                    }
                                        key={date}
                                        onClick={() => {
                                            this.handleDateClick(date)
                                            this.inputData()
                                        }
                                        }
                                    >
                                        <ol>
                                            <li className="days">
                                                {this.getDateMoment(date + 1).format('D')}

                                                <span className="weekday">
                                                    {this.getDateMoment(date + 1).format('dddd')}
                                                </span>
                                            </li>

                                            {this.isDateEmpty(date) ? (
                                                <li>
                                                    <ul>
                                                        <li className="guaranteed success"></li>
                                                        <li className="status sign-up">{this.getDateStatus(date)}</li>
                                                        <li className="vacancy">可賣:{this.getDateAvailable(date)}</li>
                                                        <li className="total">團位:{this.getDateTotal(date)}</li>
                                                        <li className="price">{
                                                            this.getDatePrice(date) ? '$' + this.getDatePrice(date) : ""
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