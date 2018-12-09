import { handleActions } from 'redux-actions'
import { fromJS, Record } from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_ERROR = 'NEWSFEED/ERROR'
export const SET_ENTRIES = 'NEWSFEED/SET_ENTRIES'
export const SET_USER = 'NEWSFEED/SET_USER'
export const SET_SHOW_COMMENTS_FOR_ENTRY = 'NEWSFEED/SET_SHOW_COMMENTS_FOR_ENTRY'

const getRandom = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// initial data for localStorage
const data = [
	{
		id: getRandom(),
		body: 'Crashded da boss\'s heyblibber... again.',
		dateCreated: Date.now(),
		cake: 2,
		happy: 0,
		authorName: 'Jar Jar',
		comments: [],
	},
	{
		id: getRandom(),
		body: 'Hey! Some moof-milker installed a compressor on the ignition line.',
		dateCreated: Date.now(),
		cake: 4,
		happy: 10,
		authorName: 'Solo',
		comments: [
			{
				id: getRandom(),
				body: 'I\'m gonna make you and that worrisome droid pay for what you\'ve done.',
				cake: 0,
				happy: 2,
				authorName: 'Plutt',
			},
		],
	},
]

// ------------------------------------
// initialState
// ------------------------------------
const State = Record({
	error: null,
	_entries: [], //  key of entries throws an error with records api. renamed to _entries.
	user: 'Jar Jar',
	showCommentsForEntry: null,
}, 'newsFeed')

const initialState = State()

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
	setError: (payload) => ({ type: SET_ERROR, payload }),

	getEntries: () => (dispatch) => {
		localStorage.getItem('JarJarEntries') === null && localStorage.setItem('JarJarEntries', JSON.stringify(data))
		let entries = JSON.parse(localStorage.getItem('JarJarEntries'))
		entries =	entries.sort((a, b) => b.dateCreated - a.dateCreated)
		dispatch({ type: SET_ENTRIES, payload: entries })
	},

	logIn: (name) => (dispatch) => {
		dispatch({ type: SET_USER, payload: name })
	},

	logOut: () => (dispatch) => {
		dispatch({ type: SET_USER, payload: null })
	},

	addEntry: (body = '', user = '', type = '', entryId = null) => (dispatch) => {
		let entries = JSON.parse(localStorage.getItem('JarJarEntries'))

		// Check for type of entry
		if (type === 'Entry') {
			//to do: replace cake and happy int with arrays of users who reacted to the entry/comment to prevent spamming reactions
			let newEntry = {
				id: getRandom(),
				body: body,
				dateCreated: Date.now(),
				cake: 0,
				happy: 0, // Jar Jar wouldn't create a newsfeed with negative reactions
				authorName: user,
				comments: [],
			}
			entries.push(newEntry)

			// add to localStorage and dispatch
			localStorage.setItem('JarJarEntries', JSON.stringify(entries))
			dispatch(actions.getEntries())
		} else {
			// find index of matching id in entries array
			const foundIndex = entries.findIndex(x => x.id === entryId)

			// assign entry at found index
			let entry = entries[foundIndex]

			// create comment
			let newComment = {
				id: getRandom(),
				body: body,
				cake: 0,
				happy: 0,
				authorName: user,
			}

			// push new comment to entry
			entry.comments.push(newComment)
			// assign entry to array at found index
			entries[foundIndex] = entry

			// add to localStorage and dispatch
			localStorage.setItem('JarJarEntries', JSON.stringify(entries))
			dispatch(actions.getEntries())
		}
	},

	addReaction: (type = null, parent = null, entryId = null, commentId = null) => (dispatch) => {
		let entries = JSON.parse(localStorage.getItem('JarJarEntries'))

		// Check for type of parent
		if (parent === 'Entry') {
			// find index of matching id in entries array
			const foundIndex = entries.findIndex(x => x.id === entryId)

			// assign entry at found index
			let entry = entries[foundIndex]

			// incement if type matches specified strings
			type === 'mood' && ++entry.happy
			type === 'cake' && ++entry.cake

			// assign entry to array at found index
			entries[foundIndex] = entry

			// add to localStorage and dispatch
			localStorage.setItem('JarJarEntries', JSON.stringify(entries))
			dispatch(actions.getEntries())
		} else {
			// find index of matching id in entries array
			const entryIndex = entries.findIndex(x => x.id === entryId)

			// assign entry at found index
			let entry = entries[entryIndex]

			// find index of matching id in comments array
			const commentIndex = entry.comments.findIndex(x => x.id === commentId)

			// assign entry at found index
			let comment = entry.comments[commentIndex]

			// incement if type matches specified strings
			type === 'mood' && ++comment.happy
			type === 'cake' && ++comment.cake

			// assign comment to array at found index
			entry.comments[commentIndex] = comment

			// assign entry to array at found index
			entries[entryIndex] = entry

			// add to localStorage and dispatch
			localStorage.setItem('JarJarEntries', JSON.stringify(entries))
			dispatch(actions.getEntries())
		}
	},

	showCommentForEntry: (entryId) => (dispatch) => {
		dispatch({ type: SET_SHOW_COMMENTS_FOR_ENTRY, payload: entryId })
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
	[SET_ENTRIES]: (state, { payload }) => state.merge({ _entries: fromJS(payload) }),
	[SET_USER]: (state, { payload }) => state.merge({ user: fromJS(payload) }),
	[SET_SHOW_COMMENTS_FOR_ENTRY]: (state, { payload }) => state.merge({ showCommentsForEntry: fromJS(payload) }),
}, initialState)
