import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import EnhancedButton from '../internal/EnhancedButton';
import StepLabel from './StepLabel';

const isLabel = (child) => {
  return child && child.type && child.type.muiName === 'StepLabel';
};

const getStyles = (props, context, state) => {
  const {hovered} = state;
  const {backgroundColor, hoverBackgroundColor} = context.muiTheme.stepper;

  const styles = {
    root: {
      padding: 0,
      backgroundColor: hovered ? hoverBackgroundColor : backgroundColor,
      transition: transitions.easeOut(),
    },
  };

  if (context.stepper.orientation === 'vertical') {
    styles.root.width = '100%';
  }

  return styles;
};

class StepButton extends Component {

  static propTypes = {
    /**
     * Passed from `Step` Is passed to StepLabel.
     */
    active: PropTypes.bool,
    /**
     * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
     */
    children: PropTypes.node,
    /**
     * Sets completed styling. Is passed to StepLabel.
     */
    completed: PropTypes.bool,
    /**
     * Disables the button and sets disabled styling. Is passed to StepLabel.
     */
    disabled: PropTypes.bool,
    /**
     * The icon displayed by the step label.
     */
    icon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Callback function fired when the mouse enters the element.
     *
     * @param {object} event `mouseenter` event targeting the element.
     */
    onMouseEnter: PropTypes.func,
    /**
     * Callback function fired when the mouse leaves the element.
     *
     * @param {object} event `mouseleave` event targeting the element.
     */
    onMouseLeave: PropTypes.func,
    /**
     * Callback function fired when the element is touched.
     *
     * @param {object} event `touchstart` event targeting the element.
     */
    onTouchStart: PropTypes.func,
    /**
     * Override the inline-style of the root element.
     */
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    stepper: PropTypes.object,
  };

  state = {
    hovered: false,
    touch: false,
  };

  handleMouseEnter = (event) => {
    const {onMouseEnter} = this.props;
    // Cancel hover styles for touch devices
    if (!this.state.touch) {
      this.setState({hovered: true});
    }
    if (typeof onMouseEnter === 'function') {
      onMouseEnter(event);
    }
  };

  handleMouseLeave = (event) => {
    const {onMouseLeave} = this.props;
    this.setState({hovered: false});
    if (typeof onMouseLeave === 'function') {
      onMouseLeave(event);
    }
  };

  handleTouchStart = (event) => {
    const {onTouchStart} = this.props;
    this.setState({touch: true});
    if (typeof onTouchStart === 'function') {
      onTouchStart(event);
    }
  };

  render() {
    const {
      active,
      children,
      completed,
      disabled,
      icon,
      style,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.context, this.state);

    const child = isLabel(children) ? children : <StepLabel>{children}</StepLabel>;

    return (
      <EnhancedButton
        disabled={disabled}
        style={Object.assign(styles.root, style)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleTouchStart}
        {...other}
      >
        {React.cloneElement(child, {active, completed, disabled, icon})}
      </EnhancedButton>
    );
  }
}

export default StepButton;
