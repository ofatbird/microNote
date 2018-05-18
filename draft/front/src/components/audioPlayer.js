import React, { Component } from 'react'

import './audio.css'


function format(t) {
    // const trimedTime = Math.floor(t)
    const min = Math.floor(t / 60)
    const sec = Math.floor(t % 60)
    // const finalMin = 
    return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`
}

export default class AudioPlayer extends Component {
    constructor() {
        super()
        this.state = {
            isPlay: false,
            audio: null,
            process: 0
        }

    }
    componentWillMount() {
        this.setState({ audio: new Audio(`http://music.163.com/song/media/outer/url?id=${this.props.songId}.mp3`) })
    }
    componentDidMount() {
        const { audio } = this.state
        audio.addEventListener('timeupdate', () => {
            this.setState({ process: audio.currentTime / audio.duration })
        })
        audio.addEventListener('ended', () => {
            this.setState({ isPlay: !this.state.isPlay })
        })
    }
    handleAlbumClick = () => {
        const { isPlay, audio } = this.state
        if (isPlay) {
            audio.pause()
        } else {
            audio.play()
        }
        this.setState({ isPlay: !isPlay })
        // this.setState( preState => ({ play: !preState.play}))
    }
    render() {
        const { process, isPlay, audio } = this.state
        const { name, picUrl } = this.props
        return (
            <div className="html-player">
                <div className="player">
                    <div className="album"
                        onClick={this.handleAlbumClick}
                        style={{ backgroundImage: `url(${picUrl})` }}>
                        <div className="mask">
                            {!isPlay ? <i className="btn play-btn iconfont">&#xe600;</i> : <i className="btn pause-btn iconfont">&#xe81f;</i>}
                        </div>
                    </div>
                    <div className="song-info">
                        <div className="name">{name}</div>
                        <div className="time-passed">{audio.duration ? format(audio.duration * process) : `00:00`}</div>
                        <div className="play-track">
                            <div className="progress" style={{ transform: `scaleX(${this.state.process})` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}