// 计数器
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { increase, decrease } from '../actions/index'

class App extends Component {
    render() {

        return (
            <div>
                {{ App }}
            </div>
        )
    }
}

export default App