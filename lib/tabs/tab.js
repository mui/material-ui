'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors.js');

var Tab = React.createClass({
  displayName: 'Tab',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    handleTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    width: React.PropTypes.string
  },

  handleTouchTap: function handleTouchTap() {
    this.props.handleTouchTap(this.props.tabIndex, this);
  },

  render: function render() {
    var styles = this.mergeAndPrefix({
      display: 'table-cell',
      cursor: 'pointer',
      textAlign: 'center',
      verticalAlign: 'middle',
      height: 48,
      color: Colors.white,
      opacity: 0.6,
      fontSize: 14,
      fontWeight: '500',
      whiteSpace: 'initial',
      fontFamily: this.context.muiTheme.contentFontFamily,
      boxSizing: 'border-box',
      width: this.props.width
    }, this.props.style);

    if (this.props.selected) styles.opacity = '1';

    return React.createElement(
      'div',
      { style: styles, onTouchTap: this.handleTouchTap, routeName: this.props.route },
      this.props.label
    );
  }

});

module.exports = Tab;