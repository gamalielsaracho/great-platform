import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'

import { Provider } from 'react-redux'

import AppContainer from '../App'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={AppContainer} />
    </Router>
  </Provider>
)

export default Root