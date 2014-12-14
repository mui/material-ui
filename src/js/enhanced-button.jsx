var React = require('react');
var KeyCode = require('./utils/key-code.js');
var Classable = require('./mixins/classable.js');
var WindowListenable = require('./mixins/window-listenable');

var EnhancedButton = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    linkButton: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp'
  },

  getInitialState: function() {
    return {
      isKeyboardFocused: false 
    };
  },

  render: function() {
    var {
      className,
      disabled,
      icon,
      linkButton,
      onTouchTap,
      ...other } = this.props;
    var classes = this.getClasses('mui-enhanced-button', {
      'mui-is-disabled': disabled,
      'mui-is-keyboard-focused': this.state.isKeyboardFocused,
      'mui-is-link-button': linkButton
    });

    return this.props.linkButton ? (
      this.props.disabled ? (
        <span {...other} 
          className={classes} 
          disabled={disabled}>
          {this.props.children}
        </span>
      ) : (
        <a {...other} 
          className={classes} 
          disabled={disabled} 
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onTouchTap={this._onTouchTap}>
          {this.props.children}
        </a>
      )
    ) : (
      <button {...other} 
        className={classes} 
        disabled={disabled} 
        onBlur={this._onBlur}
        onFocus={this._onFocus}
        onTouchTap={this._onTouchTap}>
        {this.props.children}
      </button>
    );
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  _onWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.ENTER && this.state.isKeyboardFocused) {
      this._onTouchTap(e);
    }
  },

  _onBlur: function(e) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _onFocus: function(e) {
    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function() {
      if (this._tabPressed) {
        this.setState({
          isKeyboardFocused: true
        });
      }
    }.bind(this), 150);
    
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _onTouchTap: function(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = EnhancedButton;