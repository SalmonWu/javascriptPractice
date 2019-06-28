import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/style.css';
import Banner from './Banner';

ReactDOM.render(<Banner
    openAtStart={this.props}
    autoToggle={this.props}
    transition={this.props}
    />, document.getElementById('root'));