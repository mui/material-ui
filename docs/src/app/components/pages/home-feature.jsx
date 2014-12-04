var React = require('react'),
	Router = require('react-router'),
  Link = Router.Link,
	mui = require('mui'),
  Paper = mui.Paper;

var HomeFeature = React.createClass({

	propTypes: {
		heading: React.PropTypes.string,
		route: React.PropTypes.string,
		img: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			zDepth: 0 
		};
	},

	render: function() {
		return (
			<Paper className="home-feature" zDepth={this.state.zDepth} 
				onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
      	<h3 className="home-feature-heading">{this.props.heading}</h3>
        <Link to={this.props.route}><img className="home-feature-image" src={this.props.img} /></Link>
      </Paper>
		);
	},

	_onMouseOver: function() {
		this.setState({
			zDepth: 4
		});
	},

	_onMouseOut: function() {
		this.setState({
			zDepth: 0
		});
	}

});

module.exports = HomeFeature;
