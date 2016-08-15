import React, {Component, PropTypes} from 'react';
import EnhancedSwitch from '../internal/EnhancedSwitch';
import transitions from '../styles/transitions';
import CheckboxOutline from '../svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from '../svg-icons/toggle/check-box';

function getStyles(props, context) {
  const {checkbox} = context.muiTheme;
  const checkboxSize = 24;

  return {
    icon: {
      height: checkboxSize,
      width: checkboxSize,
    },
    check: {
      position: 'absolute',
      opacity: 0,
      transform: 'scale(0)',
      transitionOrigin: '50% 50%',
      transition: `${transitions.easeOut('450ms', 'opacity', '0ms')}, ${
          transitions.easeOut('0ms', 'transform', '450ms')
        }`,
      fill: checkbox.checkedColor,
    },
    box: {
      position: 'absolute',
      opacity: 1,
      fill: checkbox.boxColor,
      transition: transitions.easeOut('2s', null, '200ms'),
    },
    checkWhenSwitched: {
      opacity: 1,
      transform: 'scale(1)',
      transition: `${transitions.easeOut('0ms', 'opacity', '0ms')}, ${
          transitions.easeOut('800ms', 'transform', '0ms')
        }`,
    },
    boxWhenSwitched: {
      transition: transitions.easeOut('100ms', null, '0ms'),
      fill: checkbox.checkedColor,
    },
    checkWhenDisabled: {
      fill: checkbox.disabledColor,
      cursor: 'not-allowed',
    },
    boxWhenDisabled: {
      fill: props.checked ? 'transparent' : checkbox.disabledColor,
      cursor: 'not-allowed',
    },
    label: {
      color: props.disabled ? checkbox.labelDisabledColor : checkbox.labelColor,
    },
  };
}

class Checkbox extends Component {
  static propTypes = {
    /**
     * Checkbox is checked if true.
     */
    checked: PropTypes.bool,
    /**
     * The SvgIcon to use for the checked state.
     * This is useful to create icon toggles.
     */
    checkedIcon: PropTypes.element,
    /**
     * The default state of our checkbox component.
     * **Warning:** This cannot be used in conjunction with `checked`.
     * Decide between using a controlled or uncontrolled input element and remove one of these props.
     * More info: https://fb.me/react-controlled-components
     */
    defaultChecked: PropTypes.bool,
    /**
     * Disabled if true.
     */
    disabled: PropTypes.bool,
    /**
     * Overrides the inline-styles of the icon element.
     */
    iconStyle: PropTypes.object,
    /**
     * Overrides the inline-styles of the input element.
     */
    inputStyle: PropTypes.object,
    /**
     * Where the label will be placed next to the checkbox.
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * Overrides the inline-styles of the Checkbox element label.
     */
    labelStyle: PropTypes.object,
    /**
     * Callback function that is fired when the checkbox is checked.
     *
     * @param {object} event `change` event targeting the underlying checkbox `input`.
     * @param {boolean} isInputChecked The `checked` value of the underlying checkbox `input`.
     */
    onCheck: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The SvgIcon to use for the unchecked state.
     * This is useful to create icon toggles.
     */
    uncheckedIcon: PropTypes.element,
    /**
     * ValueLink for when using controlled checkbox.
     */
    valueLink: PropTypes.object,
  };

  static defaultProps = {
    labelPosition: 'right',
    disabled: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    switched: false,
  };

  componentWillMount() {
    const {checked, defaultChecked, valueLink} = this.props;

    if (checked || defaultChecked || (valueLink && valueLink.value)) {
      this.setState({
        switched: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({
        switched: nextProps.checked,
      });
    }
  }

  isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  }

  setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  }

  handleStateChange = (newSwitched) => {
    this.setState({
      switched: newSwitched,
    });
  };

  handleCheck = (event, isInputChecked) => {
    if (this.props.onCheck) {
      this.props.onCheck(event, isInputChecked);
    }
  };

  render() {
    const {
      iconStyle,
      onCheck, // eslint-disable-line no-unused-vars
      checkedIcon,
      uncheckedIcon,
      ...other,
    } = this.props;
    const styles = getStyles(this.props, this.context);
    const boxStyles =
      Object.assign(
        styles.box,
        this.state.switched && styles.boxWhenSwitched,
        iconStyle,
        this.props.disabled && styles.boxWhenDisabled);
    const checkStyles =
      Object.assign(
        styles.check,
        this.state.switched && styles.checkWhenSwitched,
        iconStyle,
        this.props.disabled && styles.checkWhenDisabled);

    const checkedElement = checkedIcon ? React.cloneElement(checkedIcon, {
      style: Object.assign(checkStyles, checkedIcon.props.style),
    }) : React.createElement(CheckboxChecked, {
      style: checkStyles,
    });

    const unCheckedElement = uncheckedIcon ? React.cloneElement(uncheckedIcon, {
      style: Object.assign(boxStyles, uncheckedIcon.props.style),
    }) : React.createElement(CheckboxOutline, {
      style: boxStyles,
    });

    const checkboxElement = (
      <div>
        {unCheckedElement}
        {checkedElement}
      </div>
    );

    const rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;
    const mergedIconStyle = Object.assign(styles.icon, iconStyle);

    const labelStyle = Object.assign(
      styles.label,
      this.props.labelStyle
    );

    const enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'checkbox',
      switched: this.state.switched,
      switchElement: checkboxElement,
      rippleColor: rippleColor,
      iconStyle: mergedIconStyle,
      onSwitch: this.handleCheck,
      labelStyle: labelStyle,
      onParentShouldUpdate: this.handleStateChange,
      labelPosition: this.props.labelPosition,
    };

    return (
      <EnhancedSwitch
        {...other}
        {...enhancedSwitchProps}
      />
    );
  }
}

export default Checkbox;
