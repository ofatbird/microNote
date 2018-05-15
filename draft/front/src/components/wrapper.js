import React, { Component } from 'react';

class Wrapper extends Component {
    render() {
        const { content } = this.props
        const dateStr = content
        return (<div className="wrapper">
                    <div className="text-wrapper"></div>
                    {content.img ? <div className="img-wrapper"><img src={content.img} /></div>: null}
                    <div className="infoboard">
                        <span>{dateStr}</span>
                        <span>content.client</span>
                    </div>
                </div>)
    }
}