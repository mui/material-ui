var React = require('react');
var KeyCode = require('./utils/key-code.js');
var Classable = require('./mixins/classable.js');
var DomIdable = require('./mixins/dom-idable.js');
var WindowListenable = require('./mixins/window-listenable');
var Paper = require('./paper.jsx');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var FocusRipple = require('./ripples/focus-ripple.jsx');
var TouchRipple = require('./ripples/touch-ripple.jsx');

var Toggle = React.createClass({

  mixins: [Classable, DomIdable, WindowListenable],

  propTypes: {
    id: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    checked: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool,
    labelPosition: React.PropTypes.oneOf(['left', 'right']),
    disableFocusRipple: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool
  },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  getInitialState: function() {
    return {
      toggled: this.props.defaultToggled || this.props.checked,
      isKeyboardFocused: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasNewDefaultProp = 
      (nextProps.hasOwnProperty('defaultToggled') && 
      (nextProps.defaultToggled != this.props.defaultToggled));
    var newState = {};

    if (hasCheckedProp) {
      newState.toggled = nextProps.checked;
    } else if (hasCheckedLinkProp) {
      newState.toggled = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.toggled = nextProps.defaultToggled;
    }

    if (newState) this.setState(newState);
  },


  render: function() {
    var {
      id,
      onToggle,
      onBlur,
      onFocus,
      onMouseUp,
      onMouseDown,
      onMouseOut,
      onTouchStart,
      onTouchEnd,
      disableTouchRipple,
      disableFocusRipple,
      ...other
    } = this.props;
    
    var classes = this.getClasses("mui-toggle", {
      'mui-switch-wrap': true,
      'mui-is-switched': this.state.toggled,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var touchRipple = (
      <TouchRipple
        ref="touchRipple"
        key="touchRipple"
        centerRipple={true} />
    );
    var focusRipple = (
      <FocusRipple
        key="focusRipple"
        show={this.state.isKeyboardFocused} />
    );
    var ripples = [
      this.props.disabled || disableTouchRipple ? null : touchRipple,
      this.props.disabled || disableFocusRipple ? null : focusRipple
    ];

    var inputId = this.props.id || this.getDomId();

    var toggleDiv = (
      <div className="mui-toggle-icon mui-switch">
        <div className="mui-toggle-track" />
        <Paper className="mui-toggle-thumb" zDepth={1}>
          {ripples}
        </Paper>
      </div>
    );

    var labelElement = this.props.label ? (
      <label className="mui-switch-label" htmlFor={inputId}>
        {this.props.label}
      </label>
    ) : null;

    var labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    var divsInOrder = (labelPositionExist && (this.props.labelPosition.toUpperCase() === "RIGHT")) ? (
        <div>
          {toggleDiv}
          {labelElement}
        </div>
      ) : (
        <div>
          {labelElement}
          {toggleDiv}
        </div>
    );

    return (
      <div className={classes}>

        <EnhancedSwitch 
          {...other}
          id={inputId}
          ref="enhancedSwitch"
          inputType="checkbox"
          onSwitch={this._handleToggle}
          onBlur={this._handleBlur}
          onFocus={this._handleFocus}
          onMouseUp={this._handleMouseUp}
          onMouseDown={this._handleMouseDown}
          onMouseOut={this._handleMouseOut}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}
          defaultChecked={this.props.defaultToggled} />

        {divsInOrder}

      </div>
    );
  },

  isToggled: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function(e, isInputChecked) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });

    if (!this.props.hasOwnProperty('checked')) this.setState({toggled: isInputChecked});
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  // Keycode ENTER gave a false check.
  _handleWindowKeydown: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.TAB && this.state.isKeyboardFocused) {
      this._handleToggle(e, !this.state.toggled);
    }
  },

  _handleWindowKeyup: function(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleToggle(e, !this.state.toggled);
    }
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) this.refs.touchRipple.start(e);
  },

  _handleMouseUp: function(e) {
    this.refs.touchRipple.end();
  },

  _handleMouseOut: function(e) {
    this.refs.touchRipple.end();
  },

  _handleTouchStart: function(e) {
    this.refs.touchRipple.start(e);
  },

  _handleTouchEnd: function(e) {
    this.refs.touchRipple.end();
  },

  _handleBlur: function(e) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
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
  }

});

module.exports = Toggle;
