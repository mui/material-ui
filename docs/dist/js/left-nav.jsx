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
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    isInitiallyOpen: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      isInitiallyOpen: true
    };
  },

  getInitialState: function() {
    return {
      open: this.props.isInitiallyOpen
    };
  },

  toggleOpenState: function() {
    this.setState({ open: !this.state.open });
  },

  render: function() {
    var classes = this.getClasses('mui-left-nav', {
        'mui-closed': !this.state.open
      }),
      selectedIndex = this.props.selectedIndex;

    return (
      <div className={classes}>
        <div className="mui-overlay" onClick={this._onOverlayClick}></div>
        <Paper ref="clickAwayableElement" className="mui-left-nav-menu" zDepth={2} rounded={false}>
          {this.props.header}
          <Menu ref="menuItems" zDepth={0} menuItems={this.props.menuItems} selectedIndex={selectedIndex} onItemClick={this._onMenuItemClick} />
        </Paper>
      </div>
    );
  },

  _onOverlayClick: function() {
    this.setState({ open: false });
  },

  _onMenuItemClick: function(e, key, payload) {
    this.setState({ open: false });
    if (this.props.onChange && this.props.selectedIndex !== key) this.props.onChange(e, key, payload);
  }

});

module.exports = LeftNav;
