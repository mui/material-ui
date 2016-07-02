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
    /** @ignore */
    last: PropTypes.bool,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /** @ignore */
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
    touched: false,
  };

  handleMouseEnter = (event) => {
    const {onMouseEnter} = this.props;
    // Cancel hover styles for touch devices
    if (!this.state.touched) {
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
    if (!this.state.touched) {
      this.setState({touched: true});
    }
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
      last, // eslint-disable-line no-unused-vars
      onMouseEnter, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
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
