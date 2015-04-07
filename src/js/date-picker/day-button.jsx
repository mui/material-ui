var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transition = require('../styles/mixins/transitions');
var CustomVariables = require('../styles/variables/custom-variables');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');

var DayButton = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      selected: false,
      disabled: false
    };
  },
  
  getInitialState: function() {
    return {
      hover: false
    };
  },

  render: function() {
    var {
      date,
      onTouchTap,
      selected,
      ...other
    } = this.props;

    var styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
        position: 'relative',
        float: 'left',
        width: 36,
        padding: '4px 2px'
      },

      label: {
        position: 'relative'
      },

      buttonState: {
        position: 'absolute',
        height: 32,
        width: 32,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transition.easeOut(),
        backgroundColor: CustomVariables.datePickerSelectColor
      }
    };

    if (this.state.hover) {
      styles.label.color = CustomVariables.datePickerSelectTextColor;
      styles.buttonState.opacity = '0.6';
      styles.buttonState.transform = 'scale(1)';
    }

    if (this.props.selected) {
      styles.label.color = CustomVariables.datePickerSelectTextColor;
      styles.buttonState.opacity = 1;
      styles.buttonState.transform = 'scale(1)';
    }
    else if (this.props.disabled) {
      styles.root.opacity = '0.6';
    }
    
    if (DateTime.isEqualDate(this.props.date, new Date())) {
      styles.root.color = CustomVariables.datePickerColor;
    }

    return this.props.date ? (
      <EnhancedButton {...other}
        style={styles.root}
        hoverStyle={styles.hover}
        disabled={this.props.disabled}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseOver={this._handleMouseOver}
        onMouseOut={this._handleMouseOut}
        onTouchTap={this._handleTouchTap}
        onKeyboardFocus={this._handleKeyboardFocus}>
        <div style={styles.buttonState} />
        <span style={styles.label}>{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span style={styles.root} />
    );
  },

  _handleMouseOver: function() {
    if (!this.props.disabled) this.setState({hover: true});
  },
  
  _handleMouseOut: function() {
    if (!this.props.disabled) this.setState({hover: false});
  },

  _handleTouchTap: function(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (!this.props.disabled && this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
  } 

});

module.exports = DayButton;