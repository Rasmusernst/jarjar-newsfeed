import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import amber from '@material-ui/core/colors/amber'

import NewsFeed from './containers/NewsFeed'

const theme = createMuiTheme({
	palette: {
		primary: lightBlue,
		secondary: amber,
	},
})

export default class App extends PureComponent {
	static propTypes = {
		store: PropTypes.object.isRequired,
	}

	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<NewsFeed />
				</MuiThemeProvider>
			</Provider>
		)
	}
}
