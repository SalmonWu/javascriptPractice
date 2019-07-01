import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/style.css';
import Banner from './Banner';

ReactDOM.render(<Banner
    openAtStart = { true }
    autoToggle = { true }
    transition = { false }
    />, document.getElementById('root'));