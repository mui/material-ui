import React, {Component} from 'react';
import PropTypes from 'prop-types';
import transitions from '../styles/transitions';
import Paper from '../Paper';
import EnhancedSwitch from '../internal/EnhancedSwitch';

function getStyles(props, context, state) {
  const {
    disabled,
    elementStyle,
    trackSwitchedStyle,
    thumbSwitchedStyle,
    trackStyle,
    thumbStyle,
    iconStyle,
    rippleStyle,
    labelStyle,
  } = props;

  const {
    baseTheme,
    toggle,
  } = context.muiTheme;

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

  Object.assign(styles.track,
    trackStyle,
    state.switched && styles.trackWhenSwitched,
    state.switched && trackSwitchedStyle,
    disabled && styles.trackWhenDisabled
  );

  Object.assign(styles.thumb,
    thumbStyle,
    state.switched && styles.thumbWhenSwitched,
    state.switched && thumbSwitchedStyle,
    disabled && styles.thumbWhenDisabled
  );

  if (state.switched) {
    styles.thumb.marginLeft = 0 - styles.thumb.width;
  }

  Object.assign(styles.icon, iconStyle);

  Object.assign(styles.ripple, rippleStyle);

  Object.assign(styles.label, labelStyle);

  Object.assign(styles.toggleElement, elementStyle);

  return styles;
}

class Toggle extends Component {
  static propTypes = {
    /**
     * Determines whether the Toggle is initially turned on.
     * **Warning:** This cannot be used in conjunction with `toggled`.
     * Decide between using a controlled or uncontrolled input element and remove one of these props.
     * More info: https://fb.me/react-controlled-components
     */
    defaultToggled: PropTypes.bool,
    /**
     * Will disable the toggle if true.
     */
    disabled: PropTypes.bool,
    /**
     * Overrides the inline-styles of the Toggle element.
     */
    elementStyle: PropTypes.object,
    /**
     * Overrides the inline-styles of the Icon element.
     */
    iconStyle: PropTypes.object,
    /**
     * Overrides the inline-styles of the input element.
     */
    inputStyle: PropTypes.object,
    /**
     * Label for toggle.
     */
    label: PropTypes.node,
    /**
     * Where the label will be placed next to the toggle.
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * Overrides the inline-styles of the Toggle element label.
     */
    labelStyle: PropTypes.object,
    /**
     * Callback function that is fired when the toggle switch is toggled.
     *
     * @param {object} event Change event targeting the toggle.
     * @param {bool} isInputChecked The new value of the toggle.
     */
    onToggle: PropTypes.func,
    /**
     * Override style of ripple.
     */
    rippleStyle: PropTypes.object,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override style for thumb.
     */
    thumbStyle: PropTypes.object,
    /**
    * Override the inline styles for thumb when the toggle switch is toggled on.
    */
    thumbSwitchedStyle: PropTypes.object,
    /**
     * Toggled if set to true.
     */
    toggled: PropTypes.bool,
    /**
     * Override style for track.
     */
    trackStyle: PropTypes.object,
    /**
    * Override the inline styles for track when the toggle switch is toggled on.
    */
    trackSwitchedStyle: PropTypes.object,
    /**
     * ValueLink prop for when using controlled toggle.
     */
    valueLink: PropTypes.object,
  };

  static defaultProps = {
    defaultToggled: false,
    disabled: false,
    labelPosition: 'left',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    switched: false,
  };

  componentWillMount() {
    const {toggled, defaultToggled, valueLink} = this.props;

    if (toggled || defaultToggled || (valueLink && valueLink.value)) {
      this.setState({
        switched: true,
      });
    }
  }

  isToggled() {
    return this.refs.enhancedSwitch.isSwitched();
  }

  setToggled(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  }

  handleStateChange = (newSwitched) => {
    this.setState({
      switched: newSwitched,
    });
  };

  handleToggle = (event, isInputChecked) => {
    if (this.props.onToggle) {
      this.props.onToggle(event, isInputChecked);
    }
  };

  render() {
    const {
      defaultToggled,
      elementStyle, // eslint-disable-line no-unused-vars
      onToggle, // eslint-disable-line no-unused-vars
      trackSwitchedStyle, // eslint-disable-line no-unused-vars
      thumbSwitchedStyle, // eslint-disable-line no-unused-vars
      toggled,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const toggleElement = (
      <div style={prepareStyles(Object.assign({}, styles.toggleElement))}>
        <div style={prepareStyles(Object.assign({}, styles.track))} />
        <Paper style={styles.thumb} circle={true} zDepth={1} />
      </div>
    );

    const enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'checkbox',
      switchElement: toggleElement,
      rippleStyle: styles.ripple,
      rippleColor: styles.ripple.color,
      iconStyle: styles.icon,
      trackStyle: styles.track,
      thumbStyle: styles.thumb,
      labelStyle: styles.label,
      switched: this.state.switched,
      onSwitch: this.handleToggle,
      onParentShouldUpdate: this.handleStateChange,
      labelPosition: this.props.labelPosition,
    };

    if (this.props.hasOwnProperty('toggled')) {
      enhancedSwitchProps.checked = toggled;
    } else if (this.props.hasOwnProperty('defaultToggled')) {
      enhancedSwitchProps.defaultChecked = defaultToggled;
    }

    return (
      <EnhancedSwitch
        {...other}
        {...enhancedSwitchProps}
      />
    );
  }
}

export default Toggle;
