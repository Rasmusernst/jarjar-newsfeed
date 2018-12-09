import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import EntryCommentList from '../EntryCommentList'
import ReactionButton from '../ReactionButton'

const styles = theme => ({
	iconMargin: {
		marginRight: '8px',
	},
	commentText: {
		backgroundColor: '#FAFAFA',
	},
	avatar: {
		backgroundColor: theme.palette.primary[500],
	},
})

class FeedEntry extends PureComponent {
	static propTypes = {
		classes: PropTypes.object,
		entry: PropTypes.object,
		user: PropTypes.string,
		onAddEntry: PropTypes.func,
		onAddReaction: PropTypes.func,
		onShowComment: PropTypes.func,
		showComments: PropTypes.string,
	}

	render() {
		const {
			classes,
			entry,
			user,
			onAddEntry,
			onAddReaction,
			onShowComment,
			showComments,
		} = this.props
		const hideComments = entry.get('id') === showComments
		return (
			<div>
				<Card>
					<CardHeader
						avatar={
							<Avatar classes={{ root: classes.avatar }} aria-label='Name' >
								{entry.get('authorName').substring(0, 2).toUpperCase()}
							</Avatar>
						}
						title={entry.get('authorName')}
						subheader={moment(entry.get('dateCreated')).fromNow()}
					/>
					<CardContent>
						<Typography paragraph>
							{entry.get('body')}
						</Typography>
					</CardContent>
					<CardActions>
						<ReactionButton
							disabled={user === null }
							type='cake'
							parent={'Entry'}
							entryId={entry.get('id')}
							onAddReaction={onAddReaction}
							count={entry.get('cake')}
						/>
						<ReactionButton
							disabled={user === null }
							type='mood'
							parent={'Entry'}
							entryId={entry.get('id')}
							onAddReaction={onAddReaction}
							count={entry.get('happy')}
						/>
						<Button onClick={ () => onShowComment( hideComments ? null : entry.get('id'))}>
							<Icon color='secondary'
								classes={{ root: classes.iconMargin }}>
									textsms
							</Icon>
							{entry.get('comments').size}
						</Button>

					</CardActions>
					<Divider />
				</Card>
				<EntryCommentList
					user={user}
					onAddEntry={onAddEntry}
					onAddReaction={onAddReaction}
					entry={entry}
					showComments={showComments}/>
			</div>

		)
	}
}

export default withStyles(styles)(FeedEntry)
