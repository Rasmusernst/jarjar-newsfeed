import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import { fade } from '@material-ui/core/styles/colorManipulator'

import { withStyles } from '@material-ui/core/styles'

import './style.scss'

const styles = theme => ({
	logo: {
		display: 'inline',
		fontFamily: '"Poller One", cursive',
		color: '#FFF',
	},
	inlineParagraph: {
		display: 'inline',
		marginRight: '8px',
	},
	login: {
		verticalAlign: 'middle',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
	},
	logInButton: {
		margin: '16px',
	},
})
class JarJarAppBar extends PureComponent {
	static propTypes = {
		classes: PropTypes.object,
		user: PropTypes.string,
		onLogIn: PropTypes.func,
		onLogOut: PropTypes.func,
	}

	state = {
		userName: null,
	}

	handleBtnClick() {
		const { user, onLogIn, onLogOut } = this.props
		const { userName } = this.state
		user === null ? onLogIn(userName) : onLogOut()
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}


	render() {
		const {
			classes,
			user,
		} = this.props

		return (
			<AppBar position='sticky'>
				<Toolbar variant='dense'>

					<div>
						<Typography
							variant='h5'
							align='left'
							classes={{ root: classes.logo }}>
							BINKS
						</Typography>
						<Typography
							variant='subtitle1'
							align='left'
							classes={{ root: classes.logo }}>
							BOOK
						</Typography>
					</div>
					<div className='login'>
						{ user === null
							? <InputBase
								onChange={this.handleChange('userName')}
								placeholder={'User name'}
								classes={{
									root: classes.login,
								}}
							/>
							:
							<Typography
								variant='subtitle2'
								classes={{ root: classes.inlineParagraph }}>
								{`Hi ${user}`}
							</Typography>
						}
						<Button
							variant='outlined'
							onClick={() => this.handleBtnClick()}
							color='default'
							size='small'
							classes={{ root: classes.logInButton }}>
							{user === null ? 'Log in' : 'Log out'}
						</Button>
					</div>

				</Toolbar>
			</AppBar>
		)
	}
}

export default withStyles(styles)(JarJarAppBar)
