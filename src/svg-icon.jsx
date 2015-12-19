import React from 'react';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import muiThemeable from './muiThemeable';

let SvgIcon = React.createClass({

  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

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

  getInitialState() {
    return {
      hovered: false,
    };
  },

  getDefaultProps() {
    return {
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      viewBox: '0 0 24 24',
    };
  },

  render() {
    const {
      _muiTheme,
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
      _muiTheme.baseTheme.palette.textColor;
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

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  },

  _handleMouseEnter(e) {
    this.setState({hovered: true});
    this.props.onMouseEnter(e);
  },
});

SvgIcon = muiThemeable(SvgIcon);

export default SvgIcon;
