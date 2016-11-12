import React, { Component, PropTypes } from 'react';

function getStyles(props, theme, state) {
  const verticalPosition = props.verticalPosition;
  const horizontalPosition = props.horizontalPosition;
  const touchMarginOffset = props.touch ? 10 : 0;
  const touchOffsetTop = props.touch ? -20 : -10;
  const offset = verticalPosition === 'bottom' ?
  14 + touchMarginOffset : -14 - touchMarginOffset;
  const {
    zIndex,
    palette,
    typography,
    transitions,
  } = theme;
  const styles = {
    root: {
      position: 'absolute',
      fontFamily: typography.fontFamily,
      zIndex: zIndex.tooltip,
      color: palette.type === 'light' ? palette.shades.dark.text.primary : palette.shades.light.text.secondary,
      overflow: 'hidden',
      top: -10000,
      borderRadius: 2,
      userSelect: 'none',
      opacity: 0,
      right: horizontalPosition === 'left' ? 12 : null,
      left: horizontalPosition === 'center' ?
      (state.offsetWidth - 48) / 2 * -1 : null,
      transition: `${transitions.create('top', '0ms', '450ms')}, ${
        transitions.create('transform', '450ms', '0ms')}, ${
        transitions.create('opacity', '450ms', '0ms')}`,
    },
    ripple: {
      position: 'absolute',
      left: horizontalPosition === 'center' ? '50%' :
        horizontalPosition === 'left' ? '100%' : '0%',
      top: verticalPosition === 'bottom' ? 0 : '100%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      transition: `${transitions.create('width', '0ms', '450ms')}, ${
        transitions.create('height', '0ms', '450ms')}, ${
        transitions.create('backgroundColor', '450ms', '0ms')}`,
    },
    rootWhenShown: {
      fontSize: '10px',
      lineHeight: '22px',
      padding: '0 8px',
      top: verticalPosition === 'top' ?
        touchOffsetTop : 36,
      opacity: 0.9,
      transform: `translate(0px, ${offset}px)`,
      transition: `${transitions.create('top', '0ms', '0ms')}, ${
        transitions.create('transform', '450ms', '0ms')}, ${
        transitions.create('opacity', '450ms', '0ms')}`,
    },
    rootWhenTouched: {
      fontSize: '14px',
      lineHeight: '32px',
      padding: '0 16px',
    },
    rippleWhenShown: {
      backgroundColor: palette.type === 'dark' ? palette.shades.dark.text.primary : palette.shades.light.text.secondary,
      transition: `${transitions.create('width', '450ms', '0ms')}, ${
        transitions.create('height', '450ms', '0ms')}, ${
        transitions.create('backgroundColor', '450ms', '0ms')}`,
    },
  };
  return styles;
}
class Tooltip extends Component {
  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    horizontalPosition: PropTypes.oneOf(['left', 'right', 'center']),
    label: PropTypes.node.isRequired,
    show: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    touch: PropTypes.bool,
    verticalPosition: PropTypes.oneOf(['top', 'bottom']),
  };
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };
  state = {
    offsetWidth: null,
  };
  
  componentDidMount() {
    this.setRippleSize();
    this.setTooltipPosition();
  }
  
  componentWillReceiveProps() {
    this.setTooltipPosition();
  }
  
  componentDidUpdate() {
    this.setRippleSize();
  }
  
  setRippleSize() {
    const ripple = this.refs.ripple;
    const tooltip = this.refs.tooltip;
    const tooltipWidth = parseInt(tooltip.offsetWidth, 10) /
      (this.props.horizontalPosition === 'center' ? 2 : 1);
    const tooltipHeight = parseInt(tooltip.offsetHeight, 10);
    const rippleDiameter = Math.ceil((Math.sqrt(Math.pow(tooltipHeight, 2) +
      Math.pow(tooltipWidth, 2)) * 2));
    if (this.props.show) {
      ripple.style.height = `${rippleDiameter}px`;
      ripple.style.width = `${rippleDiameter}px`;
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  }
  
  setTooltipPosition() {
    this.setState({ offsetWidth: this.refs.tooltip.offsetWidth });
  }
  
  render() {
    const {
      horizontalPosition, // eslint-disable-line no-unused-vars
      label,
      show, // eslint-disable-line no-unused-vars
      touch, // eslint-disable-line no-unused-vars
      verticalPosition, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;
    const styleManager = this.context.styleManager;
    const { render, prepareInline } = styleManager;
    const styles = getStyles(this.props, styleManager.theme, this.state);
    return (
      <div
        {...other}
        ref="tooltip"
        style={prepareInline(Object.assign(
          styles.root,
          this.props.show && styles.rootWhenShown,
          this.props.show && this.props.touch && styles.rootWhenTouched,
          this.props.style
        ))}
      >
        <div
          ref="ripple"
          style={prepareInline(Object.assign(
            styles.ripple,
            this.props.show && styles.rippleWhenShown
          ))}
        />
        <span>
          {label}
        </span>
      </div>
    );
  }
}
export default Tooltip;
