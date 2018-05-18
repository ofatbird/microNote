import React, { Component } from 'react'
import './loading.css'

export default class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                <div className="hint">{this.props.notice}</div>
            </div>
        )
    }
}