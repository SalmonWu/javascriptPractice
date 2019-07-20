import React, { Component } from 'react'
import Calendar from './calendar'
import axios from 'axios'
import data1 from './data/data1.json'

class App extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get('./data/data5.json')
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

                // tripData={data1}
                tripData={this.state.data}
            // tripData={inputData}
            // tripData={resetData}
            ></Calendar>
        } else {
            return <div>Loading</div>
        }
    }
}

export default App;