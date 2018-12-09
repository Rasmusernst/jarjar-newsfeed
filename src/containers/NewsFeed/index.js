import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { actions as newsFeedActions } from '../../stores/newsFeed'

import FeedEntry from '../../components/FeedEntry'
import AddEntry from '../../components/AddEntry'
import AppBar from '../../components/AppBar'

import './style.scss'

export default  @connect(({ newsFeed }) => ({ newsFeed }), newsFeedActions)
class JarJar extends PureComponent {
	static propTypes = {
		getEntries: PropTypes.func,
		addEntry: PropTypes.func,
		addReaction: PropTypes.func,
		showCommentForEntry: PropTypes.func,
		logIn: PropTypes.func,
		logOut: PropTypes.func,
		newsFeed: PropTypes.object,
	}

	componentDidMount() {
		 this.props.getEntries()
	}

	@autobind handleAddEntry(body, user, type, entryId) {
		this.props.addEntry(body, user, type, entryId)
	}

	@autobind handleAddReaction(type, parent, entryId, commentId) {
		this.props.addReaction(type, parent, entryId, commentId)
	}

	@autobind handleshowComment(entryId) {
		this.props.showCommentForEntry(entryId)
	}

	@autobind handleLogIn(name) {
		this.props.logIn(name)
	}

	@autobind handleLogOut() {
		this.props.logOut()
	}

	render() {
		const { newsFeed } = this.props
		return (
			<Grid container alignItems='center' justify='center' >
				<AppBar user={newsFeed.get('user')} onLogIn={this.handleLogIn} onLogOut={this.handleLogOut}/>
				<Grid item xs={12} sm={10} md={6}>
					<Grid container spacing={16} alignItems='center' justify='center' >
						<Grid item xs={12}>
							<div className='create-post'>
								<Paper>
									<AddEntry
										onAddEntry={this.handleAddEntry}
										user={newsFeed.get('user')}
										type='Entry'
									/>
								</Paper>
							</div>
						</Grid>
						{ newsFeed.get('_entries').map((entry) =>
							<Grid key={entry.get('id')} item xs={12}>
								<FeedEntry
									showComments={newsFeed.get('showCommentsForEntry')}
									user={newsFeed.get('user')}
									onAddEntry={this.handleAddEntry}
									onAddReaction={this.handleAddReaction}
									onShowComment={this.handleshowComment}
									entry={entry}
								/>
							</Grid>,
						)}
					</Grid>
				</Grid>
			</Grid>
		)
	}
}
