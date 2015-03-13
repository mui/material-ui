var React = require('react');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var WindowListenable = require('./mixins/window-listenable');
var FocusRipple = require('./ripples/focus-ripple');
var TouchRipple = require('./ripples/touch-ripple');

var EnhancedButton = React.createClass({

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    centerRipple: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    disableFocusRipple: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    linkButton: React.PropTypes.bool,
    focusRippleColor: React.PropTypes.string,
    touchRippleColor: React.PropTypes.string,
    focusRippleOpacity: React.PropTypes.number,
    touchRippleOpacity: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func
  },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  getInitialState: function() {
    return {
      isKeyboardFocused: false 
    };
  },

  /** Styles */
  _main: function() {
    var style = {
      border: 0,
      background: 'none',
    };

    if (this.props.linkButton) {
      style = this.mergeAndPrefix({
        display: 'inline-block',
        cursor: (this.props.disabled) ? 'default' : 'pointer',
        textDecoration: 'none',
      }, style);
    }

    return this.mergeAndPrefix(style);
  },


  render: function() {
    var {
      centerRipple,
      disabled,
      disableFocusRipple,
      disableTouchRipple,
      linkButton,
      touchRippleColor,
      onBlur,
      onFocus,
      onMouseOver,
      onTouchTap,
      ...other } = this.props;

    var touchRipple = (
      <TouchRipple
        ref="touchRipple"
        key="touchRipple"
        centerRipple={centerRipple}
        color={this.props.touchRippleColor}
        opacity={this.props.touchRippleOpacity}>
        {this.props.children}
      </TouchRipple>
    );
    var focusRipple = (
      <FocusRipple
        key="focusRipple"
        color={this.props.focusRippleColor}
        opacity={this.props.focusRippleOpacity}
        show={this.state.isKeyboardFocused} />
    );
    var buttonProps = {
      style: this._main(),
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onMouseOver: this._handleMouseOver,
      onTouchTap: this._handleTouchTap
    };
    var buttonChildren = [
      disabled || disableTouchRipple ? this.props.children : touchRipple,
      disabled || disableFocusRipple ? null : focusRipple
    ];

    if (disabled && linkButton) {
      return (
        <span {...other} 
          className={this.props.className} 
          disabled={disabled}>
          {this.props.children}
        </span>
      );
    }

    return linkButton ? (
      <a {...other} {...buttonProps}>
        {buttonChildren}
      </a>
    ) : (
      <button {...other} {...buttonProps}>
        {buttonChildren}
      </button>
    );
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  _handleWindowKeydown: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.ENTER && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleWindowKeyup: function(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleBlur: function(e) {
    this.setState({
      isKeyboardFocused: false
    });
    this.props.onKeyboardFocus(false);

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    this.getDOMNode().style.outline = 'none';
    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function() {
      if (this._tabPressed) {
        this.setState({
          isKeyboardFocused: true
        });
        this.props.onKeyboardFocus(true);
      }
    }.bind(this), 150);
    
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseOver: function(e) {
    this.getDOMNode().style.textDecoration = 'none';
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleTouchTap: function(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });
    this.props.onKeyboardFocus(false);

    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = EnhancedButton;