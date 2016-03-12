import React from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Transitions from './styles/transitions';
import FocusRipple from './ripples/focus-ripple';
import TouchRipple from './ripples/touch-ripple';
import Paper from './paper';
import getMuiTheme from './styles/getMuiTheme';
import warning from 'warning';

function getStyles(props, state) {
  const {
    baseTheme,
  } = state.muiTheme;

  return {
    root: {
      position: 'relative',
      cursor: props.disabled ? 'default' : 'pointer',
      overflow: 'visible',
      display: 'table',
      height: 'auto',
      width: '100%',
    },
    input: {
      position: 'absolute',
      cursor: props.disabled ? 'default' : 'pointer',
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
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    label: {
      float: 'left',
      position: 'relative',
      display: 'block',
      width: 'calc(100% - 60px)',
      lineHeight: '24px',
      color: baseTheme.palette.textColor,
      fontFamily: baseTheme.fontFamily,
    },
    wrap: {
      transition: Transitions.easeOut(),
      float: 'left',
      position: 'relative',
      display: 'block',
      width: 60 - baseTheme.spacing.desktopGutterLess,
      marginRight: (props.labelPosition === 'right') ?
        baseTheme.spacing.desktopGutterLess : 0,
      marginLeft: (props.labelPosition === 'left') ?
        baseTheme.spacing.desktopGutterLess : 0,
    },
    ripple: {
      color: props.rippleColor || baseTheme.palette.primary1Color,
      height: '200%',
      width: '200%',
      top: -12,
      left: -12,
    },
  };
}

const EnhancedSwitch = React.createClass({

  propTypes: {
    checked: React.PropTypes.bool,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    defaultSwitched: React.PropTypes.bool,
    disableFocusRipple: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    iconStyle: React.PropTypes.object,
    inputStyle: React.PropTypes.object,
    inputType: React.PropTypes.string.isRequired,
    label: React.PropTypes.node,
    labelPosition: React.PropTypes.oneOf(['left', 'right']),
    labelStyle: React.PropTypes.object,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onParentShouldUpdate: React.PropTypes.func.isRequired,
    onSwitch: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    rippleColor: React.PropTypes.string,
    rippleStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    switchElement: React.PropTypes.element.isRequired,
    switched: React.PropTypes.bool.isRequired,
    thumbStyle: React.PropTypes.object,
    trackStyle: React.PropTypes.object,
    value: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      isKeyboardFocused: false,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    const inputNode = this.refs.checkbox;
    if (!this.props.switched || inputNode.checked !== this.props.switched) {
      this.props.onParentShouldUpdate(inputNode.checked);
    }
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const hasCheckedProp = nextProps.hasOwnProperty('checked');
    const hasToggledProp = nextProps.hasOwnProperty('toggled');
    const hasNewDefaultProp =
      (nextProps.hasOwnProperty('defaultSwitched') &&
      (nextProps.defaultSwitched !== this.props.defaultSwitched));

    const newState = {
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    };

    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasToggledProp) {
      newState.switched = nextProps.toggled;
    } else if (hasNewDefaultProp) {
      newState.switched = nextProps.defaultSwitched;
    }

    if (newState.switched !== undefined && (newState.switched !== this.props.switched)) {
      this.props.onParentShouldUpdate(newState.switched);
    }

    this.setState(newState);
  },

  isSwitched() {
    return this.refs.checkbox.checked;
  },

  // no callback here because there is no event
  setSwitched(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      this.props.onParentShouldUpdate(newSwitchedValue);
      this.refs.checkbox.checked = newSwitchedValue;
    } else {
      warning(false, 'Cannot call set method while checked is defined as a property.');
    }
  },

  getValue() {
    return this.refs.checkbox.value;
  },

  _handleChange(event) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false,
    });

    const isInputChecked = this.refs.checkbox.checked;

    if (!this.props.hasOwnProperty('checked')) {
      this.props.onParentShouldUpdate(isInputChecked);
    }
    if (this.props.onSwitch) {
      this.props.onSwitch(event, isInputChecked);
    }
  },

  // Checkbox inputs only use SPACE to change their state. Using ENTER will
  // update the ui but not the input.
  _handleWindowKeydown(event) {
    if (keycode(event) === 'tab') {
      this._tabPressed = true;
    }
    if (keycode(event) === 'space' && this.state.isKeyboardFocused) {
      this._handleChange(event);
    }
  },

  _handleWindowKeyup(event) {
    if (keycode(event) === 'space' && this.state.isKeyboardFocused) {
      this._handleChange(event);
    }
  },

  /**
   * Because both the ripples and the checkbox input cannot share pointer
   * events, the checkbox input takes control of pointer events and calls
   * ripple animations manually.
   */
  _handleMouseDown(event) {
    //only listen to left clicks
    if (event.button === 0) {
      this.refs.touchRipple.start(event);
    }
  },

  _handleMouseUp() {
    this.refs.touchRipple.end();
  },

  _handleMouseLeave() {
    this.refs.touchRipple.end();
  },

  _handleTouchStart(event) {
    this.refs.touchRipple.start(event);
  },

  _handleTouchEnd() {
    this.refs.touchRipple.end();
  },

  _handleBlur(event) {
    this.setState({
      isKeyboardFocused: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  },

  _handleFocus(event) {
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
      this.props.onFocus(event);
    }
  },

  render() {
    const {
      name,
      value,
      iconStyle,
      inputStyle,
      inputType,
      label,
      labelStyle,
      labelPosition,
      onSwitch,
      defaultSwitched,
      onBlur,
      onFocus,
      onMouseUp,
      onMouseDown,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      disabled,
      disableTouchRipple,
      disableFocusRipple,
      className,
      rippleStyle,
      style,
      switchElement,
      thumbStyle,
      trackStyle,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const wrapStyles = Object.assign(styles.wrap, iconStyle);
    const mergedRippleStyle = Object.assign(styles.ripple, rippleStyle);

    if (thumbStyle) {
      wrapStyles.marginLeft /= 2;
      wrapStyles.marginRight /= 2;
    }

    const labelElement = label && (
      <label style={prepareStyles(Object.assign(styles.label, labelStyle))}>
        {label}
      </label>
    );

    const showTouchRipple = !disabled && !disableTouchRipple;
    const showFocusRipple = !disabled && !disableFocusRipple;

    const touchRipple = (
      <TouchRipple
        ref="touchRipple"
        key="touchRipple"
        style={mergedRippleStyle}
        color={mergedRippleStyle.color}
        muiTheme={this.state.muiTheme}
        centerRipple={true}
      />
    );

    const focusRipple = (
      <FocusRipple
        key="focusRipple"
        innerStyle={mergedRippleStyle}
        color={mergedRippleStyle.color}
        muiTheme={this.state.muiTheme}
        show={this.state.isKeyboardFocused}
      />
    );

    const ripples = [
      showTouchRipple ? touchRipple : null,
      showFocusRipple ? focusRipple : null,
    ];

    const inputElement = (
      <input
        {...other}
        ref="checkbox"
        type={inputType}
        style={prepareStyles(Object.assign(styles.input, inputStyle))}
        name={name}
        value={value}
        defaultChecked={defaultSwitched}
        disabled={disabled}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onChange={this._handleChange}
        onMouseUp={showTouchRipple && this._handleMouseUp}
        onMouseDown={showTouchRipple && this._handleMouseDown}
        onMouseLeave={showTouchRipple && this._handleMouseLeave}
        onTouchStart={showTouchRipple && this._handleTouchStart}
        onTouchEnd={showTouchRipple && this._handleTouchEnd}
      />
    );

    // If toggle component (indicated by whether the style includes thumb) manually lay out
    // elements in order to nest ripple elements
    const switchOrThumbElement = !thumbStyle ? (
      <div style={prepareStyles(wrapStyles)}>
        {switchElement}
        {ripples}
      </div>
    ) : (
      <div style={prepareStyles(wrapStyles)}>
        <div style={prepareStyles(Object.assign({}, trackStyle))} />
        <Paper style={thumbStyle} zDepth={1} circle={true}> {ripples} </Paper>
      </div>
    );

    const elementsInOrder = labelPosition === 'right' ? (
      <div style={styles.controls}>
        {switchOrThumbElement}
        {labelElement}
      </div>
    ) : (
      <div style={styles.controls}>
        {labelElement}
        {switchOrThumbElement}
      </div>
    );

    return (
      <div ref="root" className={className} style={prepareStyles(Object.assign(styles.root, style))}>
        <EventListener
          elementName="window"
          onKeyDown={this._handleWindowKeydown}
          onKeyUp={this._handleWindowKeyup}
        />
        {inputElement}
        {elementsInOrder}
      </div>
    );
  },

});

export default EnhancedSwitch;
