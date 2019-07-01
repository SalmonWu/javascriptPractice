import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/style.css';
import Banner from './Banner';

const setting = {
    title: 'banner',
    openAtStart: false, // [boolean] true | false
    autoToggle: 1500, // [boolean|number] true | false | 3000
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

ReactDOM.render(<Banner {...setting}/>, document.getElementById('root'));