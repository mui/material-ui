import React from 'react';
import transitions from '../styles/transitions';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const verticalPosition = props.verticalPosition;
  const horizontalPosition = props.horizontalPosition;
  const touchMarginOffset = props.touch ? 10 : 0;
  const touchOffsetTop = props.touch ? -20 : -10;
  const offset = verticalPosition === 'bottom' ?
    14 + touchMarginOffset : -14 - touchMarginOffset;

  const {
    baseTheme,
    zIndex,
    tooltip,
  } = state.muiTheme;

  const styles = {
    root: {
      position: 'absolute',
      fontFamily: baseTheme.fontFamily,
      fontSize: '10px',
      lineHeight: '22px',
      padding: '0 8px',
      zIndex: zIndex.tooltip,
      color: tooltip.color,
      overflow: 'hidden',
      top: -10000,
      borderRadius: 2,
      userSelect: 'none',
      opacity: 0,
      right: horizontalPosition === 'left' ? 12 : null,
      left: horizontalPosition === 'center' ?
        (state.offsetWidth - 48) / 2 * -1 : null,
      transition: `${transitions.easeOut('0ms', 'top', '450ms')}, ${
        transitions.easeOut('450ms', 'transform', '0ms')}, ${
        transitions.easeOut('450ms', 'opacity', '0ms')}`,
    },
    label: {
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    ripple: {
      position: 'absolute',
      left: horizontalPosition === 'center' ? '50%' :
        horizontalPosition === 'left' ? '100%' : '0%',
      top: verticalPosition === 'bottom' ? 0 : '100%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      transition: `${transitions.easeOut('0ms', 'width', '450ms')}, ${
        transitions.easeOut('0ms', 'height', '450ms')}, ${
        transitions.easeOut('450ms', 'backgroundColor', '0ms')}`,
    },
    rootWhenShown: {
      top: verticalPosition === 'top' ?
        touchOffsetTop : 36,
      opacity: 0.9,
      transform: `translate3d(0px, ${offset}px, 0px)`,
      transition: `${transitions.easeOut('0ms', 'top', '0ms')}, ${
        transitions.easeOut('450ms', 'transform', '0ms')}, ${
        transitions.easeOut('450ms', 'opacity', '0ms')}`,
    },
    rootWhenTouched: {
      fontSize: '14px',
      lineHeight: '32px',
      padding: '0 16px',
    },
    rippleWhenShown: {
      backgroundColor: tooltip.rippleBackgroundColor,
      transition: `${transitions.easeOut('450ms', 'width', '0ms')}, ${
        transitions.easeOut('450ms', 'height', '0ms')}, ${
        transitions.easeOut('450ms', 'backgroundColor', '0ms')}`,
    },
  };

  return styles;
}

const Tooltip = React.createClass({

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    horizontalPosition: React.PropTypes.oneOf(['left', 'right', 'center']),
    label: React.PropTypes.node.isRequired,
    show: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    touch: React.PropTypes.bool,
    verticalPosition: React.PropTypes.oneOf(['top', 'bottom']),
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      offsetWidth: null,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._setRippleSize();
    this._setTooltipPosition();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this._setTooltipPosition();
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  componentDidUpdate() {
    this._setRippleSize();
  },

  _setRippleSize() {
    const ripple = this.refs.ripple;
    const tooltip = this.refs.tooltip;
    const tooltipWidth = parseInt(tooltip.offsetWidth, 10) /
      (this.props.horizontalPosition === 'center' ? 2 : 1);
    const tooltipHeight = parseInt(tooltip.offsetHeight, 10);

    const rippleDiameter = Math.ceil((Math.sqrt(Math.pow(tooltipHeight, 2) +
                                    Math.pow(tooltipWidth, 2) ) * 2));
    if (this.props.show) {
      ripple.style.height = `${rippleDiameter}px`;
      ripple.style.width = `${rippleDiameter}px`;
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  },

  _setTooltipPosition() {
    this.setState({offsetWidth: this.refs.tooltip.offsetWidth});
  },

  render() {
    const {
      prepareStyles,
    } = this.state.muiTheme;

    const {
      label,
      ...other,
    } = this.props;
    const styles = getStyles(this.props, this.state);

    return (
      <div
        {...other}
        ref="tooltip"
        style={prepareStyles(Object.assign(
          styles.root,
          this.props.show && styles.rootWhenShown,
          this.props.touch && styles.rootWhenTouched,
          this.props.style
        ))}
      >
        <div
          ref="ripple"
          style={prepareStyles(Object.assign(
            styles.ripple,
            this.props.show && styles.rippleWhenShown
          ))}
        >
        </div>
        <span style={prepareStyles(styles.label)}>
          {label}
        </span>
      </div>
    );
  },

});

export default Tooltip;
