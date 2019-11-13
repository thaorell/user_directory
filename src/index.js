import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

// import my components
import ListComponent from './component/list'
import DetailsComponent from './component/details'
import HeaderComponent from './component/header'

const routing = (
    <Router>
        <Switch>
          <Route exact path="/" component={ListComponent} />
          <Route path="/users/:id" component={DetailsComponent} />
          {/* <Route component={Notfound} /> */}
        </Switch>
    </Router>
  )


ReactDOM.render(routing, document.getElementById('app'))
ReactDOM.render(<HeaderComponent/>, document.getElementById('header'))
