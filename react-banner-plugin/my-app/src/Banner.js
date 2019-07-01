import React, { Component } from "react";
import bannerImg from "./imgs/1200x380.png";

class Banner extends Component {
    state = {
        title: "banner",
        openAtStart: true, // [boolean] true | false
        autoToggle: true, // [boolean|number] true | false | 3000
        button: {
            closeText: "收合", // [string]
            openText: "展開", // [string]
            class: "btn" // [string]
        },
        class: {
            closed: "closed", // [string]
            closing: "closing", // [string]
            opened: "opened", // [string]
            opening: "opening" // [string]
        },
        transition: true,
        whenTransition: function() {
            console.log("whenTransition");
        }
    };

    componentDidMount() {
        // merge props into state.
        this.setState(
            (state, props) => {
                return props;
            },
            () => {
                if (this.state.autoToggle) {
                    if (!isNaN(this.state.autoToggle)) {
                        setTimeout(() => {
                            this.toggle();
                        }, this.state.autoToggle);
                    } else {
                        this.toggle();
                    }
                }
            }
        );
    }

    open() {
        this.setState({ openAtStart: true });
        this.transition();
    }

    close() {
        this.setState({ openAtStart: false });
        this.transition();
    }

    toggle() {
        if (!this.state.openAtStart) this.open();
        else this.close();
    }

    transition() {
        if (this.state.transition)
            setTimeout(() => {
                this.state.whenTransition();
            });
    }

    handleClick() {
        this.toggle();
    }

    render() {
        // console.log(this.props);
        let buttonClass = "btn" + " " + this.state.button.class;
        let buttonText = !this.state.openAtStart
            ? this.state.button.openText
            : this.state.button.closeText;
        let bannerClass;

        if (this.state.openAtStart) {
            bannerClass = this.state.transition
                ? "opening" + " " + this.state.class.opening
                : "opened" + " " + this.state.class.opened;
        } else {
            bannerClass = this.state.transition
                ? "colsing" + " " + this.state.class.closing
                : "closed" + " " + this.state.class.closed;
        }

        return (
            <div className={this.state.title + " " + bannerClass}>
                <div className="wrap">
                    <img src={bannerImg} />
                    <button
                        className={buttonClass}
                        onClick={() => this.handleClick()}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        );
    }
}

export default Banner;
