'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Styles = require('../utils/styles');

var FlatButtonLabel = React.createClass({
  displayName: 'FlatButtonLabel',

  mixins: [PureRenderMixin],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    label: React.PropTypes.node,
    style: React.PropTypes.object
  },

  getContextProps: function getContextProps() {
    var theme = this.context.muiTheme;

    return {
      spacingDesktopGutterLess: theme.spacing.desktopGutterLess
    };
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;
    var style = _props.style;

    var contextProps = this.getContextProps();

    var mergedRootStyles = Styles.mergeAndPrefix({
      position: 'relative',
      padding: '0 ' + contextProps.spacingDesktopGutterLess + 'px'
    }, style);

    return React.createElement(
      'span',
      { style: mergedRootStyles },
      label
    );
  }

});

module.exports = FlatButtonLabel;