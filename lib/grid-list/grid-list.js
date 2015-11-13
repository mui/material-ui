'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var GridList = React.createClass({
  displayName: 'GridList',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    cols: React.PropTypes.number,
    padding: React.PropTypes.number,
    cellHeight: React.PropTypes.number,
    style: React.PropTypes.object
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
      cols: 2,
      padding: 4,
      cellHeight: 180
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

  getStyles: function getStyles() {
    return {
      root: {
        display: '-webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex',
        flexWrap: 'wrap',
        margin: '-' + this.props.padding / 2 + 'px'
      },
      item: {
        boxSizing: 'border-box',
        padding: this.props.padding / 2 + 'px'
      }
    };
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var cols = _props.cols;
    var padding = _props.padding;
    var cellHeight = _props.cellHeight;
    var children = _props.children;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['cols', 'padding', 'cellHeight', 'children', 'style']);

    var styles = this.getStyles();

    var mergedRootStyles = this.mergeStyles(styles.root, style);

    var wrappedChildren = React.Children.map(children, function (currentChild) {
      var childCols = currentChild.props.cols || 1;
      var childRows = currentChild.props.rows || 1;
      var itemStyle = _this.mergeStyles(styles.item, {
        width: 100 / cols * childCols + '%',
        height: cellHeight * childRows + padding
      });

      return React.createElement(
        'div',
        { style: _this.prepareStyles(itemStyle) },
        currentChild
      );
    });

    return React.createElement(
      'div',
      _extends({ style: this.prepareStyles(mergedRootStyles) }, other),
      wrappedChildren
    );
  }
});

module.exports = GridList;