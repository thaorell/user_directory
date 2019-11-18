import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import HeaderComponent from './component/Header'

ReactDOM.render(<HeaderComponent />, document.getElementById('header'))
ReactDOM.render(<App/>, document.getElementById('app'))
