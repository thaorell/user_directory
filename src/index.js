import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

// import my components
import ListComponent from './component/list'
import DetailsComponent from './component/details'
import HeaderComponent from './component/header'
import ErrorBoundary from './component/error'
import NotFound from './component/notfound'

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={ListComponent} />
      <Route path="/users/:id" render={ props => <ErrorBoundary>
        <DetailsComponent {...props}/>
      </ErrorBoundary>} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)

ReactDOM.render(<HeaderComponent />, document.getElementById('header'))
ReactDOM.render(routing, document.getElementById('app'))
