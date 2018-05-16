import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <a className="logo" href="github.com">MicroNote</a>
                <div>Simple And Ease</div>
                <div className="owner">
                    <span className="avatar"></span>
                    <span className="name">Avatar</span>
                </div>
            </div>
        )
    }
}