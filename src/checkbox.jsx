import React from 'react';
import EnhancedSwitch from './enhanced-switch';
import Transitions from './styles/transitions';
import CheckboxOutline from './svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from './svg-icons/toggle/check-box';
import getMuiTheme from './styles/getMuiTheme';
import deprecated from './utils/deprecatedPropType';

function getStyles(props, state) {
  const {
    checkbox,
  } = state.muiTheme;

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
      transition: `${Transitions.easeOut('450ms', 'opacity', '0ms')}, ${
          Transitions.easeOut('0ms', 'transform', '450ms')
        }`,
      fill: checkbox.checkedColor,
    },
    box: {
      position: 'absolute',
      opacity: 1,
      fill: checkbox.boxColor,
      transition: Transitions.easeOut('2s', null, '200ms'),
    },
    checkWhenSwitched: {
      opacity: 1,
      transform: 'scale(1)',
      transition: `${Transitions.easeOut('0ms', 'opacity', '0ms')}, ${
          Transitions.easeOut('800ms', 'transform', '0ms')
        }`,
    },
    boxWhenSwitched: {
      transition: Transitions.easeOut('100ms', null, '0ms'),
      fill: checkbox.checkedColor,
    },
    checkWhenDisabled: {
      fill: checkbox.disabledColor,
    },
    boxWhenDisabled: {
      fill: props.checked ? 'transparent' : checkbox.disabledColor,
    },
    label: {
      color: props.disabled ? checkbox.labelDisabledColor : checkbox.labelColor,
    },
  };
}

const Checkbox = React.createClass({

  propTypes: {
    /**
     * Checkbox is checked if true.
     */
    checked: React.PropTypes.bool,

    /**
     * The SvgIcon to use for the checked state.
     * This is useful to create icon toggles.
     */
    checkedIcon: React.PropTypes.element,

    /**
     * The default state of our checkbox component.
     */
    defaultChecked: React.PropTypes.bool,

    /**
     * Disabled if true.
     */
    disabled: React.PropTypes.bool,

    /**
     * Overrides the inline-styles of the icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Overrides the inline-styles of the input element.
     */
    inputStyle: React.PropTypes.object,

    /**
     * Where the label will be placed next to the checkbox.
     */
    labelPosition: React.PropTypes.oneOf(['left', 'right']),

    /**
     * Overrides the inline-styles of the Checkbox element label.
     */
    labelStyle: React.PropTypes.object,

    /**
     * Callback function that is fired when the checkbox is checked.
     *
     * @param {object} event `change` event targeting the underlying checkbox `input`.
     * @param {boolean} isInputChecked The `checked` value of the underlying checkbox `input`.
     */
    onCheck: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The SvgIcon to use for the unchecked state.
     * This is useful to create icon toggles.
     */
    unCheckedIcon: deprecated(React.PropTypes.element,
      'Use uncheckedIcon instead.'),

    /**
     * The SvgIcon to use for the unchecked state.
     * This is useful to create icon toggles.
     */
    uncheckedIcon: React.PropTypes.element,

    /**
     * ValueLink for when using controlled checkbox.
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
      defaultChecked: false,
      labelPosition: 'right',
      disabled: false,
    };
  },

  getInitialState() {
    return {
      switched:
        this.props.checked ||
        this.props.defaultChecked ||
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
      switched: this.props.checked !== nextProps.checked ?
        nextProps.checked :
        this.state.switched,
    });
  },

  isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck(event, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(event, isInputChecked);
  },

  _handleStateChange(newSwitched) {
    this.setState({switched: newSwitched});
  },

  render() {
    const {
      iconStyle,
      onCheck,
      checkedIcon,
      uncheckedIcon,
      unCheckedIcon,
      ...other,
    } = this.props;
    const styles = getStyles(this.props, this.state);
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

    const unCheckedElement = (unCheckedIcon || uncheckedIcon) ? React.cloneElement((unCheckedIcon || uncheckedIcon), {
      style: Object.assign(boxStyles, (unCheckedIcon || uncheckedIcon).props.style),
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
      onSwitch: this._handleCheck,
      labelStyle: labelStyle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultChecked,
      labelPosition: this.props.labelPosition,
    };

    return (
      <EnhancedSwitch
        {...other}
        {...enhancedSwitchProps}
      />
    );
  },
});

export default Checkbox;
