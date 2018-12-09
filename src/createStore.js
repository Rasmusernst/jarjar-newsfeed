import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './stores/index'

const middlewares = [
	thunkMiddleware,
]

// workaround for Redux devTools Extension https://github.com/zalmoxisus/redux-devtools-extension
const enhancers = []
if (window.location.host.toLowerCase() === 'localhost:3000') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension())
	}
}

export default () => {
	const createStoreWithMiddleware = compose(
		applyMiddleware(...middlewares),
		...enhancers,
	)(createStore)

	const store = createStoreWithMiddleware(rootReducer)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./stores', () => {
			const nextRootReducer = require('./stores').default
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
