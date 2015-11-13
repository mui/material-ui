'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ReactDOM = require('react-dom');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var GridTile = React.createClass({
  displayName: 'GridTile',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    title: React.PropTypes.node,
    subtitle: React.PropTypes.node,
    titlePosition: React.PropTypes.oneOf(['top', 'bottom']),
    titleBackground: React.PropTypes.string,
    actionIcon: React.PropTypes.element,
    actionPosition: React.PropTypes.oneOf(['left', 'right']),
    cols: React.PropTypes.number,
    rows: React.PropTypes.number,
    style: React.PropTypes.object,
    rootClass: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])
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
      titlePosition: 'bottom',
      titleBackground: 'rgba(0, 0, 0, 0.4)',
      actionPosition: 'right',
      cols: 1,
      rows: 1,
      rootClass: 'div'
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
    var _titleBar;

    var spacing = this.state.muiTheme.rawTheme.spacing;
    var themeVariables = this.state.muiTheme.gridTile;
    var actionPos = this.props.actionIcon ? this.props.actionPosition : null;
    var gutterLess = spacing.desktopGutterLess;

    var styles = {
      root: {
        position: 'relative',
        display: 'block',
        height: '100%',
        overflow: 'hidden'
      },
      titleBar: (_titleBar = {
        position: 'absolute',
        left: 0,
        right: 0
      }, _defineProperty(_titleBar, this.props.titlePosition, 0), _defineProperty(_titleBar, 'height', this.props.subtitle ? 68 : 48), _defineProperty(_titleBar, 'background', this.props.titleBackground), _defineProperty(_titleBar, 'display', '-webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex'), _defineProperty(_titleBar, 'alignItems', 'center'), _titleBar),
      titleWrap: {
        flexGrow: 1,
        marginLeft: actionPos === 'right' ? gutterLess : 0,
        marginRight: actionPos === 'left' ? gutterLess : 0,
        color: themeVariables.textColor,
        overflow: 'hidden'
      },
      title: {
        fontSize: '16px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      },
      subtitle: {
        fontSize: '12px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      },
      actionIcon: {
        order: actionPos === 'left' ? -1 : 1
      },
      childImg: {
        height: '100%',
        transform: 'translateX(-50%)',
        position: 'relative',
        left: '50%'
      }
    };
    return styles;
  },

  componentDidMount: function componentDidMount() {
    this._ensureImageCover();
  },

  componeneDidUpdate: function componeneDidUpdate() {
    this._ensureImageCover();
  },

  _ensureImageCover: function _ensureImageCover() {
    var imgEl = ReactDOM.findDOMNode(this.refs.img);

    if (imgEl) {
      (function () {
        var fit = function fit() {
          if (imgEl.offsetWidth < imgEl.parentNode.offsetWidth) {
            imgEl.style.height = 'auto';
            imgEl.style.left = '0';
            imgEl.style.width = '100%';
            imgEl.style.top = '50%';
            imgEl.style.transform = imgEl.style.WebkitTransform = 'translateY(-50%)';
          }
          imgEl.removeEventListener('load', fit);
          imgEl = null; // prevent closure memory leak
        };
        if (imgEl.complete) {
          fit();
        } else {
          imgEl.addEventListener('load', fit);
        }
      })();
    }
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var title = _props.title;
    var subtitle = _props.subtitle;
    var titlePosition = _props.titlePosition;
    var titleBackground = _props.titleBackground;
    var actionIcon = _props.actionIcon;
    var actionPosition = _props.actionPosition;
    var style = _props.style;
    var children = _props.children;
    var rootClass = _props.rootClass;

    var other = _objectWithoutProperties(_props, ['title', 'subtitle', 'titlePosition', 'titleBackground', 'actionIcon', 'actionPosition', 'style', 'children', 'rootClass']);

    var styles = this.getStyles();

    var mergedRootStyles = this.prepareStyles(styles.root, style);

    var titleBar = null;

    if (title) {
      titleBar = React.createElement(
        'div',
        { style: this.prepareStyles(styles.titleBar) },
        React.createElement(
          'div',
          { style: this.prepareStyles(styles.titleWrap) },
          React.createElement(
            'div',
            { style: this.prepareStyles(styles.title) },
            title
          ),
          subtitle ? React.createElement(
            'div',
            { style: this.prepareStyles(styles.subtitle) },
            subtitle
          ) : null
        ),
        actionIcon ? React.createElement(
          'div',
          { style: this.prepareStyles(styles.actionIcon) },
          actionIcon
        ) : null
      );
    }

    var newChildren = children;

    // if there is an image passed as children
    // clone it an put our styles
    if (React.Children.count(children) === 1) {
      newChildren = React.Children.map(children, function (child) {
        if (child.type === 'img') {
          return React.cloneElement(child, {
            ref: 'img',
            style: _this.prepareStyles(styles.childImg, child.props.style)
          });
        } else {
          return child;
        }
      });
    }

    var RootTag = rootClass;
    return React.createElement(
      RootTag,
      _extends({ style: mergedRootStyles }, other),
      newChildren,
      titleBar
    );
  }
});

module.exports = GridTile;