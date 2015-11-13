'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var TableRowColumn = React.createClass({
  displayName: 'TableRowColumn',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    columnNumber: React.PropTypes.number,
    hoverable: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    onHoverExit: React.PropTypes.func,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      hoverable: false
    };
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

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      hovered: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.tableRowColumn;
  },

  getStyles: function getStyles() {
    var theme = this.getTheme();
    var styles = {
      root: {
        paddingLeft: theme.spacing,
        paddingRight: theme.spacing,
        height: theme.height,
        textAlign: 'left',
        fontSize: 13,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    };

    if (React.Children.count(this.props.children) === 1 && !isNaN(this.props.children)) {
      styles.textAlign = 'right';
    }

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var columnNumber = _props.columnNumber;
    var hoverable = _props.hoverable;
    var onClick = _props.onClick;
    var onHover = _props.onHover;
    var onHoverExit = _props.onHoverExit;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'columnNumber', 'hoverable', 'onClick', 'onHover', 'onHoverExit', 'style']);

    var styles = this.getStyles();
    var handlers = {
      onClick: this._onClick,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave
    };
    var classes = 'mui-table-row-column';
    if (className) classes += ' ' + className;

    return React.createElement(
      'td',
      _extends({
        key: this.props.key,
        className: classes,
        style: this.prepareStyles(styles.root, style)
      }, handlers, other),
      this.props.children
    );
  },

  _onClick: function _onClick(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  },

  _onMouseEnter: function _onMouseEnter(e) {
    if (this.props.hoverable) {
      this.setState({ hovered: true });
      if (this.props.onHover) this.props.onHover(e, this.props.columnNumber);
    }
  },

  _onMouseLeave: function _onMouseLeave(e) {
    if (this.props.hoverable) {
      this.setState({ hovered: false });
      if (this.props.onHoverExit) this.props.onHoverExit(e, this.props.columnNumber);
    }
  }

});

module.exports = TableRowColumn;