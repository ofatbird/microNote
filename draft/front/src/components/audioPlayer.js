import React, { Component } from 'react'

import './audio.css'


function format(t) {
    // const trimedTime = Math.floor(t)
    if (!t) return `00:00`
    const min = Math.floor(t / 60)
    const sec = Math.floor(t % 60)
    // const finalMin = 
    return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`
}

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlay: false,
            audio: new Audio(`http://music.163.com/song/media/outer/url?id=${props.songId}.mp3`),
            process: 0
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { songId, currentId } = nextProps
        const { isPlay, audio } = prevState
        if (songId !== currentId) {
            if (isPlay) {
                audio.currentTime && audio.pause()
                return {isPlay: !isPlay}
            }
        }
        return null
    }

    // componentWillMount() {
    //     // this.setState({ audio:  })
    //     const { audio } = this.state
    //     audio.addEventListener('timeupdate', () => {
    //         this.setState({ process: audio.currentTime / audio.duration })
    //     })
    //     audio.addEventListener('ended', () => {
    //         this.setState({ isPlay: !this.state.isPlay })
    //     })
    // }
    componentDidMount() {
        const { audio } = this.state
        audio.addEventListener('timeupdate', () => {
            this.setState({ process: audio.currentTime / audio.duration })
        })
        audio.addEventListener('ended', () => {
            this.setState({ isPlay: !this.state.isPlay })
        })
        audio.addEventListener('canplay', () => {
            this.forceUpdate()
        })
    }
    handleAlbumClick = () => {
        const { isPlay, audio } = this.state
        const { handlePlayClick, songId } = this.props
        if (isPlay) {
            audio.pause()
        } else {
            audio.play()
            handlePlayClick(songId)
        }
        this.setState({ isPlay: !isPlay })
        // this.setState( preState => ({ play: !preState.play}))
    }
    render() {
        const { process, isPlay, audio } = this.state
        const { name, picUrl } = this.props
        const left = audio.duration ? format(audio.duration - audio.currentTime) : `00:00`
        const [songName, singer] = name.split('-')
        return (
            <div className="html-player">
                <div className="player">
                    <div className="album"
                        onClick={this.handleAlbumClick}
                        style={{ backgroundImage: `url(${picUrl}?param=78y78)` }}>
                        <div className="mask">
                            {!isPlay ? <i className="btn play-btn iconfont">&#xe600;</i> : <i className="btn pause-btn iconfont">&#xe81f;</i>}
                        </div>
                    </div>
                    <div className="song-info">
                        <div className="name"><span>{songName}</span><br /><span>{singer}</span></div>
                        <div className="time-passed">{left}</div>
                        <div className="play-track">
                            <div className="progress" style={{ transform: `scaleX(${process})` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}