import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'

import Store        from './GlobalStore/Store'
import App          from './components/App'


const renderApp = () => {
  ReactDOM.render(
      <Provider store={Store}>
        <App />
      </Provider>
    ,document.getElementById('app')
  )
}

renderApp()