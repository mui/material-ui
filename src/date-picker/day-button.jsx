let React = require('react');
let StylePropable = require('../mixins/style-propable');
let Transition = require('../styles/transitions');
let DateTime = require('../utils/date-time');
let EnhancedButton = require('../enhanced-button');


let DayButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
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
    return this.context.muiTheme.component.datePicker;
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
        width: 36,
        padding: '4px 2px',
      },

      label: {
        position: 'relative',
        color: this.context.muiTheme.palette.textColor,
      },

      buttonState: {
        position: 'absolute',
        height: 32,
        width: 32,
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
        <div style={styles.buttonState} />
        <span style={styles.label}>{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span style={styles.root} />
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
    if (!this.props.disabled && this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
  },

});

module.exports = DayButton;
