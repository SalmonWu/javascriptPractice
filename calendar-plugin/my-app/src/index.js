import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/style.sass';
import "font-awesome/css/font-awesome.css";
import App from './app'

window.calendar = ReactDOM.render(<App />, document.getElementById("root"));