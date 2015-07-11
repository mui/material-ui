'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');

var SubheaderMenuItem = React.createClass({
  displayName: 'SubheaderMenuItem',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    firstChild: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.menuSubheader;
  },

  getSpacing: function getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function getStyles() {
    var gutterMini = this.getSpacing().desktopGutterMini;
    var subheaderHeight = this.getSpacing().desktopSubheaderHeight;
    var styles = {
      root: {
        boxSizing: 'border-box',
        fontSize: '13px',
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        height: subheaderHeight + gutterMini,
        lineHeight: subheaderHeight + 'px',
        color: this.getTheme().textColor,
        borderTop: 'solid 1px ' + this.getTheme().borderColor,
        paddingTop: gutterMini,
        marginTop: gutterMini
      },
      rootWhenFirstChild: {
        height: subheaderHeight,
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0
      }
    };

    return styles;
  },

  render: function render() {
    return React.createElement(
      'div',
      {
        key: this.props.index,
        className: this.props.className,
        style: this.mergeAndPrefix(this.getStyles().root, this.props.firstChild && this.getStyles().rootWhenFirstChild, this.props.style) },
      this.props.text
    );
  }

});

module.exports = SubheaderMenuItem;