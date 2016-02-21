import React from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Transitions from './styles/transitions';
import UniqueId from './utils/unique-id';
import ClearFix from './clearfix';
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
    id: React.PropTypes.string,
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
    required: React.PropTypes.bool,
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
      parentWidth: 100,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    const inputNode = ReactDOM.findDOMNode(this.refs.checkbox);
    if (!this.props.switched || inputNode.checked !== this.props.switched) {
      this.props.onParentShouldUpdate(inputNode.checked);
    }

    this._handleResize();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
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
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.switched = nextProps.defaultSwitched;
    }

    if (newState.switched !== undefined && (newState.switched !== this.props.switched)) {
      this.props.onParentShouldUpdate(newState.switched);
    }

    this.setState(newState);
  },

  getEvenWidth() {
    return (
      parseInt(window
        .getComputedStyle(ReactDOM.findDOMNode(this.refs.root))
        .getPropertyValue('width'), 10)
    );
  },

  isSwitched() {
    return ReactDOM.findDOMNode(this.refs.checkbox).checked;
  },

  // no callback here because there is no event
  setSwitched(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      this.props.onParentShouldUpdate(newSwitchedValue);
      ReactDOM.findDOMNode(this.refs.checkbox).checked = newSwitchedValue;
    } else {
      warning(false, 'Cannot call set method while checked is defined as a property.');
    }
  },

  getValue() {
    return ReactDOM.findDOMNode(this.refs.checkbox).value;
  },

  isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  _handleChange(event) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false,
    });

    const isInputChecked = ReactDOM.findDOMNode(this.refs.checkbox).checked;

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

  _handleResize() {
    this.setState({parentWidth: this.getEvenWidth()});
  },

  render() {
    const {
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

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const wrapStyles = Object.assign(styles.wrap, this.props.iconStyle);
    const rippleStyle = Object.assign(styles.ripple, this.props.rippleStyle);

    if (this.props.thumbStyle) {
      wrapStyles.marginLeft /= 2;
      wrapStyles.marginRight /= 2;
    }

    const inputId = this.props.id || UniqueId.generate();

    const labelStyle = Object.assign(styles.label, this.props.labelStyle);
    const labelElement = this.props.label ? (
      <label style={prepareStyles(labelStyle)} htmlFor={inputId}>
        {this.props.label}
      </label>
    ) : null;

    const inputProps = {
      ref: 'checkbox',
      type: this.props.inputType,
      style: prepareStyles(Object.assign(styles.input, this.props.inputStyle)),
      name: this.props.name,
      value: this.props.value,
      defaultChecked: this.props.defaultSwitched,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
    };

    const hideTouchRipple = this.props.disabled || disableTouchRipple;

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

    const inputElement = (
      <input
        {...other}
        {...inputProps}
      />
    );

    const touchRipple = (
      <TouchRipple
        ref="touchRipple"
        key="touchRipple"
        style={rippleStyle}
        color={rippleStyle.color}
        muiTheme={this.state.muiTheme}
        centerRipple={true}
      />
    );

    const focusRipple = (
      <FocusRipple
        key="focusRipple"
        innerStyle={rippleStyle}
        color={rippleStyle.color}
        muiTheme={this.state.muiTheme}
        show={this.state.isKeyboardFocused}
      />
    );

    const ripples = [
      hideTouchRipple ? null : touchRipple,
      this.props.disabled || disableFocusRipple ? null : focusRipple,
    ];

    // If toggle component (indicated by whether the style includes thumb) manually lay out
    // elements in order to nest ripple elements
    const switchElement = !this.props.thumbStyle ? (
      <div style={prepareStyles(wrapStyles)}>
        {this.props.switchElement}
        {ripples}
      </div>
    ) : (
      <div style={prepareStyles(wrapStyles)}>
        <div style={prepareStyles(Object.assign({}, this.props.trackStyle))} />
        <Paper style={this.props.thumbStyle} zDepth={1} circle={true}> {ripples} </Paper>
      </div>
    );

    const labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    const elementsInOrder = (labelPositionExist &&
      (this.props.labelPosition.toUpperCase() === 'RIGHT')) ? (
      <ClearFix style={styles.controls}>
        {switchElement}
        {labelElement}
      </ClearFix>
    ) : (
      <ClearFix style={styles.controls}>
        {labelElement}
        {switchElement}
      </ClearFix>
    );

    return (
      <div ref="root" className={className} style={prepareStyles(Object.assign(styles.root, this.props.style))}>
        <EventListener
          elementName="window"
          onKeyDown={this._handleWindowKeydown}
          onKeyUp={this._handleWindowKeyup}
          onResize={this._handleResize}
        />
        {inputElement}
        {elementsInOrder}
      </div>
    );
  },

});

export default EnhancedSwitch;
