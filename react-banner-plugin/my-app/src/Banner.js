import React, { Component } from 'react';
import bannerImg from './1200x380.png';

class Banner extends Component {
    render() {
        return <div className='banner'>
            <div className='wrap'>
                <img src={bannerImg}></img>
                <button className='btn'></button>
            </div>
        </div>
    }
}

export default Banner;