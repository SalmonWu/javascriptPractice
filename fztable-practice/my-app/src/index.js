import React from "react";
import ReactDOM from "react-dom";
// import "./stylesheets/style.css";
import './stylesheets/style.sass';
// import Fztable from "./fztable";
import Fztable from "./table-test";

const setting = {
    // M版時一個畫面show幾格儲存格
    frameSize: 3,
    // M版時每次點擊往前往後移動幾格儲存格
    scrollPage: 3,
    // 設定花多久時間移動完成
    speed: .3,
    // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
    whenClick: function (e) {
        console.log(e)
    }
};

ReactDOM.render(<Fztable
    // ref={this.textInput}
    {...setting}
/>, document.getElementById("root"));
