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
    docked: React.PropTypes.bool,
    header: React.PropTypes.element,
    isInitiallyOpen: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      docked: true,
      isInitiallyOpen: true
    };
  },

  getInitialState: function() {
    return {
      open: this.props.isInitiallyOpen
    };
  },

  toggle: function() {
    this.setState({ open: !this.state.open });
  },

  close: function() {
    this.setState({ open: false });
  },

  render: function() {
    var classes = this.getClasses('mui-left-nav', {
        'mui-closed': !this.state.open
      }),
      selectedIndex = this.props.selectedIndex,
      overlay;

    if (!this.props.docked) {
      overlay = <div className="mui-overlay" onClick={this._onOverlayClick}></div>;
    }

    return (
      <div className={classes}>
        {overlay}
        <Paper ref="clickAwayableElement" className="mui-left-nav-menu" zDepth={2} rounded={false}>
          {this.props.header}
          <Menu ref="menuItems" zDepth={0} menuItems={this.props.menuItems} selectedIndex={selectedIndex} onItemClick={this._onMenuItemClick} />
        </Paper>
      </div>
    );
  },

  _onOverlayClick: function() {
    this.close();
  },

  _onMenuItemClick: function(e, key, payload) {
    if (!this.props.docked) this.close();
    if (this.props.onChange && this.props.selectedIndex !== key) this.props.onChange(e, key, payload);
  }

});

module.exports = LeftNav;
