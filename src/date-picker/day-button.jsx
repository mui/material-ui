var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transition = require('../styles/transitions');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');

var DayButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  getTheme: function() {
    return this.context.theme.component.datePicker;
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
        WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
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
        backgroundColor: this.getTheme().selectColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if (DateTime.isEqualDate(this.props.date, new Date()) && !this.props.selected) {
        styles.label.color = this.getTheme().color;
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