import React from 'react';
import StylePropable from '../mixins/style-propable';
import Transition from '../styles/transitions';
import DateTime from '../utils/date-time';
import EnhancedButton from '../enhanced-button';
import muiThemeable from '../muiThemeable';

let DayButton = React.createClass({

  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    date: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    onKeyboardFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
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
    };
  },

  getTheme() {
    return this.props._muiTheme.datePicker;
  },

  render() {
    let {
      date,
      onTouchTap,
      selected,
      ...other,
    } = this.props;

    let styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        position: 'relative',
        float: 'left',
        width: 41,
        padding: '4px 2px',
      },

      label: {
        position: 'relative',
        color: this.props._muiTheme.baseTheme.palette.textColor,
      },

      buttonState: {
        position: 'absolute',
        height: 36,
        width: 36,
        top: 2,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transition.easeOut(),
        backgroundColor: this.getTheme().selectColor,
      },
    };

    if (this.state.hover) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = '0.6';
      styles.buttonState.transform = 'scale(1)';
    }

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 1;
      styles.buttonState.transform = 'scale(1)';
    }
    else if (this.props.disabled) {
      styles.root.opacity = '0.6';
    }

    if (DateTime.isEqualDate(this.props.date, new Date()) && !this.props.selected) {
      styles.label.color = this.getTheme().color;
    }

    return this.props.date ? (
      <EnhancedButton {...other}
        style={styles.root}
        hoverStyle={styles.hover}
        disabled={this.props.disabled}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onTouchTap={this._handleTouchTap}
        onKeyboardFocus={this._handleKeyboardFocus}>
        <div style={this.prepareStyles(styles.buttonState)} />
        <span style={this.prepareStyles(styles.label)}>{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span style={this.prepareStyles(styles.root)} />
    );
  },

  _handleMouseEnter() {
    if (!this.props.disabled) this.setState({hover: true});
  },

  _handleMouseLeave() {
    if (!this.props.disabled) this.setState({hover: false});
  },

  _handleTouchTap(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  },

  _handleKeyboardFocus(e, keyboardFocused) {
    if (!this.props.disabled && this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
    }
  },

});

DayButton = muiThemeable(DayButton);

export default DayButton;
