import React, { Component } from 'react'
import { debounce, getOffsetTop, throttle } from '../utils'
import { viewportHeight } from '../global'

// specially for image
export default class Lazyload extends Component {
    constructor() {
        super()
        this.wrapper = React.createRef();
        this.state = {
            loaded: false
        }
    }
    componentDidMount() {
        const dom = this.wrapper.current
        let wrapperOffset = getOffsetTop(dom)
        const listenScrollTop = debounce(() => {
            if (wrapperOffset < window.scrollY + viewportHeight) {
                this.setState({ loaded: true })
                document.removeEventListener('scroll', listenScrollTop)
                document.removeEventListener('resize', listenScrollTop)
            }
        }, 500, 2000)
        const listenOffsetTop = throttle(() => {
            wrapperOffset = getOffsetTop(dom)
        }, 500)
        document.addEventListener('scroll', listenScrollTop)
        document.addEventListener('resize', listenOffsetTop)
        if (wrapperOffset < window.scrollY + viewportHeight) {
            this.setState({ loaded: true })
            document.removeEventListener('scroll', listenScrollTop)
            document.removeEventListener('resize', listenScrollTop)
        }
    }

    render() {
        return (
            <div className="lazy" ref={this.wrapper}>
                {this.state.loaded ? this.props.children : null}
            </div>
        )
    }
}