import React, {PropTypes} from 'react';
import Transitions from './styles/transitions';
import getMuiTheme from './styles/getMuiTheme';

const SvgIcon = React.createClass({

  propTypes: {
    /**
     * Elements passed into the SVG Icon.
     */
    children: PropTypes.node,

    /**
     * This is the fill color of the svg icon.
     * If not specified, this component will default
     * to muiTheme.palette.textColor.
     */
    color: PropTypes.string,

    /**
     * This is the icon color when the mouse hovers over the icon.
     */
    hoverColor: PropTypes.string,

    /**
     * Function called when mouse enters this element.
     */
    onMouseEnter: PropTypes.func,

    /**
     * Function called when mouse leaves this element.
     */
    onMouseLeave: PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,

    /**
     * Allows you to redifine what the coordinates
     * without units mean inside an svg element. For example,
     * if the SVG element is 500 (width) by 200 (height), and you
     * pass viewBox="0 0 50 20", this means that the coordinates inside
     * the svg will go from the top left corner (0,0) to bottom right (50,20)
     * and each unit will be worth 10px.
     */
    viewBox: PropTypes.string,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

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
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  _handleMouseLeave(event) {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  },

  _handleMouseEnter(event) {
    this.setState({hovered: true});
    this.props.onMouseEnter(event);
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

    const {
      baseTheme,
      prepareStyles,
    } = this.state.muiTheme;

    const offColor = color ? color :
      style && style.fill ? style.fill :
      baseTheme.palette.textColor;
    const onColor = hoverColor ? hoverColor : offColor;

    const mergedStyles = Object.assign({
      display: 'inline-block',
      fill: this.state.hovered ? onColor : offColor,
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: Transitions.easeOut(),
    }, style);

    return (
      <svg
        {...other}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        style={prepareStyles(mergedStyles)}
        viewBox={viewBox}
      >
        {children}
      </svg>
    );
  },

});

export default SvgIcon;
