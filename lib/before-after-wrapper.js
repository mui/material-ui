'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

/**
 *  BeforeAfterWrapper
 *    An alternative for the ::before and ::after css pseudo-elements for
 *    components whose styles are defined in javascript instead of css.
 *
 *  Usage: For the element that we want to apply before and after elements to,
 *    wrap its children with BeforeAfterWrapper. For example:
 *
 *                                            <Paper>
 *  <Paper>                                     <div> // See notice
 *    <BeforeAfterWrapper>        renders         <div/> // before element
 *      [children of paper]       ------>         [children of paper]
 *    </BeforeAfterWrapper>                       <div/> // after element
 *  </Paper>                                    </div>
 *                                            </Paper>
 *
 *  Notice: Notice that this div bundles together our elements. If the element
 *    that we want to apply before and after elements is a HTML tag (i.e. a
 *    div, p, or button tag), we can avoid this extra nesting by passing using
 *    the BeforeAfterWrapper in place of said tag like so:
 *
 *  <p>
 *    <BeforeAfterWrapper>   do this instead   <BeforeAfterWrapper elementType='p'>
 *      [children of p]          ------>         [children of p]
 *    </BeforeAfterWrapper>                    </BeforeAfterWrapper>
 *  </p>
 *
 *  BeforeAfterWrapper features spread functionality. This means that we can
 *  pass HTML tag properties directly into the BeforeAfterWrapper tag.
 *
 *  When using BeforeAfterWrapper, ensure that the parent of the beforeElement
 *  and afterElement have a defined style position.
 */

var BeforeAfterWrapper = React.createClass({
  displayName: 'BeforeAfterWrapper',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    beforeStyle: React.PropTypes.object,
    afterStyle: React.PropTypes.object,
    beforeElementType: React.PropTypes.string,
    afterElementType: React.PropTypes.string,
    elementType: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      beforeElementType: 'div',
      afterElementType: 'div',
      elementType: 'div'
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
    var beforeStyle = _props.beforeStyle;
    var afterStyle = _props.afterStyle;
    var beforeElementType = _props.beforeElementType;
    var afterElementType = _props.afterElementType;
    var elementType = _props.elementType;

    var other = _objectWithoutProperties(_props, ['beforeStyle', 'afterStyle', 'beforeElementType', 'afterElementType', 'elementType']);

    var beforeElement = undefined,
        afterElement = undefined;

    beforeStyle = AutoPrefix.all({ boxSizing: 'border-box' });
    afterStyle = AutoPrefix.all({ boxSizing: 'border-box' });

    if (this.props.beforeStyle) beforeElement = React.createElement(this.props.beforeElementType, {
      style: this.prepareStyles(beforeStyle, this.props.beforeStyle),
      key: "::before"
    });
    if (this.props.afterStyle) afterElement = React.createElement(this.props.afterElementType, {
      style: this.prepareStyles(afterStyle, this.props.afterStyle),
      key: "::after"
    });

    var children = [beforeElement, this.props.children, afterElement];

    var props = other;
    props.style = this.prepareStyles(this.props.style);

    return React.createElement(this.props.elementType, props, children);
  }

});

module.exports = BeforeAfterWrapper;