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
    selected: React.PropTypes.bool
  },

  render: function() {
    var {
      className,
      date,
      onTouchTap,
      selected,
      ...other
    } = this.props;

    var styles = {
      root: {
        boxSizing: 'border-box',
        webkitTapHighlightColor: 'rgba(0,0,0,0)', 
        position: 'relative',
        float: 'left',
        width: 36,
        padding: '4px 2px',
      },

      label: {
        position: 'relative',
      },

      select: {
        position: 'absolute',
        height: 32,
        width: 32,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transition.easeOut(),
        backgroundColor: CustomVariables.datePickerSelectColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = CustomVariables.datePickerSelectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
      if (DateTime.isEqualDate(this.props.date, new Date())) {
        styles.root.color = CustomVariables.datePickerColor;
      }
    }

    return this.props.date ? (
      <EnhancedButton {...other}
        style={styles.root}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={this._handleTouchTap}
        onKeyboardFocus={this._handleKeyboardFocus}>
        <div style={styles.select}/>
        <span style={styles.label}>{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span style={styles.root} />
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
  } 

});

module.exports = DayButton;