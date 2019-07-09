import React, { Component } from "react";
import TripData from "./data/tripData.json";

class Fztable extends Component {
    constructor(props) {
        super(props)

        this.myRef = React.createRef();
        this.btnNext = this.btnNext.bind(this)
        this.btnPrev = this.btnPrev.bind(this)
    }

    state = {
        'tripData': TripData.data,
        currentBox: {
            x: -1,
            y: -1
        },
        // M版時一個畫面show幾格儲存格
        frameSize: 3,
        // M版時每次點擊往前往後移動幾格儲存格
        scrollPage: 3,
        position: 0,
        // 設定花多久時間移動完成
        speed: .3,
        scrollStyle: {
            transition: this.speed + 's',
            left: 0 + '%'
        },
        arrowNext: true,
        arrowPrev: false
    }

    whenClick(e) {
        this.props.whenClick(e)
    }

    mobileTransition() {
        if (window.innerWidth) {
            this.setState({
                scrollStyle: {
                    left: this.state.scrollStyle.left + '%',
                    transition: 0 + 's'
                }
            })
        }
    }

    componentDidMount() {
        // merge props into state.
        this.setState(
            (state, props) => {
                return props;
            })
        this.mobileTransition()
        window.addEventListener("resize", this.mobileTransition.bind(this))
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
            arrowPrev: true
        })

        if (this.state.frameSize === 1) {
            if (moveRight <= -600) {
                this.setState({
                    scrollStyle: {
                        transition: this.state.speed + 's',
                        left: -600 + '%'
                    },
                    arrowNext: false
                })
            }
        } else if (this.state.frameSize === 2) {
            if (moveRight <= -250) {
                this.setState({
                    scrollStyle: {
                        transition: this.state.speed + 's',
                        left: -250 + '%'
                    },
                    arrowNext: false
                })
            }
        } else if (this.state.frameSize === 3) {
            if (moveRight <= -133) {
                this.setState({
                    scrollStyle: {
                        transition: this.state.speed + 's',
                        left: -133.33336 + '%'
                    },
                    arrowNext: false
                })
            }
        } else if (this.state.frameSize === 4) {
            if (moveRight <= -75) {
                this.setState({
                    scrollStyle: {
                        transition: this.state.speed + 's',
                        left: -75 + '%'
                    },
                    arrowNext: false
                })
            }
        } else if (this.state.frameSize === 5) {
            if (moveRight <= -40) {
                this.setState({
                    scrollStyle: {
                        transition: this.state.speed + 's',
                        left: -40 + '%'
                    },
                    arrowNext: false
                })
            }
        } else if (this.state.frameSize === 6) {
            if (moveRight <= -16.666) {
                this.setState({
                    scrollStyle: {
                        transition: this.state.speed + 's',
                        left: -16.666 + '%'
                    },
                    arrowNext: false
                })
            }
        }
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
            arrowNext: true
        })

        if (moveLeft >= 0) {
            this.setState({
                scrollStyle: {
                    transition: this.state.speed + 's',
                    left: 0 + '%'
                },
                arrowPrev: false
            })
        }
    }

    setCurrentBox(x, y) {
        this.setState({
            currentBox: {
                x, y
            }
        })
    }

    renderTableHeader() {
        const { tripData } = this.state;
        const createHead = tripData.map(({ date, date_year }, header) => {
            return (
                <div key={date}
                    className={[
                        'th row-date',
                        date_year ? 'new-year' : ''
                    ].join(' ')}
                    data-year={date_year}>{date}</div>
            )
        })
        return createHead
    }

    renderTableDate() {
        return this.state.tripData
            .map((value, date) => {
                return (
                    <div key={date} className=
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
                <div className="tr" key={index} style={this.state.scrollStyle}>
                    {
                        data.map((row, index2) => {
                            const { price, isTheCheapest } = row
                            return (
                                <React.Fragment key={index2}>
                                    <div className={`td ${isTheCheapest ? 'cheapest' : ''}` +
                                        (this.state.currentBox.x === index2 ? ' selected' : '') +
                                        (this.state.currentBox.y === index ? ' selected' : '') +
                                        (this.state.currentBox.x === index2 && this.state.currentBox.y === index ? ' active ' : '')
                                    }
                                        onClick={
                                            (e) => {
                                                this.setCurrentBox(index2, index)
                                                this.whenClick(e.target)
                                            }
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
                    <button className={`btn btn-prev ${this.state.arrowPrev ? '' : 'disabled'}`} onClick={this.btnPrev}></button>
                    <button className={`btn btn-next ${this.state.arrowNext ? '' : 'disabled'}`} onClick={this.btnNext}></button>
                    <div className="thead">
                        <div className="column-header">
                            <div className="th title">
                                <p>回程</p>
                                <p>去程</p>
                            </div>
                            {this.renderTableDate()}
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