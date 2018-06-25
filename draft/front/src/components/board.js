import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import fetchMongo from '../utils/fetch'
import format from '../utils/time'
import formatUrl from '../utils/url'
import AudioPlayer from './audioPlayer'
import Loader from './loading'
import Lazyload from './Lazyload'
import ImageLoader from './imageLoader'

import { debounce } from '../utils'

import './board.css';

const fm = new fetchMongo()
class Board extends Component {
    constructor() {
        super()
        this.state = {
            docs: [],
            isUpdate: false,
            isloading: false,
            currentMusic: ''
        }
        this.date = null
        this.cutoff = null
        // this.isUpdate = false
    }

    async componentDidMount() {
        const { match } = this.props
        window.addEventListener('scroll', this.updateOnScroll, false)
        await fm.init()
        if (match.params.dateParam) {
            const [year, month, day] = match.params.dateParam.split('-')
            const cur_day = new Date(+year, +month - 1, +day, 0, 0, 0)
            if (cur_day.toString().indexOf('Invalid') > -1) {
                this.cutoff = null
                this.setState({ docs: [] })
                return
            }
            this.date = match.params.dateParam
            const next_day = new Date(+year, +month - 1, +day + 1, 0, 0, 0)
            this.setState({ isloading: true })
            const docs = await fm.fetch({ create_at: { $gt: cur_day.getTime(), $lt: next_day.getTime() } })
            this.setState({ docs, isloading: false })
            this.assignCutOff(docs)
            return
        }
        this.setState({ isloading: true })
        const docs = await fm.fetch(0)
        this.setState({ docs, isloading: false })
        this.assignCutOff(docs)
    }
    async componentWillUpdate(nextProps) {
        const { match } = nextProps
        if (!match.params.dateParam || match.params.dateParam === this.date) {
            return null
        }
        const [year, month, day] = match.params.dateParam.split('-')
        const cur_day = new Date(+year, +month - 1, +day, 0, 0, 0)
        if (cur_day.toString().indexOf('Invalid') > -1) {
            this.cutoff = null
            return { docs: [] }
        }
        this.date = match.params.dateParam
        const next_day = new Date(+year, +month - 1, +day + 1, 0, 0, 0)
        this.setState({ isloading: true })
        const docs = await fm.fetch({ create_at: { $gt: cur_day.getTime(), $lt: next_day.getTime() } })
        this.setState({ docs, isloading: false })
        this.assignCutOff(docs)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateOnScroll, false)
    }

    handleMusicClick = (id) => {
        this.setState({ currentMusic: id })
    }

    updateOnScroll = debounce(async () => {

        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100) && !this.state.isUpdate && this.cutoff
        ) {
            const {docs} = this.state
            this.setState({ isUpdate: true})
            const update = await fm.fetch({ create_at: { $lt: this.cutoff } })
            this.assignCutOff(update)
            this.setState({ docs: docs.concat(update), isUpdate: false})
        }
    }, 500, 2000)

    assignCutOff(data) {
        const len = data.length
        if (len < 20){
            this.cutoff = null
        } else{
            this.cutoff = data[len - 1].create_at
        }
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
                                    content.img ? <Lazyload><div className="img-wrapper space"><ImageLoader source={content.img} /></div></Lazyload> : null
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
