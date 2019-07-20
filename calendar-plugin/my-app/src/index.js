import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/style.sass';
import "font-awesome/css/font-awesome.css";
import Calendar from "./calendar";
import data1 from './data/data1.json'
import axios from 'axios';
import App from './app'


let asyncData = []



// let addData = [{
//     "guaranteed": false,
//     "date": "2018/07/01",
//     "price": 76263,
//     "availableVancancy": 16,
//     "totalVacnacy": 166,
//     "status": "預定"
// }, {
//     "guaranteed": false,
//     "date": "2018/07/02",
//     "price": 12345,
//     "availableVancancy": 16,
//     "totalVacnacy": 166,
//     "status": "預定"
// }]

// let inputData = [...addData, ...data1]
// let resetData = [...addData]

window.calendar = ReactDOM.render(<App />, document.getElementById("root"));