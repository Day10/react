import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { increase, decrease } from '../actions/index'

class Home extends Component {
    render() {

        return (
            <div>
                {{ Home }}
            </div>
        )
    }
}

export default Home