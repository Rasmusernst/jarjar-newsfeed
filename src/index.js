import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import createStore from './createStore'
import registerServiceWorker from './registerServiceWorker'

const store = createStore()

ReactDOM.render(<App store={store}/>, document.getElementById('root'))
registerServiceWorker()
