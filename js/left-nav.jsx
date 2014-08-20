/**
 * @jsx React.DOM
 */

var React = require('react'),
  Classable = require('./mixins/classable.js'),
  Paper = require('./paper.jsx'),
	Menu = require('./menu.jsx');

var LeftNav = React.createClass({

	mixins: [Classable],

  propTypes: {
    onChange: React.PropTypes.func,
    header: React.PropTypes.component,
    items: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number
  },

  render: function() {
    var classes = this.getClasses('mui-left-nav'),
      selectedIndex = this.props.selectedIndex;

    return (
      <Paper zDepth={2} rounded={false} className={classes}>
        {this.props.header}
        <Menu ref="menuItems" zDepth={0} items={this.props.items} selectedIndex={selectedIndex} onItemClick={this._onMenuItemClick} />
      </Paper>
    );
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.props.selectedIndex !== key) this.props.onChange(e, key, payload);
  }

});

module.exports = LeftNav;
