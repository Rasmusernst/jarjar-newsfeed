import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

import ReactionButton from '../ReactionButton'

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
})

class EntryComment extends PureComponent {
	static propTypes = {
		classes: PropTypes.object,
		comment: PropTypes.object,
		entryId: PropTypes.string,
		user: PropTypes.string,
		onAddReaction: PropTypes.func,
	}

	render() {
		const {
			classes,
			comment,
			entryId,
			user,
			onAddReaction,
		} = this.props

		return (
			<ListItem>
				<ListItemAvatar>
					<Avatar classes={{ root: classes.avatar }} aria-label='Name'>
						{comment.get('authorName').substring(0, 2).toUpperCase()}
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					disableTypography
					primary={
						<div>
							<div>
								<Typography
									variant='body2'
									classes={{ root: classes.inlineParagraph }}>
									{comment.get('authorName')}
								</Typography>
								<Typography
									variant='body1'
									classes={{ root: classes.inlineParagraph }}>
									{` ${comment.get('body')}`}
								</Typography>
							</div>
							<ReactionButton
								disabled={user === null}
								type='cake'
								parent={'Comment'}
								entryId={entryId}
								commentId={comment.get('id')}
								onAddReaction={onAddReaction}
								count={comment.get('cake')}
							/>
							<ReactionButton
								disabled={user === null}
								type='mood'
								parent={'Comment'}
								entryId={entryId}
								commentId={comment.get('id')}
								onAddReaction={onAddReaction}
								count={comment.get('happy')}
							/>
						</div>
					}
				/>
			</ListItem>
		)
	}
}

export default withStyles(styles)(EntryComment)
