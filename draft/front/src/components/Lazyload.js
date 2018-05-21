import React, { Component } from 'react'
import { debounce, getOffsetTop } from '../utils'
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
            console.log('!!!')
            if (wrapperOffset < window.scrollY + viewportHeight) {
                console.log('????')
                this.setState({ loaded: true })
                document.removeEventListener('scroll', listenScrollTop)
            }
        }, 500, 2000)
        document.addEventListener('scroll', listenScrollTop)

        if (wrapperOffset < window.scrollY + viewportHeight) {
            this.setState({ loaded: true })
            document.removeEventListener('scroll', listenScrollTop)
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