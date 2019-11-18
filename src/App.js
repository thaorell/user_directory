import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// import my components
import ListContainer from './component/ListContainer'
import DetailsContainer from './component/DetailsContainer'
import ErrorBoundary from './component/error'
import NotFound from './component/NotFound'

const link = "http://jsonplaceholder.typicode.com/users"

// Router for 3 things: 
// 1. "/" is the home page
// 2. "/users/:id" is the details for each user with :id matching the index in json list
// 3. 404 page
class App extends React.Component {
  render () {
    return (
    <Router>
    <Switch>
      <Route exact path="/" 
        render={(props) => <ListContainer {...props} url={link} />}
      />
      <Route path="/users/:id" render={ props => <ErrorBoundary>
        <DetailsContainer {...props} url={link} />
      </ErrorBoundary>} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
    )
  }
}

export default App;
