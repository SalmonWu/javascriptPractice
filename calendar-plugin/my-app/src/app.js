import React, { Component } from 'react'
import Calendar from './calendar'
import axios from 'axios'

class App extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get('./data/data1.json')
            .then(response => {
                this.putData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    putData(data) {
        this.setState({ data })
    }

    render() {
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

        // let inputData = [...addData, ...this.state.data]
        // let resetData = [...addData]

        if (this.state.data.length) {
            return <Calendar
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

                tripData={this.state.data}
                // tripData={inputData}
                // tripData={resetData}
                initYearMonth={'2018-07'}
            ></Calendar>
        } else {
            return <div>Loading</div>
        }
    }
}

export default App;