/**
 * @jsx React.DOM
 */

var React = require('react'),
	Classable = require('./mixins/classable.js'),

  wideIcons = [
    'signal-wifi-statusbar-1-bar',
    'signal-wifi-statusbar-2-bar',
    'signal-wifi-statusbar-3-bar',
    'signal-wifi-statusbar-4-bar',
    'signal-wifi-statusbar-connected-no-internet-1',
    'signal-wifi-statusbar-connected-no-internet',
    'signal-wifi-statusbar-connected-no-internet-2',
    'signal-wifi-statusbar-connected-no-internet-3',
    'signal-wifi-statusbar-connected-no-internet-4',
    'signal-wifi-statusbar-not-connected',
    'signal-wifi-statusbar-null'
  ];

var Icon = React.createClass({

	mixins: [Classable],

	propTypes: {
		icon: React.PropTypes.string,
		onClick: React.PropTypes.func
	},

	render: function() {
		var isWide = wideIcons.indexOf(this.props.icon) > -1,
      suffix = isWide ? '_26x24px' : '_24px',
      classes = this.getClasses('mui-icon svg-ic_' + this.props.icon.replace(/-/g, '_') + suffix);
console.log(classes);
		return (
			<span className={classes} onClick={this._onClick}>
				<span className="mui-icon-highlight">&nbsp;</span>
			</span>
		);
	},

	_onClick: function(e) {
		if (this.props.onClick) this.props.onClick(e);
	}

});

module.exports = Icon;
