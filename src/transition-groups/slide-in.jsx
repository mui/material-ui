const React = require('react');
const ReactTransitionGroup = require('react-addons-transition-group');
const StylePropable = require('../mixins/style-propable');
const SlideInChild = require('./slide-in-child');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');


const SlideIn = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  propTypes: {
    enterDelay: React.PropTypes.number,
    childStyle: React.PropTypes.object,
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down']),
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      enterDelay: 0,
      direction: 'left',
    };
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

    let mergedRootStyles = this.prepareStyles({
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
          style={childStyle}>
          {child}
        </SlideInChild>
      );
    }, this);

    return (
      <ReactTransitionGroup
        {...other}
        style={mergedRootStyles}
        component="div">
        {newChildren}
      </ReactTransitionGroup>
    );
  },

  _getLeaveDirection() {
    return this.props.direction;
  },

});

module.exports = SlideIn;
