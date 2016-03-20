import React from 'react';
import transitions from '../styles/transitions';
import Paper from '../Paper';
import EnhancedSwitch from '../internal/EnhancedSwitch';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    disabled,
  } = props;

  const {
    baseTheme,
    toggle,
  } = state.muiTheme;

  const toggleSize = 20;
  const toggleTrackWidth = 36;
  const styles = {
    icon: {
      width: 36,
      padding: '4px 0px 6px 2px',
    },
    ripple: {
      top: -10,
      left: -10,
      color: state.switched ? toggle.thumbOnColor : baseTheme.palette.textColor,
    },
    toggleElement: {
      width: toggleTrackWidth,
    },
    track: {
      transition: transitions.easeOut(),
      width: '100%',
      height: 14,
      borderRadius: 30,
      backgroundColor: toggle.trackOffColor,
    },
    thumb: {
      transition: transitions.easeOut(),
      position: 'absolute',
      top: 1,
      left: 0,
      width: toggleSize,
      height: toggleSize,
      lineHeight: '24px',
      borderRadius: '50%',
      backgroundColor: toggle.thumbOffColor,
    },
    trackWhenSwitched: {
      backgroundColor: toggle.trackOnColor,
    },
    thumbWhenSwitched: {
      backgroundColor: toggle.thumbOnColor,
      left: '100%',
    },
    trackWhenDisabled: {
      backgroundColor: toggle.trackDisabledColor,
    },
    thumbWhenDisabled: {
      backgroundColor: toggle.thumbDisabledColor,
    },
    label: {
      color: disabled ? toggle.labelDisabledColor : toggle.labelColor,
      width: `calc(100% - ${(toggleTrackWidth + 10)}px)`,
    },
  };

  return styles;
}

const Toggle = React.createClass({

  propTypes: {
    /**
     * Determines whether the Toggle is initially turned on.
     */
    defaultToggled: React.PropTypes.bool,

    /**
     * Will disable the toggle if true.
     */
    disabled: React.PropTypes.bool,

    /**
     * Overrides the inline-styles of the Toggle element.
     */
    elementStyle: React.PropTypes.object,

    /**
     * Overrides the inline-styles of the Icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Overrides the inline-styles of the input element.
     */
    inputStyle: React.PropTypes.object,

    /**
     * Where the label will be placed next to the toggle.
     */
    labelPosition: React.PropTypes.oneOf(['left', 'right']),

    /**
     * Overrides the inline-styles of the Toggle element label.
     */
    labelStyle: React.PropTypes.object,

    /**
     * Callback function that is fired when the toggle switch is toggled.
     */
    onToggle: React.PropTypes.func,

    /**
     * Override style of ripple.
     */
    rippleStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Override style for thumb.
     */
    thumbStyle: React.PropTypes.object,

    /**
     * Toggled if set to true.
     */
    toggled: React.PropTypes.bool,

    /**
     * Override style for track.
     */
    trackStyle: React.PropTypes.object,

    /**
     * ValueLink prop for when using controlled toggle.
     */
    valueLink: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      defaultToggled: false,
      disabled: false,
      labelPosition: 'left',
    };
  },

  getInitialState() {
    return {
      switched:
        this.props.toggled ||
        this.props.defaultToggled ||
        (this.props.valueLink && this.props.valueLink.value) ||
        false,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  isToggled() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle(event, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(event, isInputChecked);
  },

  _handleStateChange(newSwitched) {
    this.setState({switched: newSwitched});
  },

  render() {
    const {
      onToggle,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const trackStyles = Object.assign({},
      styles.track,
      this.props.trackStyle,
      this.state.switched && styles.trackWhenSwitched,
      this.props.disabled && styles.trackWhenDisabled
    );

    const thumbStyles = Object.assign({},
      styles.thumb,
      this.props.thumbStyle,
      this.state.switched && styles.thumbWhenSwitched,
      this.props.disabled && styles.thumbWhenDisabled
    );

    if (this.state.switched) {
      thumbStyles.marginLeft = `-${thumbStyles.width}`;
    }

    const toggleElementStyles = Object.assign({},
      styles.toggleElement,
      this.props.elementStyle
    );

    const toggleElement = (
      <div style={prepareStyles(Object.assign({}, toggleElementStyles))}>
        <div style={prepareStyles(Object.assign({}, trackStyles))} />
        <Paper style={thumbStyles} circle={true} zDepth={1} />
      </div>
    );

    const rippleStyle = Object.assign({},
      styles.ripple,
      this.props.rippleStyle
    );

    const iconStyle = Object.assign({},
      styles.icon,
      this.props.iconStyle
    );

    const labelStyle = Object.assign({},
      styles.label,
      this.props.labelStyle
    );

    const enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'checkbox',
      switchElement: toggleElement,
      rippleStyle: rippleStyle,
      rippleColor: rippleStyle.color,
      iconStyle: iconStyle,
      trackStyle: trackStyles,
      thumbStyle: thumbStyles,
      labelStyle: labelStyle,
      switched: this.state.switched,
      onSwitch: this._handleToggle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: this.props.labelPosition,
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return (
      <EnhancedSwitch
        {...other}
        {...enhancedSwitchProps}
      />
    );
  },

});

export default Toggle;
