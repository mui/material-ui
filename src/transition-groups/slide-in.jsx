import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import StylePropable from '../mixins/style-propable';
import SlideInChild from './slide-in-child';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const SlideIn = React.createClass({

  propTypes: {
    childStyle: React.PropTypes.object,
    children: React.PropTypes.node,
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down']),
    enterDelay: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      enterDelay: 0,
      direction: 'left',
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  _getLeaveDirection() {
    return this.props.direction;
  },

  render() {
    let {
      enterDelay,
      children,
      childStyle,
      direction,
      style,
      ...other,
    } = this.props;

    let mergedRootStyles = this.mergeStyles({
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }, style);

    let newChildren = React.Children.map(children, (child) => {
      return (
        <SlideInChild
          key={child.key}
          direction={direction}
          enterDelay={enterDelay}
          getLeaveDirection={this._getLeaveDirection}
          style={childStyle}
        >
          {child}
        </SlideInChild>
      );
    }, this);

    return (
      <ReactTransitionGroup
        {...other}
        style={this.prepareStyles(mergedRootStyles)}
        component="div"
      >
        {newChildren}
      </ReactTransitionGroup>
    );
  },

});

export default SlideIn;
