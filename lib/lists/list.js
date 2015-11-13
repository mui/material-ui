'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var PropTypes = require('../utils/prop-types');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');
var Paper = require('../paper');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var List = React.createClass({
  displayName: 'List',

  mixins: [PureRenderMixin, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    insetSubheader: React.PropTypes.bool,
    style: React.PropTypes.object,
    subheader: React.PropTypes.node,
    subheaderStyle: React.PropTypes.object,
    zDepth: PropTypes.zDepth
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      zDepth: 0
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var insetSubheader = _props.insetSubheader;
    var style = _props.style;
    var subheader = _props.subheader;
    var subheaderStyle = _props.subheaderStyle;
    var zDepth = _props.zDepth;

    var other = _objectWithoutProperties(_props, ['children', 'insetSubheader', 'style', 'subheader', 'subheaderStyle', 'zDepth']);

    var styles = {
      root: {
        padding: 0,
        paddingBottom: 8,
        paddingTop: subheader ? 0 : 8
      },

      subheader: {
        color: Typography.textLightBlack,
        fontSize: 14,
        fontWeight: Typography.fontWeightMedium,
        lineHeight: '48px',
        paddingLeft: insetSubheader ? 72 : 16
      }
    };

    var subheaderElement = undefined;
    if (subheader) {
      var mergedSubheaderStyles = this.prepareStyles(styles.subheader, subheaderStyle);
      subheaderElement = React.createElement(
        'div',
        { style: mergedSubheaderStyles },
        subheader
      );
    }

    return React.createElement(
      Paper,
      _extends({}, other, {
        style: this.mergeStyles(styles.root, style),
        zDepth: zDepth }),
      subheaderElement,
      children
    );
  }
});

module.exports = List;