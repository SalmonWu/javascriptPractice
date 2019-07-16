import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/style.sass';
import "font-awesome/css/font-awesome.css";
import Calendar from "./calendar";

import data1 from './data/data1.json'

window.calendar = ReactDOM.render(<Calendar
    dataKeySetting={{
        // 保證出團
        'guaranteed': 'guaranteed',
        // 狀態
        'status': 'status',
        // 可賣團位
        'available': 'availableVancancy',
        // 團位
        'total': 'totalVacnacy',
        // 價格
        'price': 'price'
    }}
    tripData={data1} />, document.getElementById("root"));