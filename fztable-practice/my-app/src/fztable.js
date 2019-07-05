import React, { Component } from "react";

class Fztable extends Component {
    render() {
        return (
            <div className="fztable">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="title">
                                    <p>回程</p>
                                    <p>去程</p>
                                </div>
                            </th>
                            <th>
                                <div className="slide">
                                    <div className="col col1"><span>12/27(一)</span></div>
                                    <div className="col col2"><span>12/28(二)</span></div>
                                    <div className="col col3"><span>12/29(三)</span></div>
                                    <div className="col col4"><span>12/30(四)</span></div>
                                    <div className="col col5"><span>12/31(五)</span></div>
                                    <div className="col col6"><span>01/01(六)</span></div>
                                    <div className="col col7"><span>01/02(日)</span></div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <div className="date">
                                    <span>12/27(一)</span>
                                </div>
                            </th>
                            <td>
                                <div className="slide">
                                    <div className="col col1"><span>－－</span></div>
                                    <div className="col col2"><span className="price">$15,568</span></div>
                                    <div className="col col3"><span className="price">$15,568</span></div>
                                    <div className="col col4"><span className="price">$15,568</span></div>
                                    <div className="col col5"><span className="price">$15,568</span></div>
                                    <div className="col col6"><span className="price">$15,568</span></div>
                                    <div className="col col7"><span className="price">$15,568</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className="date">
                                    <span>12/28(二)</span>
                                </div>
                            </th>
                            <td>
                                <div className="slide">
                                    <div className="col col1"><span className="price">$15,568</span></div>
                                    <div className="col col2"><span className="price">$15,568</span></div>
                                    <div className="col col3"><span className="price">$15,568</span></div>
                                    <div className="col col4"><span className="price">$15,568</span></div>
                                    <div className="col col5"><span className="price">$15,568</span></div>
                                    <div className="col col6"><span className="price">$15,568</span></div>
                                    <div className="col col7"><span className="price">$15,568</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className="date">
                                    <span>12/29(三)</span>
                                </div>
                            </th>
                            <td>
                                <div className="slide">
                                    <div className="col col1"><span></span></div>
                                    <div className="col col2"><span className="price">$15,568</span></div>
                                    <div className="col col3"><span className="price">$15,568</span></div>
                                    <div className="col col4"><span className="price">$15,568</span></div>
                                    <div className="col col5"><span className="price">$15,568</span></div>
                                    <div className="col col6"><span className="price">$15,568</span></div>
                                    <div className="col col7"><span className="price">$15,568</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className="date">
                                    <span>12/30(四)</span>
                                </div>
                            </th>
                            <td>
                                <div className="slide">
                                    <div className="col col1"><span></span></div>
                                    <div className="col col2"><span></span></div>
                                    <div className="col col3"><span></span></div>
                                    <div className="col col4"><span></span></div>
                                    <div className="col col5"><span></span></div>
                                    <div className="col col6"><span></span></div>
                                    <div className="col col7"><span></span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className="date">
                                    <span>12/31(五)</span>
                                </div>
                            </th>
                            <td>
                                <div className="slide">
                                    <div className="col col1"><span></span></div>
                                    <div className="col col2"><span></span></div>
                                    <div className="col col3"><span></span></div>
                                    <div className="col col4"><span></span></div>
                                    <div className="col col5"><span></span></div>
                                    <div className="col col6"><span></span></div>
                                    <div className="col col7"><span></span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className="date new_year">
                                    <span>01/01(六)</span>
                                </div>
                            </th>
                            <td>
                                <div className="slide">
                                    <div className="col col1"><span></span></div>
                                    <div className="col col2"><span></span></div>
                                    <div className="col col3"><span></span></div>
                                    <div className="col col4"><span></span></div>
                                    <div className="col col5"><span></span></div>
                                    <div className="col col6"><span></span></div>
                                    <div className="col col7"><span></span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className="date">
                                    <span>01/02(日)</span>
                                </div>
                            </th>
                            <td>
                                <div className="slide">
                                    <div className="col col1"><span></span></div>
                                    <div className="col col2"><span></span></div>
                                    <div className="col col3"><span></span></div>
                                    <div className="col col4"><span></span></div>
                                    <div className="col col5"><span></span></div>
                                    <div className="col col6"><span></span></div>
                                    <div className="col col7"><span></span></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Fztable;
