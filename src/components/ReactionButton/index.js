import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	iconMargin: {
		marginRight: '8px',
	},
}
class ReactionButton extends PureComponent {
	static propTypes = {
		classes: PropTypes.object,
		type: PropTypes.string,
		count: PropTypes.number,
		entryId: PropTypes.string,
		commentId: PropTypes.string,
		parent: PropTypes.string,
		onAddReaction: PropTypes.func,
		disabled: PropTypes.bool,
	}

	render() {
		const {
			classes,
			type,
			count,
			parent,
			entryId,
			commentId,
			onAddReaction,
			disabled,
		} = this.props
		return (
			<Button disabled={disabled} size='small' onClick={() => onAddReaction(type, parent, entryId, commentId)}>
				<Icon color='secondary' classes={{ root: classes.iconMargin }}>{type}</Icon>
				{count}
			</Button>
		)
	}
}

export default withStyles(styles)(ReactionButton)
