import React from 'react';
import Transition from '../styles/transitions';
import DateTime from '../utils/dateTime';
import EnhancedButton from '../internal/EnhancedButton';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    backgroundColor,
    date,
    disabled,
    hoverColor,
    selected,
  } = props;

  const {
    hover,
  } = state;

  const {
    baseTheme,
    datePicker,
  } = state.muiTheme;

  let labelColor = backgroundColor || baseTheme.palette.textColor;
  let buttonStateColor = backgroundColor || datePicker.selectColor;
  let buttonStateOpacity = 0;
  let buttonStateTransform = 'scale(0)';

  if (hover || selected) {
    labelColor = datePicker.selectTextColor;
    buttonStateOpacity = selected ? 1 : 0.6;
    buttonStateTransform = 'scale(1)';
    if (hoverColor) {
      buttonStateColor = hoverColor;
    }
  } else if (DateTime.isEqualDate(date, new Date())) {
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
      backgroundColor: buttonStateColor,
    },
  };
}

const DayButton = React.createClass({

  propTypes: {
    backgroundColor: React.PropTypes.string,
    date: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    hoverColor: React.PropTypes.string,
    onKeyboardFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      selected: false,
      disabled: false,
    };
  },

  getInitialState() {
    return {
      hover: false,
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

  handleMouseEnter() {
    if (!this.props.disabled) this.setState({hover: true});
  },

  handleMouseLeave() {
    if (!this.props.disabled) this.setState({hover: false});
  },

  handleTouchTap(event) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(event, this.props.date);
  },

  handleKeyboardFocus(event, keyboardFocused) {
    if (!this.props.disabled && this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(event, keyboardFocused, this.props.date);
    }
  },

  render() {
    const {
      backgroundColor,
      date,
      hoverColor,
      onTouchTap,
      selected,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return this.props.date ? (
      <EnhancedButton
        {...other}
        style={Object.assign({}, styles.root, style)}
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
      <span style={Object.assign({}, styles.root, style)} />
    );
  },

});

export default DayButton;
