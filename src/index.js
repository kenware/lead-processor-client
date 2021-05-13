import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import store from './store'
import './index.scss'
import Router from './router'
import interceptor from './interceptors'

import reportWebVitals from './reportWebVitals'
interceptor()

ReactDOM.render(
<Provider store={store}>
    <Router />
  </Provider>,
document.getElementById('root')
)
reportWebVitals()
