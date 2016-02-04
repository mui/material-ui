import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

class Message extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			showDetails: false
		};
	}

	render() {
		let { title, message, type } = this.props;
		const { showDetails } = this.state;

		function returnButtonClass(type) {
			if (type === 'error') {
				return 'message-box error';
			}
			if (type === 'stop') {
				return 'message-box stop';
			}
			return 'message-box';
		}

		const buttonClass = returnButtonClass(type);
		const contentClass = showDetails ? 'content show' : 'content';

		const content = message ? <span className={contentClass}>{message}</span> : null;

		return (
			<button className={buttonClass} onClick={() => this.setState({showDetails: !showDetails})}>
				<span className='text left'>{title}</span>
				{content}
			</button>
		);
	}
}

Message.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string,
	type: PropTypes.string
};

export default Message;
