import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/style.sass';
import "font-awesome/css/font-awesome.css";
import Calendar from "./calendar";
import data1 from './data/data1.json'
import axios from 'axios';


// let asyncData = []
// asyncData = response.data

axios.get('./data/data1.json')
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error.data)
    })

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

window.calendar = ReactDOM.render(<Calendar
    dataKeySetting={{
        // 保證出團
        'guaranteed': 'guaranteed',
        //日期
        'date': 'date',
        // 狀態
        'status': 'status',
        // 可賣團位
        'available': 'availableVancancy',
        // 團位
        'total': 'totalVacnacy',
        // 價格
        'price': 'price'
    }}

    tripData={data1}
// tripData={asyncData}
// tripData={inputData}
// tripData={resetData}
/>, document.getElementById("root"));