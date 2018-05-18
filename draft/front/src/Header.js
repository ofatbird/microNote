import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <a className="logo" href="github.com">MicroNote</a>
                <div>Simple And Ease</div>
                <a className="owner" href="//github.com/ofatbird">
                    <span className="avatar"></span>
                    <span className="ownerName">ofatbird</span>
                </a>
            </div>
        )
    }
}