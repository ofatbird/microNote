import React, { Component } from 'react'
import './imageLoader.css'
// specially for image
export default class Lazyload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }
    handleLoaded = () => {
        this.setState({loaded: true})
    }
    render() {
        const loader = (
            <div className="loader-container">
            <div className="image-loader">
                <div className="square red"></div>
                <div className="square yellow"></div>
                <div className="square blue"></div>
            </div>
            </div>
        )
        return (
            <div className="image-container">
                <img onLoad={this.handleLoaded} style={this.state.loaded ? {} : {display:'none'} } src={this.props.source} alt="default" />
                {this.state.loaded ? null : loader}
            </div>
        )
    }
}