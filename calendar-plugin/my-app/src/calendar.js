import React, { Component } from 'react';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-tw';
import _ from 'lodash';

class Calendar extends Component {
    constructor(props) {
        super(props)
        moment.updateLocale('zh-tw', momentLocale);
        this.switch = this.switch.bind(this)
        this.changeMonth = this.changeMonth.bind(this)
        this.prevMonth = this.prevMonth.bind(this)
        this.nextMonth = this.nextMonth.bind(this)
    }

    state = {
        'tripData': this.props.tripData,
        raw: [],
        parsed: {},
        range: {
            min: null,
            max: null
        },
        availableMonths: {},
        dateSelect: null,
        calendarDisplay: true,
        // initYearMonth: '2018-12'
        initYearMonth: '2019-01'
    }

    componentWillMount() {
        this.setState({
            raw: this.props.tripData,
            parsed: this.splitData(this.props.tripData),
            availableMonths: this.parseAvailableMonths(this.props.tripData),
            dataKeySetting: this.props.dataKeySetting,
            initYearMonth: this.props.initYearMonth
        }, () => {
            // console.log(this.state.parsed)

            let months = this.sortMonthsKey(this.state.availableMonths)

            months = months.map((v) => {
                return parseInt(moment(v).format('YYYYMM'))
            })

            let thisYearMonth = parseInt(moment(this.state.initYearMonth, 'YYYY-MM').format('YYYYMM'))
            let carryMonthIndex = _.sortedIndex(months, thisYearMonth)

            if (months[carryMonthIndex] !== thisYearMonth) {
                let after = months[carryMonthIndex]
                let before = carryMonthIndex > 0 ? months[carryMonthIndex - 1] : months[carryMonthIndex]

                after = moment(after, 'YYYYMM').format('YYYY-MM')
                before = moment(before, 'YYYYMM').format('YYYY-MM')

                if (this.state.availableMonths[before] > this.state.availableMonths[after]) {
                    this.setState({
                        initYearMonth: before
                    })
                } else {
                    this.setState({
                        initYearMonth: after
                    })
                }
            }
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

    changeMonth(yearMonth, e) {
        e.persist()
        const vdom = e.target
        console.log(vdom, this)

        let pool = []
        _.map(this.state.parsed, ((row, key) => {
            if (moment(key).format('YYYY-MM') === yearMonth) {
                pool.push(row)
            }
        }))

        setTimeout(() => {
            this.setState({
                initYearMonth: yearMonth
            })
        }, 11)
    }

    prevMonth() {
        let months = _.keys(this.state.availableMonths)

        months = _.sortBy(months, (o) => {
            return parseInt(moment(o).format('YYYYMM'))
        })

        let index = months.indexOf(this.state.initYearMonth)

        if (index === months.length - 1) {
            this.setState({
                initYearMonth: this.currentDateMoment().format('YYYY-MM')
            }, () => {
                let pool = []
                _.map(this.state.parsed, ((row, key) => {
                    if (moment(key).format('YYYY-MM') === this.state.initYearMonth) {
                        pool.push(row)
                    }
                }))
                console.log(pool, this)
            })
        } else {
            this.setState({
                initYearMonth: this.prevMonthMoment().format('YYYY-MM')
            }, () => {
                let pool = []
                _.map(this.state.parsed, ((row, key) => {
                    if (moment(key).format('YYYY-MM') === this.state.initYearMonth) {
                        pool.push(row)
                    }
                }))
                console.log(pool, this)
            })
        }
    }

    nextMonth() {
        let months = _.keys(this.state.availableMonths)

        months = _.sortBy(months, (o) => {
            return parseInt(moment(o).format('YYYYMM'))
        })

        let index = months.indexOf(this.state.initYearMonth)

        if (index === 0) {
            this.setState({
                initYearMonth: this.currentDateMoment().format('YYYY-MM')
            }, () => {
                let pool = []
                _.map(this.state.parsed, ((row, key) => {
                    if (moment(key).format('YYYY-MM') === this.state.initYearMonth) {
                        pool.push(row)
                    }
                }))
                console.log(pool, this)
            })
        } else {
            this.setState({
                initYearMonth: this.nextMonthMoment().format('YYYY-MM')
            }, () => {
                let pool = []
                _.map(this.state.parsed, ((row, key) => {
                    if (moment(key).format('YYYY-MM') === this.state.initYearMonth) {
                        pool.push(row)
                    }
                }))
                console.log(pool, this)
            })
        }
    }

    handleDateClick(date) {
        this.setState({
            dateSelect: this.getDateMoment(date + 1)
        },
            () => {
                console.log(this.state.dateSelect.format("YYYY/MM/DD"), this.getDataFromDate(date + 1))
            })
    }

    currentDayCount() {
        return moment(this.state.initYearMonth, 'YYYY-MM').daysInMonth()
    }

    currentDays() {
        return this.generate1toNArray(this.currentDayCount())
    }

    generate1toNArray(n) {
        return [...Array(n).keys()]
    }

    getDateMoment(date) {
        return moment(this.state.initYearMonth + '-' + date, 'YYYY-MM-DD')
    }

    currentDateMoment() {
        let months = _.keys(this.state.availableMonths)

        months = _.sortBy(months, (o) => {
            return parseInt(moment(o).format('YYYYMM'))
        })

        let index = months.indexOf(this.state.initYearMonth)

        if (index === 0) {
            return moment(months[index + 1])
        } else if (index === months.length - 1) {
            return moment(months[index - 1])
        } else {
            return moment(months[index])
        }
    }

    prevMonthMoment() {
        let months = _.keys(this.state.availableMonths)

        months = _.sortBy(months, (o) => {
            return parseInt(moment(o).format('YYYYMM'))
        })

        let index = months.indexOf(this.state.initYearMonth)

        if (index === months.length - 1) {
            return moment(months[index - 2])
        } else if (index >= 1) {
            return moment(months[index - 1])
        } else {
            return moment(months[index])
        }
    }

    nextMonthMoment() {
        let months = _.keys(this.state.availableMonths)

        months = _.sortBy(months, (o) => {
            return parseInt(moment(o).format('YYYYMM'))
        })

        let index = months.indexOf(this.state.initYearMonth)

        if (index === 0) {
            return moment(months[index + 2])
        } else if (index < months.length - 1) {
            return moment(months[index + 1])
        } else {
            return moment(months[index])
        }
    }

    splitData(raw) {
        let pool = {}

        _.map(raw, (value, key) => {
            let date = moment(value.date, 'YYYY/MM/DD').format('YYYY-MM-DD')

            pool[date] = pool[date] ? pool[date] : value
        })

        return pool
    }

    sortMonthsKey(months) {
        let m = _.keys(months)

        return _.sortBy(m, (o) => {
            return parseInt(moment(o).format('YYYYMM'))
        })
    }

    parseAvailableMonths(raw) {
        let month = {}

        _.map(raw, (value, key) => {
            let old = month[moment(value.date, 'YYYY/MM/DD').format('YYYY-MM')] || 0

            month[moment(value.date, 'YYYY/MM/DD').format('YYYY-MM')] = old + 1
        })

        return month
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
        let generateTab = (momentObject) => {
            return (
                <li className="nvt">
                    <span className={
                        `nvt-link ${momentObject && this.getDateMoment().isSame(momentObject) ? 'active' : ''}`
                    } onClick={(e) => {
                        this.changeMonth(momentObject.format('YYYY-MM'), e)
                    }
                    }>{momentObject.format('YYYY MM月')}</span>
                </li>
            )
        }

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
                    <button type="button" className="bt bt-prev" onClick={(e) => {
                        this.prevMonth(e.target)
                    }}></button>
                    <ul className="nvb months">
                        {generateTab(this.prevMonthMoment())}
                        {generateTab(this.currentDateMoment())}
                        {generateTab(this.nextMonthMoment())}
                    </ul>
                    <button type="button" className="bt bt-next" onClick={(e) => {
                        this.nextMonth(e.target)
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