import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Board from '../components/board'
import Header from '../components/Header'

const App = () => (
    <Router>
        <div className="main-page">
            <Header />
            <Route exact path="/" component={Board} />
            <Route path="/date/:dateParam" component={Board} />
        </div>
    </Router>
);

export default App;

