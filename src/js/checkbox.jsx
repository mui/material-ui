var React = require('react');
var KeyCode = require('./utils/key-code.js');
var Classable = require('./mixins/classable.js');
var DomIdable = require('./mixins/dom-idable.js');
var WindowListenable = require('./mixins/window-listenable');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank.jsx');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked.jsx');
var FocusRipple = require('./ripples/focus-ripple.jsx');
var TouchRipple = require('./ripples/touch-ripple.jsx');

var Checkbox = React.createClass({

  mixins: [Classable, DomIdable, WindowListenable],

  propTypes: {
    id: React.PropTypes.string,
    onCheck: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    labelPositionRight: React.PropTypes.bool,
    disableFocusRipple: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool
  },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  componentDidMount: function() {
    this.setState({checked: this.isChecked()});
  },

  getInitialState: function() {
    return {
      checked: this.props.defaultChecked || this.props.checked,
      isKeyboardFocused: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasNewDefaultProp = 
      (nextProps.hasOwnProperty('defaultChecked') && 
      (nextProps.defaultChecked != this.props.defaultChecked));
    var newState = {};

    if (hasCheckedProp) {
      newState.checked = nextProps.checked;
    } else if (hasCheckedLinkProp) {
      newState.checked = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.checked = nextProps.defaultChecked;
    }

    if (newState) this.setState(newState);
  },

  render: function() {
    var {
      id,
      onCheck,
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

    var classes = this.getClasses("mui-checkbox", {
      'mui-switch-wrap': true,
      'mui-is-switched': this.state.checked,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var inputId = this.props.id || this.getDomId();

    var labelElement = this.props.label ? (
      <label className="mui-switch-label" htmlFor={inputId}>
        {this.props.label}
      </label>
    ) : null;

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

    return (
      <div className={classes}>

        <EnhancedSwitch 
          {...other}
          id={inputId}
          ref="enhancedSwitch"
          inputType="checkbox"
          onSwitch={this._handleCheck}
          onBlur={this._handleBlur}
          onFocus={this._handleFocus}
          onMouseUp={this._handleMouseUp}
          onMouseDown={this._handleMouseDown}
          onMouseOut={this._handleMouseOut}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}
          defaultSwitched={this.props.defaultChecked} />

        <div className="mui-checkbox-icon mui-switch">
          <CheckboxOutline className="mui-checkbox-box" />
          <CheckboxChecked className="mui-checkbox-check" />
          {ripples}
        </div>

        {labelElement}

      </div> 
    );
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  // Keycode ENTER gave a false check.
  _handleWindowKeydown: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleCheck(e, this.state.checked);
    }
  },

  _handleWindowKeyup: function(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleCheck(e, this.state.checked);
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

  _handleCheck: function(e, isInputChecked) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });
    
    if (!this.props.hasOwnProperty('checked')) this.setState({checked: isInputChecked});
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
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
  },

});

module.exports = Checkbox;
