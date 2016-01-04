import React from 'react';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const SvgIcon = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    viewBox: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      viewBox: '0 0 24 24',
    };
  },

  getInitialState() {
    return {
      hovered: false,
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

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  },

  _handleMouseEnter(e) {
    this.setState({hovered: true});
    this.props.onMouseEnter(e);
  },

  render() {
    const {
      children,
      color,
      hoverColor,
      onMouseEnter,
      onMouseLeave,
      style,
      viewBox,
      ...other,
    } = this.props;

    const offColor = color ? color :
      style && style.fill ? style.fill :
      this.state.muiTheme.rawTheme.palette.textColor;
    const onColor = hoverColor ? hoverColor : offColor;

    const mergedStyles = this.prepareStyles({
      display: 'inline-block',
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: Transitions.easeOut(),
    }, style, {
      // Make sure our fill color overrides fill provided in props.style
      fill: this.state.hovered ? onColor : offColor,
    });

    const events = hoverColor ? {
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave,
    } : {};

    return (
      <svg
        {...other}
        {...events}
        style={mergedStyles}
        viewBox={viewBox}>
        {children}
      </svg>
    );
  },

});

export default SvgIcon;
