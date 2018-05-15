import React, { Component } from 'react'
// import Wrapper from './components/wrapper'
import fetchMongo from './utils/fetch'
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
    return !docs.map ? null : docs.map(content => {
      const { create_at, update_at } = content
      const dateStr = create_at === update_at ? `发表于: ${create_at}` : `更新于: ${update_at}`
      return (
        <div key={content._id.toString()} className="wrapper">
          <div className="text-wrapper">{content.text_content}</div>
          {content.img ? <div className="img-wrapper"><img src={content.img} alt="default" /></div> : null}
          <div className="infoboard">
            <span>{dateStr}</span>
            <span>{content.client}</span>
          </div>
        </div>
      )
    });
  }
}

export default App;
