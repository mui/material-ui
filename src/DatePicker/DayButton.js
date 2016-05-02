import React, {Component, PropTypes} from 'react';
import Transition from '../styles/transitions';
import {isEqualDate} from './dateUtils';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context) {
  const {
    date,
    disabled,
    selected,
  } = props;

  const {hover} = context;

  const {
    baseTheme,
    datePicker,
  } = context.muiTheme;

  let labelColor = baseTheme.palette.textColor;
  let buttonStateOpacity = 0;
  let buttonStateTransform = 'scale(0)';

  if (hover || selected) {
    labelColor = datePicker.selectTextColor;
    buttonStateOpacity = selected ? 1 : 0.6;
    buttonStateTransform = 'scale(1)';
  } else if (isEqualDate(date, new Date())) {
    labelColor = datePicker.color;
  }

  return {
    root: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      position: 'relative',
      float: 'left',
      width: 41,
      padding: '4px 2px',
      opacity: disabled && '0.6',
      lineHeight: 'inherit',
    },
    label: {
      position: 'relative',
      color: labelColor,
    },
    buttonState: {
      position: 'absolute',
      height: 36,
      width: 36,
      top: 2,
      opacity: buttonStateOpacity,
      borderRadius: '50%',
      transform: buttonStateTransform,
      transition: Transition.easeOut(),
      backgroundColor: datePicker.selectColor,
    },
  };
}

class DayButton extends Component {
  static propTypes = {
    date: PropTypes.object,
    disabled: PropTypes.bool,
    onKeyboardFocus: PropTypes.func,
    onTouchTap: PropTypes.func,
    selected: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    disabled: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hover: false,
  };

  handleMouseEnter = () => {
    if (!this.props.disabled) this.setState({hover: true});
  };

  handleMouseLeave = () => {
    if (!this.props.disabled) this.setState({hover: false});
  };

  handleTouchTap = (event) => {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(event, this.props.date);
  };

  handleKeyboardFocus = (event, keyboardFocused) => {
    if (!this.props.disabled && this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(event, keyboardFocused, this.props.date);
    }
  };

  render() {
    const {
      date, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return this.props.date ? (
      <EnhancedButton
        {...other}
        style={styles.root}
        hoverStyle={styles.hover}
        disabled={this.props.disabled}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleTouchTap}
        onKeyboardFocus={this.handleKeyboardFocus}
      >
        <div style={prepareStyles(styles.buttonState)} />
        <span style={prepareStyles(styles.label)}>{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span style={prepareStyles(styles.root)} />
    );
  }
}

export default DayButton;
