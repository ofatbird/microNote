import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import fetchMongo from '../utils/fetch'
import format from '../utils/time'
import formatUrl from '../utils/url'
import AudioPlayer from './audioPlayer'
import Loader from './loading'
import Lazyload from './Lazyload'

import './board.css';

const fm = new fetchMongo()
class Board extends Component {
    constructor() {
        super()
        this.state = {
            docs: [],
            isloading: false,
            currentMusic: ''
        }
        this.date = null
    }

    // static async getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.params.dateParam === this.date) {
    //         return null
    //     }
    //     const cur_day = new Date(+year, +month - 1, +day, 0, 0, 0)
    //     if (cur_day.toString().indexOf('Invalid') > -1) {
    //         return { docs: [] }
    //     }
    //     return { docs: await fm.fetch() }
    // }

    async componentDidMount() {
        const { match } = this.props
        await fm.init()
        if (match.params.dateParam) {
            const [year, month, day] = match.params.dateParam.split('-')
            const cur_day = new Date(+year, +month - 1, +day, 0, 0, 0)
            if (cur_day.toString().indexOf('Invalid') > -1) {
                this.setState({ docs: [] })
                return
            }
            this.date = match.params.dateParam
            const next_day = new Date(+year, +month - 1, +day + 1, 0, 0, 0)
            this.setState({ isloading: true })
            const docs = await fm.fetch({ create_at: { $gt: cur_day.getTime(), $lt: next_day.getTime() } })
            this.setState({ docs, isloading: false })
            return
        }
        this.setState({ isloading: true })
        const docs = await fm.fetch(0)
        this.setState({ docs, isloading: false })
    }
    async componentWillUpdate(nextProps) {
        const { match } = nextProps
        if (!match.params.dateParam || match.params.dateParam === this.date) {
            return null
        }
        const [year, month, day] = match.params.dateParam.split('-')
        const cur_day = new Date(+year, +month - 1, +day, 0, 0, 0)
        if (cur_day.toString().indexOf('Invalid') > -1) {
            return { docs: [] }
        }
        this.date = match.params.dateParam
        const next_day = new Date(+year, +month - 1, +day + 1, 0, 0, 0)
        this.setState({ isloading: true })
        const docs = await fm.fetch({ create_at: { $gt: cur_day.getTime(), $lt: next_day.getTime() } })
        this.setState({ docs, isloading: false })
    }

    handleMusicClick = (id) => {
        this.setState({ currentMusic: id })
    }
    render() {
        const { docs } = this.state
        return (
            <div className="locate-position">
                <div className="note-container">
                    {this.state.isloading ? <Loader notice="正在拉取数据" /> : docs.map(content => {
                        const { create_at, text_content, music } = content
                        const dateStr = format(create_at)
                        const contentStr = { __html: formatUrl(text_content) }
                        return (
                            <div key={content._id.toString()} className="wrapper">
                                <div className="date space small"><Link to={`/date/${dateStr.link_format}`} >{dateStr.cn_format}</Link></div>
                                <div className="text-wrapper space" dangerouslySetInnerHTML={contentStr} />
                                {music ? <AudioPlayer songId={music.id} currentId={this.state.currentMusic} name={music.name} picUrl={music.url} handlePlayClick={this.handleMusicClick} /> : null}
                                {
                                    content.img ? <Lazyload><div className="img-wrapper space"><img src={content.img} alt="default" /></div></Lazyload> : null
                                }
                                <div className="infoboard space small">
                                    <span>{content.client}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Board;
