let React = require('react');
let KeyCode = require('./utils/key-code');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let UniqueId = require('./utils/unique-id');
let WindowListenable = require('./mixins/window-listenable');
let ClearFix = require('./clearfix');
let FocusRipple = require('./ripples/focus-ripple');
let TouchRipple = require('./ripples/touch-ripple');
let Paper = require('./paper');


let EnhancedSwitch = React.createClass({

  mixins: [WindowListenable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
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
      disableTouchRipple: React.PropTypes.bool,
    },

  windowListeners: {
    keydown: '_handleWindowKeydown',
    keyup: '_handleWindowKeyup',
  },

  getInitialState() {
    return {
      isKeyboardFocused: false,
      parentWidth: 100,
    };
  },

  getEvenWidth(){
    return (
      parseInt(window
        .getComputedStyle(React.findDOMNode(this.refs.root))
        .getPropertyValue('width'), 10)
    );
  },

  componentDidMount() {
    let inputNode = React.findDOMNode(this.refs.checkbox);
    if (!this.props.switched || inputNode.checked !== this.props.switched) {
      this.props.onParentShouldUpdate(inputNode.checked);
    }

    window.addEventListener("resize", this._handleResize);

    this._handleResize();
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize);
  },

  componentWillReceiveProps(nextProps) {
    let hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    let hasCheckedProp = nextProps.hasOwnProperty('checked');
    let hasToggledProp = nextProps.hasOwnProperty('toggled');
    let hasNewDefaultProp =
      (nextProps.hasOwnProperty('defaultSwitched') &&
      (nextProps.defaultSwitched !== this.props.defaultSwitched));
    let newState = {};

    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    }
    else if (hasToggledProp) {
      newState.switched = nextProps.toggled;
    }
    else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    }
    else if (hasNewDefaultProp) {
      newState.switched = nextProps.defaultSwitched;
    }

    if (newState.switched !== undefined && (newState.switched !== this.props.switched)) {
      this.props.onParentShouldUpdate(newState.switched);
    }
  },

  getTheme() {
    return this.context.muiTheme.palette;
  },

  getStyles() {
    let spacing = this.context.muiTheme.spacing;
    let switchWidth = 60 - spacing.desktopGutterLess;
    let labelWidth = 'calc(100% - 60px)';
    let styles = {
      root: {
        position: 'relative',
        cursor: this.props.disabled ? 'default' : 'pointer',
        overflow: 'visible',
        display: 'table',
        height: 'auto',
        width: '100%',
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
        margin: 0,
      },
      controls: {
        width: '100%',
        height: '100%',
      },
      label: {
        float: 'left',
        position: 'relative',
        display: 'block',
        width: labelWidth,
        lineHeight: '24px',
        color: this.getTheme().textColor,
      },
      wrap: {
        transition: Transitions.easeOut(),
        float: 'left',
        position: 'relative',
        display: 'block',
        width: switchWidth,
        marginRight: (this.props.labelPosition === 'right') ?
          spacing.desktopGutterLess : 0,
        marginLeft: (this.props.labelPosition === 'left') ?
          spacing.desktopGutterLess : 0,
      },
      ripple: {
        height: '200%',
        width: '200%',
        top: -12,
        left: -12,
      },
    };

    return styles;
  },

  render() {
    let {
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
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      disableTouchRipple,
      disableFocusRipple,
      className,
      ...other,
    } = this.props;

    let styles = this.getStyles();
    let wrapStyles = this.mergeAndPrefix(styles.wrap, this.props.iconStyle);
    let rippleStyle = this.mergeAndPrefix(styles.ripple, this.props.rippleStyle);
    let rippleColor = this.props.hasOwnProperty('rippleColor') ? this.props.rippleColor :
                      this.getTheme().primary1Color;

    if (this.props.thumbStyle) {
      wrapStyles.marginLeft /= 2;
      wrapStyles.marginRight /= 2;
    }

    let inputId = this.props.id || UniqueId.generate();

    let labelStyle = this.mergeAndPrefix(styles.label, this.props.labelStyle);
    let labelElement = this.props.label ? (
      <label style={labelStyle} htmlFor={inputId}>
        {this.props.label}
      </label>
    ) : null;

    let inputProps = {
      ref: "checkbox",
      type: this.props.inputType,
      style: this.mergeAndPrefix(styles.input),
      name: this.props.name,
      value: this.props.value,
      defaultChecked: this.props.defaultSwitched,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
    };

    let hideTouchRipple = this.props.disabled || disableTouchRipple;

    if (!hideTouchRipple) {
      inputProps.onMouseUp = this._handleMouseUp;
      inputProps.onMouseDown = this._handleMouseDown;
      inputProps.onMouseLeave = this._handleMouseLeave;
      inputProps.onTouchStart = this._handleTouchStart;
      inputProps.onTouchEnd = this._handleTouchEnd;
    }

    if (!this.props.hasOwnProperty('checkedLink')) {
      inputProps.onChange = this._handleChange;
    }

    let inputElement = (
      <input
        {...other}
        {...inputProps}/>
    );

    let touchRipple = (
      <TouchRipple
        ref="touchRipple"
        key="touchRipple"
        style={rippleStyle}
        color={rippleColor}
        centerRipple={true} />
    );

    let focusRipple = (
      <FocusRipple
        key="focusRipple"
        innerStyle={rippleStyle}
        color={rippleColor}
        show={this.state.isKeyboardFocused} />
    );

    let ripples = [
      hideTouchRipple ? null : touchRipple,
      this.props.disabled || disableFocusRipple ? null : focusRipple,
    ];

    // If toggle component (indicated by whether the style includes thumb) manually lay out
    // elements in order to nest ripple elements
    let switchElement = !this.props.thumbStyle ? (
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

    let labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    let elementsInOrder = (labelPositionExist &&
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
      <div ref="root" className={className} style={this.mergeAndPrefix(styles.root, this.props.style)}>
          {inputElement}
          {elementsInOrder}
      </div>
    );
  },


  isSwitched() {
    return React.findDOMNode(this.refs.checkbox).checked;
  },

  // no callback here because there is no event
  setSwitched(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      this.props.onParentShouldUpdate(newSwitchedValue);
      React.findDOMNode(this.refs.checkbox).checked = newSwitchedValue;
    }
    else if (process.env.NODE_ENV !== 'production') {
      let message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  },

  getValue() {
    return React.findDOMNode(this.refs.checkbox).value;
  },

  isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  _handleChange(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false,
    });

    let isInputChecked = React.findDOMNode(this.refs.checkbox).checked;

    if (!this.props.hasOwnProperty('checked')) {
      this.props.onParentShouldUpdate(isInputChecked);
    }
    if (this.props.onSwitch) {
      this.props.onSwitch(e, isInputChecked);
    }
  },

  // Checkbox inputs only use SPACE to change their state. Using ENTER will
  // update the ui but not the input.
  _handleWindowKeydown(e) {
    if (e.keyCode === KeyCode.TAB) {
      this._tabPressed = true;
    }
    if (e.keyCode === KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleWindowKeyup(e) {
    if (e.keyCode === KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  /**
   * Because both the ripples and the checkbox input cannot share pointer
   * events, the checkbox input takes control of pointer events and calls
   * ripple animations manually.
   */
  _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.refs.touchRipple.start(e);
    }
  },

  _handleMouseUp() {
    this.refs.touchRipple.end();
  },

  _handleMouseLeave() {
    this.refs.touchRipple.end();
  },

  _handleTouchStart(e) {
    this.refs.touchRipple.start(e);
  },

  _handleTouchEnd() {
    this.refs.touchRipple.end();
  },

  _handleBlur(e) {
    this.setState({
      isKeyboardFocused: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },

  _handleFocus(e) {
    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(() => {
      if (this._tabPressed) {
        this.setState({
          isKeyboardFocused: true,
        });
      }
    }, 150);

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },

  _handleResize() {
    this.setState({parentWidth: this.getEvenWidth()});
  },

});

module.exports = EnhancedSwitch;
