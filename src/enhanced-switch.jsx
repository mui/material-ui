var React = require('react');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var UniqueId = require('./utils/unique-id');
var WindowListenable = require('./mixins/window-listenable');
var Spacing = require('./styles/spacing');
var ClearFix = require('./clearfix');
var FocusRipple = require('./ripples/focus-ripple');
var TouchRipple = require('./ripples/touch-ripple');
var Paper = require('./paper');

var EnhancedSwitch = React.createClass({

  mixins: [WindowListenable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
      id: React.PropTypes.string,
      inputType: React.PropTypes.string.isRequired,
      switchElement: React.PropTypes.element.isRequired,
      onParentShouldUpdate: React.PropTypes.func.isRequired,
      switched: React.PropTypes.bool.isRequired,
      rippleStyle: React.PropTypes.object,
      rippleColor: React.PropTypes.string,
      iconStyle: React.PropTypes.object,
      thumbStyle: React.PropTypes.object,
      trackStyle: React.PropTypes.object,
      labelStyle: React.PropTypes.object,
      name: React.PropTypes.string,
      value: React.PropTypes.string,
      label: React.PropTypes.string,
      onSwitch: React.PropTypes.func,
      required: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      defaultSwitched: React.PropTypes.bool,
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
      isKeyboardFocused: false,
      parentWidth: 100,
    };
  },

  getEvenWidth: function(){
    return (
      parseInt(window
        .getComputedStyle(React.findDOMNode(this.refs.root))
        .getPropertyValue('width'), 10)
    );
  },

  componentDidMount: function() {
    var inputNode = React.findDOMNode(this.refs.checkbox);
    if (!this.props.switched ||
        inputNode.checked != this.props.switched) this.props.onParentShouldUpdate(inputNode.checked);

    window.addEventListener("resize", this._handleResize);

    this._handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this._handleResize);
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasToggledProp = nextProps.hasOwnProperty('toggled');
    var hasNewDefaultProp =
      (nextProps.hasOwnProperty('defaultSwitched') &&
      (nextProps.defaultSwitched != this.props.defaultSwitched));
    var newState = {};

    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasToggledProp) {
      newState.switched = nextProps.toggled;
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.switched = nextProps.defaultSwitched;
    }

    if (newState.switched !== undefined && (newState.switched != this.props.switched)) this.props.onParentShouldUpdate(newState.switched);
  },

  getTheme: function() {
    return this.context.muiTheme.palette;
  },

  getStyles: function() {
    var switchWidth = 60 - Spacing.desktopGutterLess;
    var labelWidth = 'calc(100% - 60px)';

    var styles = {
      root: {
        position: 'relative',
        cursor: this.props.disabled ? 'default' : 'pointer',
        overflow: 'visible',
        display: 'table',
        height: 'auto',
        width: '100%'
      },
      input: {
        position: 'absolute',
        cursor: this.props.disabled ? 'default' : 'pointer',
        pointerEvents: 'all',
        opacity: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        left: 0,
        boxSizing: 'border-box',
        padding: 0,
        margin: 0
      },
      controls: {
        width: '100%',
        height: '100%'
      },
      label: {
        float: 'left',
        position: 'relative',
        display: 'table-column',
        width: labelWidth,
        lineHeight: '24px',
        color: this.getTheme().textColor
      },
      wrap: {
        transition: Transitions.easeOut(),
        float: 'left',
        position: 'relative',
        display: 'table-column',
        width: switchWidth,
        marginRight: (this.props.labelPosition == 'right') ?
          Spacing.desktopGutterLess : 0,
        marginLeft: (this.props.labelPosition == 'left') ?
          Spacing.desktopGutterLess : 0
      },
      ripple: {
        height: '200%',
        width: '200%',
        top: '-12',
        left: '-12'
      }
    };
    return styles;
  },

  render: function() {
    var {
      type,
      name,
      value,
      label,
      onSwitch,
      defaultSwitched,
      onBlur,
      onFocus,
      onMouseUp,
      onMouseDown,
      onMouseOut,
      onTouchStart,
      onTouchEnd,
      disableTouchRipple,
      disableFocusRipple,
      className,
      ...other
    } = this.props;

    var styles = this.getStyles();

    var wrapStyles = this.mergeAndPrefix(styles.wrap, this.props.iconStyle);
    var rippleStyle = this.mergeAndPrefix(styles.ripple, this.props.rippleStyle);
    var rippleColor = this.props.hasOwnProperty('rippleColor') ? this.props.rippleColor :
                      this.getTheme().primary1Color;

    if (this.props.thumbStyle) {
      wrapStyles.marginLeft /= 2;
      wrapStyles.marginRight /= 2;
    }

    var inputId = this.props.id || UniqueId.generate();

    var labelStyle = this.mergeAndPrefix(styles.label, this.props.labelStyle);

    var labelElement = this.props.label ? (
      <label style={labelStyle} htmlFor={inputId}>
        {this.props.label}
      </label>
    ) : null;

    var inputProps = {
      ref: "checkbox",
      type: this.props.inputType,
      style: this.mergeAndPrefix(styles.input),
      name: this.props.name,
      value: this.props.value,
      defaultChecked: this.props.defaultSwitched,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus
    };

    var hideTouchRipple = this.props.disabled || disableTouchRipple;

    if(!hideTouchRipple) {
      inputProps.onMouseUp = this._handleMouseUp;
      inputProps.onMouseDown = this._handleMouseDown;
      inputProps.onMouseOut = this._handleMouseOut;
      inputProps.onTouchStart = this._handleTouchStart;
      inputProps.onTouchEnd = this._handleTouchEnd;
    }

    if (!this.props.hasOwnProperty('checkedLink')) {
      inputProps.onChange = this._handleChange;
    }

    var inputElement = (
      <input
        {...other}
        {...inputProps}/>
    );

    var touchRipple = (
      <TouchRipple
        ref="touchRipple"
        key="touchRipple"
        style={rippleStyle}
        color={rippleColor}
        centerRipple={true} />
    );

    var focusRipple = (
      <FocusRipple
        key="focusRipple"
        innerStyle={rippleStyle}
        color={rippleColor}
        show={this.state.isKeyboardFocused} />
    );

    var ripples = [
      hideTouchRipple ? null : touchRipple,
      this.props.disabled || disableFocusRipple ? null : focusRipple
    ];

    // If toggle component (indicated by whether the style includes thumb) manually lay out
    // elements in order to nest ripple elements
    var switchElement = !this.props.thumbStyle ? (
        <div style={wrapStyles}>
          {this.props.switchElement}
          {ripples}
        </div>
      ) : (
        <div style={wrapStyles}>
          <div style={this.props.trackStyle}/>
          <Paper style={this.props.thumbStyle} zDepth={1} circle={true}> {ripples} </Paper>
        </div>
    );

    var labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    var elementsInOrder = (labelPositionExist &&
      (this.props.labelPosition.toUpperCase() === "RIGHT")) ? (
        <ClearFix style={this.mergeAndPrefix(styles.controls)}>
          {switchElement}
          {labelElement}
        </ClearFix>
      ) : (
        <ClearFix style={this.mergeAndPrefix(styles.controls)}>
          {labelElement}
          {switchElement}
        </ClearFix>
    );

    return (
      <div ref="root"  className={className} style={this.mergeAndPrefix(styles.root, this.props.style)}>
          {inputElement}
          {elementsInOrder}
      </div>
    );
  },


  isSwitched: function() {
    return React.findDOMNode(this.refs.checkbox).checked;
  },

  // no callback here because there is no event
  setSwitched: function(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      this.props.onParentShouldUpdate(newSwitchedValue);
      React.findDOMNode(this.refs.checkbox).checked = newSwitchedValue;
    } else if (process.env.NODE_ENV !== 'production') {
      var message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  },

  getValue: function() {
    return React.findDOMNode(this.refs.checkbox).value;
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  _handleChange: function(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });

    var isInputChecked = React.findDOMNode(this.refs.checkbox).checked;

    if (!this.props.hasOwnProperty('checked')) this.props.onParentShouldUpdate(isInputChecked);
    if (this.props.onSwitch) this.props.onSwitch(e, isInputChecked);
  },

  /**
   * Because both the ripples and the checkbox input cannot share pointer
   * events, the checkbox input takes control of pointer events and calls
   * ripple animations manually.
   */

  // Checkbox inputs only use SPACE to change their state. Using ENTER will
  // update the ui but not the input.
  _handleWindowKeydown: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleWindowKeyup: function(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) this.refs.touchRipple.start(e);
  },

  _handleMouseUp: function() {
    this.refs.touchRipple.end();
  },

  _handleMouseOut: function() {
    this.refs.touchRipple.end();
  },

  _handleTouchStart: function(e) {
    this.refs.touchRipple.start(e);
  },

  _handleTouchEnd: function() {
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
  },

  _handleResize: function() {
    this.setState({parentWidth: this.getEvenWidth()});
  }

});

module.exports = EnhancedSwitch;
