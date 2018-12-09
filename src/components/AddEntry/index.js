import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	iconMargin: {
		marginRight: '8px',
	},
	inlineParagraph: {
		display: 'inline',
	},
	avatar: {
		backgroundColor: theme.palette.primary[500],
	},
	textBox: {
		marginLeft: '16px',
		border: '1px solid rgba(46, 55, 59, 0.25)',
		borderRadius: '5px',
		marginRight: '112px',
		width: '100%',
	},
	textBoxComment: {
		marginLeft: '16px',
		border: '1px solid rgba(46, 55, 59, 0.25)',
		borderRadius: '5px',
		marginRight: '60px',
		width: '100%',
	},
	addEntryButton: {
		margin: '8px 24px',
	},
})

class AddEntry extends PureComponent {
	static propTypes = {
		classes: PropTypes.object,
		type: PropTypes.string,
		user: PropTypes.string,
		onAddEntry: PropTypes.func,
		entryId: PropTypes.string,
	}


	state = {
		body: '',
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}

	handleAddEntry(body, user, type, entryId) {
		this.setState({ body: '' })
		this.props.onAddEntry(body, user, type, entryId)
	}

	getPlaceholderMsg() {
		let message = ''
		const { user, type } = this.props
		user === null
			? message = 'Please log in to post'
			: type === 'Entry'
				?  message = 'Share something with the galaxy...'
				:  message = 'Say something nice...'
		return message
	}

	render() {
		const {
			classes,
			type,
			user,
			entryId,
		} = this.props
		const {	body } = this.state

		return (
			<div>
				<List>
					<ListItem>
						<ListItemAvatar>
							<Avatar classes={{ root: classes.avatar }} aria-label='Name'>
								{user === null ? '' : user.substring(0, 2).toUpperCase()}
							</Avatar>
						</ListItemAvatar>
						<TextField
							disabled={user === null}
							classes={type === 'Entry' ? { root: classes.textBox } : { root: classes.textBoxComment }}
							placeholder={this.getPlaceholderMsg()}
							multiline
							fullWidth={type === 'Entry'}
							rows={2}
							value={body}
							InputProps={{ disableUnderline: true }}
							onChange={this.handleChange('body')}
						/>
					</ListItem>
					<ListItemSecondaryAction>
						{ type === 'Entry' &&
						<Button
							disabled={user === null}
							variant='contained'
							color='secondary'
							onClick={() => this.handleAddEntry(body, user, type)}
							classes={{ root: classes.addEntryButton }}
						>
									SHARE
						</Button>
						}
						{ type === 'Comment' &&
							<IconButton
								disabled={user === null}
								 aria-label='Comments'
								 onClick={() => this.handleAddEntry(body, user, type, entryId)}>
								<Icon color='secondary'>textsms</Icon>
							</IconButton>
						}
					</ListItemSecondaryAction>
				</List>
			</div>
		)
	}
}

export default withStyles(styles)(AddEntry)
