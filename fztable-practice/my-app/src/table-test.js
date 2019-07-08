import React, { Component } from "react";
import TripData from "./data/tripData.json";

class Fztable extends Component {
    constructor(props) {
        super(props)

        this.btnNext = this.btnNext.bind(this)
        this.btnPrev = this.btnPrev.bind(this)
    }

    state = {
        'tripData': TripData.data,
        currentBox: {
            x: -1,
            y: -1
        },
        frameSize: 3,
        scrollPage: 3,
        currentPage: 1,
        position: 0,
        speed: .3,
        scrollStyle: {
            transition: this.scrollTime + 's',
            left: 0 + '%'
        },
        arrowNext: true
    }

    btnNext() {
        console.log('Next')
        let moveRight = this.state.position - (100 / this.state.frameSize) * this.state.scrollPage

        this.setState({
            position: moveRight,
            scrollStyle: {
                transition: this.state.speed + 's',
                left: moveRight + '%'
            },
            currentPage: this.state.currentPage + 1
        })

        if (!(this.state.scrollPage * this.state.currentPage <= this.state.tripData.length)) {
            this.setState({
                scrollStyle: {
                    left: 133.33336 + '%'
                }
            })
        }

        console.log(this.state.scrollPage * this.state.currentPage <= this.state.tripData.length)
    }

    btnPrev() {
        console.log('Prev')
        let moveLeft = this.state.position + (100 / this.state.frameSize) * this.state.scrollPage

        this.setState({
            position: moveLeft,
            scrollStyle: {
                transition: this.state.speed + 's',
                left: moveLeft + '%'
            },
            currentPage: this.state.currentPage - 1
        })

        if (this.state.scrollPage * this.state.currentPage <= 0) {
            if (this.state.frameSize == 3) {
                this.setState({
                    scrollStyle: {
                        left: 0 + '%'
                    }
                })
            }
        } else {

        }

        console.log(this.state.currentPage)
    }

    setCurrentBox(x, y) {
        this.setState({
            currentBox: {
                x, y
            }
        })
    }

    // isCurrentPage(index) {
    //     return (index < (this.state.frameSize * this.state.tablePage)
    //         && index >= (this.state.tablePage - 1) * this.state.frameSize)
    // }

    renderTableHeader() {
        const { tripData } = this.state;
        const createHead = tripData.map(({ date, date_year }, index) => {
            return (
                <div key={date}
                    className={[
                        'th row-date',
                        date_year ? 'new-year' : ''
                        // this.isCurrentPage(index) ? '' : ''
                    ].join(' ')}
                    data-year={date_year}>{date}</div>
            )
        })
        return createHead
    }

    rowDate() {
        return this.state.tripData
            .map((value, index) => {
                return (
                    <div className=
                        {`th col-date ${value.date_year ? 'new-year' : ''}`}
                        data-year={value.date_year}>
                        {value.date}
                    </div>
                )
            })
    }

    renderTableRow() {
        const { tripData } = this.state;
        const createBody = tripData.map(({ data }, index) => {
            return (
                <div className="tr" key={index}>
                    {
                        data.map((row, index2) => {
                            const { price, isTheCheapest } = row

                            return (
                                <React.Fragment key={index2}>
                                    <div className={`td ${isTheCheapest ? 'cheapest' : ''}` +
                                        (this.state.currentBox.x == index2 ? ' selected' : '') +
                                        (this.state.currentBox.y == index ? ' selected' : '') +
                                        (this.state.currentBox.x == index2 && this.state.currentBox.y == index ? ' active ' : '')
                                        // (this.isCurrentPage(index2) ? '' : '')
                                    } style={this.state.scrollStyle}
                                        onClick={
                                            e => { this.setCurrentBox(index2, index) }
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
        return createBody
    }

    render() {
        return (
            <div className="fztable">
                <h1 id='title'>React Dynamic Table</h1>
                <div className="table">
                    <button className={`btn btn-prev ${this.state.arrowPrev}`} onClick={this.btnPrev}></button>
                    <button className={`btn btn-next ${this.state.arrowNext ? '' : 'disabled'}`} onClick={this.btnNext}></button>
                    <div className="thead">
                        <div className="column-header">
                            <div className="th title">
                                <p>回程</p>
                                <p>去程</p>
                            </div>
                            {this.rowDate()}
                        </div>
                    </div>
                    <div className="tbody">
                        <div className={`mask col-${this.state.frameSize}`}>
                            <div className="tr" style={this.state.scrollStyle}>
                                {this.renderTableHeader()}
                            </div>
                            {this.renderTableRow()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Fztable;
