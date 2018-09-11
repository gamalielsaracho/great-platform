import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './store'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import AppContainer from '././app/components/App'

// import { createStore, applyMiddleware } from 'redux'
// import reduxThunk from 'redux-thunk'
// import reducers from './reducers'

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
// const store = createStoreWithMiddleware(reducers)

import routes from './routes'

import Root from '././app/components/Root'

const store = configureStore()

		// <BrowserRouter>
		// </BrowserRouter>
ReactDOM.render(<Root store={store} />, document.getElementById('root'))
		// <Router history={browserHistory} routes={routes}/>