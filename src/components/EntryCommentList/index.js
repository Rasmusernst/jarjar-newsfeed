import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'

import EntryComment from '../EntryComment'
import AddEntry from '../../components/AddEntry'

export default class EntryCommentList extends PureComponent {
	static propTypes = {
		entry: PropTypes.object,
		user: PropTypes.string,
		onAddEntry: PropTypes.func,
		onAddReaction: PropTypes.func,
		showComments: PropTypes.string,
	}

	render() {
		const { entry, user, onAddEntry, onAddReaction, showComments } = this.props


		return (
			<Collapse in={entry.get('id') === showComments} timeout='auto' unmountOnExit >
				<List>
					{ entry.get('comments').map((comment) =>
						<EntryComment
							key={comment.get('id')}
							user={user}
							entryId={entry.get('id')}
							comment={comment}
							onAddReaction={onAddReaction}
						/>,
					)}
				</List>
				<AddEntry
					type='Comment'
					user={user}
					entryId={entry.get('id')}
					onAddEntry={onAddEntry}
				/>
			</Collapse>
		)
	}
}
