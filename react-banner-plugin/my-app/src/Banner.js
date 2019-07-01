import React, { Component } from 'react';
import bannerImg from './imgs/1200x380.png';

class Banner extends Component {
    state = {
        title: 'banner',
        openAtStart: true, // [boolean] true | false
        autoToggle: true, // [boolean|number] true | false | 3000
        button: {
            closeText: '收合', // [string]
            openText: '展開', // [string]
            class: 'btn' // [string]
        },
        class: {
            closed: 'closed', // [string]
            closing: 'closing', // [string]
            opened: 'opened', // [string]
            opening: 'opening' // [string]
        },
        transition: true,
        whenTransition: function() {
            console.log('whenTransition');
        }
    }

    constructor(props) {
        super(props); 
            let openAtStart = this.props.openAtStart
            let autoToggle = this.props.autoToggle
            let transition = this.props.transition
            console.log(transition)
    }

    open() {
        this.setState({openAtStart: true})
        console.log('open');
    }

    close() {
        this.setState({openAtStart: false})
        console.log('close');
    }

    toggle() {
        if (!this.state.openAtStart)
            this.open();
        else 
            this.close();
    }

    transition() {
        if (this.state.transition) 
            setTimeout(() => {
                
            });
    }

    handleClick() {
        this.toggle();
    }

    render() {
        console.log(this.props.openAtStart)
        var buttonClass = 'btn' + ' ' + this.state.button.class
        var buttonText = !this.state.openAtStart ? this.state.button.openText : this.state.button.closeText
        var bannerClass
        if(this.state.openAtStart) 
            if (this.state.transition)
                bannerClass = 'opening' + ' ' + this.state.class.opening;
            else 
                bannerClass = 'opened' + ' ' + this.state.class.opened
        else
            if (this.state.transition) 
                bannerClass = 'colsing' + ' ' + this.state.class.closing
            else 
                bannerClass = 'closed' + ' ' + this.state.class.closed
        return <div 
            className={this.state.title + ' ' + bannerClass} >
            <div className='wrap'>
                <img src={bannerImg}></img>
                <button className={buttonClass} onClick={() => this.handleClick()}>{buttonText}</button>
            </div>
        </div>
    }
}

export default Banner;