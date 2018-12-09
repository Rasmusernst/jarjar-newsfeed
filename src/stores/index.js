import { combineReducers } from 'redux'

import newsFeed from './newsFeed'

const rootReducer = combineReducers({
	newsFeed,
})

export default rootReducer
