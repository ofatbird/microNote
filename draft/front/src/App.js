import React, { Component } from 'react'
import fetchMongo from './utils/fetch'
import format from './utils/time'
import formatUrl from './utils/url'
import Header from './Header'
import AudioPlayer from './components/audioPlayer'
import Loader from './components/loading'
import './App.css';

const fecthMongo = new fetchMongo()
class App extends Component {
  constructor() {
    super()
    this.state = {
      docs: [],
      currentMusic:''
    }
  }
  async componentDidMount() {
    await fecthMongo.init()
    const docs = await fecthMongo.fetch(0)
    // setTimeout(() => {
    //   this.setState({ docs })
    // }, 13000)

    this.setState({ docs })
  }
  handleMusicClick = (id) => {
    console.log(id)
    this.setState({currentMusic: id})
  }
  render() {
    const { docs } = this.state
    return (
      <div className="main-page">
        <Header />
        <div className="locate-position">
          <div className="note-container">
            {!docs.length ? <Loader notice="正在拉取数据" />: docs.map(content => {
              const { create_at, text_content, music } = content
              const dateStr = format(create_at)
              const contentStr = { __html: formatUrl(text_content) }
              return (
                <div key={content._id.toString()} className="wrapper">
                  <div className="date space small">{dateStr}</div>
                  <div className="text-wrapper space" dangerouslySetInnerHTML={contentStr} />
                  {music ? <AudioPlayer songId={music.id} currentId={this.state.currentMusic} name={music.name} picUrl={music.url} handlePlayClick={this.handleMusicClick} /> : null}
                  {content.img ? <div className="img-wrapper space"><img src={content.img} alt="default" /></div> : null}
                  <div className="infoboard space small">
                    <span>{content.client}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
