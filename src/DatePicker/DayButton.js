import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import classNames from 'classnames';

import {isEqualDate} from './dateUtils';
import Transition from '../styles/transitions';
import EnhancedButton from '../internal/EnhancedButton';

const styleSheet = createStyleSheet('DayButton', (theme) => {
  const {
    datePicker,
  } = theme;

  return {
    root: {
      boxSizing: 'border-box',
      fontWeight: '400',
      position: 'relative',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', // Remove mobile color flashing (deprecated)
    },
    label: {
      fontWeight: '400',
      position: 'relative',
    },
    buttonState: {
      backgroundColor: datePicker.selectColor,
      borderRadius: '50%',
      height: 34,
      left: 4,
      position: 'absolute',
      top: 0,
      width: 34,
      transition: Transition.easeOut(),
    },
  };
});

function getStyles(props, state, context) {
  const {date, disabled, selected} = props;
  const {hover} = state;
  const {baseTheme, datePicker} = context.muiTheme;

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
      width: 42,
      padding: '4px 0px',
      opacity: disabled && '0.6',
    },
    label: {
      color: labelColor,
    },
    buttonState: {
      opacity: buttonStateOpacity,
      transform: buttonStateTransform,
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
    if (!this.props.disabled) {
      this.setState({hover: true});
    }
  };

  handleMouseLeave = () => {
    if (!this.props.disabled) {
      this.setState({hover: false});
    }
  };

  handleTouchTap = (event) => {
    if (!this.props.disabled && this.props.onTouchTap) {
      this.props.onTouchTap(event, this.props.date);
    }
  };

  handleKeyboardFocus = (event, keyboardFocused) => {
    if (!this.props.disabled && this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(event, keyboardFocused, this.props.date);
    }
  };

  render() {
    const classes = this.context.muiTheme.styleManager.render(styleSheet);

    const {
      date, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);

    return date ? (
      <EnhancedButton
        {...other}
        disabled={this.props.disabled}
        disableFocusRipple={true}
        disableTouchRipple={true}
        hoverStyle={styles.hover}
        onKeyboardFocus={this.handleKeyboardFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleTouchTap}
        className={classNames(classes.root)}
        style={styles.root}
      >
        <div className={classNames(classes.buttonState)} style={prepareStyles(styles.buttonState)} />
        <span className={classNames(classes.label)} style={prepareStyles(styles.label)}>
          {date.getDate()}
        </span>
      </EnhancedButton>
    ) : (
      <span style={prepareStyles(styles.root)} />
    );
  }
}

export default DayButton;
