import React, { Component } from 'react'
import fetchMongo from './utils/fetch'
import format from './utils/time'
import formatUrl from './utils/url'
import Header from './Header'
import AudioPlayer from './components/audioPlayer'
import './App.css';

const fecthMongo = new fetchMongo()
class App extends Component {
  constructor() {
    super()
    this.state = {
      docs: []
    }
  }
  async componentDidMount() {
    await fecthMongo.init()
    const docs = await fecthMongo.fetch(0)
    console.log(docs)
    this.setState({ docs })
  }
  render() {
    const { docs } = this.state
    console.log(docs.map)
    return (
      <div className="main-page">
        <Header />
        <div className="locate-position">
          <div className="note-container">
            <AudioPlayer songId="404184562" name="Everytime" picUrl="https://p1.music.126.net/FzvcMiD115qWr1X92PXK_g==/1393081234054695.jpg?param=78y78" />
            {!docs.map ? null : docs.map(content => {
              const { create_at, text_content } = content
              const dateStr = format(create_at)
              const contentStr = { __html: formatUrl(text_content) }
              return (
                <div key={content._id.toString()} className="wrapper">
                  <div className="date space small">{dateStr}</div>
                  <div className="text-wrapper space" dangerouslySetInnerHTML={contentStr} />
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
