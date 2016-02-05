import React from 'react';
import EnhancedSwitch from './enhanced-switch';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import CheckboxOutline from './svg-icons/toggle/check-box-outline-blank';
import CheckboxChecked from './svg-icons/toggle/check-box';
import getMuiTheme from './styles/getMuiTheme';

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
     * Where the label will be placed next to the checkbox.
     */
    labelPosition: React.PropTypes.oneOf(['left', 'right']),

    /**
     * Overrides the inline-styles of the Checkbox element label.
     */
    labelStyle: React.PropTypes.object,

    /**
     * Callback function that is fired when the checkbox is checked.
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
    unCheckedIcon: React.PropTypes.element,

    /**
     * ValueLink for when using controlled checkbox.
     */
    valueLink: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
      switched: this.props.checked !== nextProps.checked
        ? nextProps.checked
        : this.state.switched,
    });
  },

  getTheme() {
    return this.state.muiTheme.checkbox;
  },

  getStyles() {
    let checkboxSize = 24;
    let styles = {
      icon: {
        height: checkboxSize,
        width: checkboxSize,
      },
      check: {
        position: 'absolute',
        opacity: 0,
        transform: 'scale(0)',
        transitionOrigin: '50% 50%',
        transition: Transitions.easeOut('450ms', 'opacity', '0ms') + ', ' +
                      Transitions.easeOut('0ms', 'transform', '450ms'),
        fill: this.getTheme().checkedColor,
      },
      box: {
        position: 'absolute',
        opacity: 1,
        fill: this.getTheme().boxColor,
        transition: Transitions.easeOut('2s', null, '200ms'),
      },
      checkWhenSwitched: {
        opacity: 1,
        transform: 'scale(1)',
        transition: Transitions.easeOut('0ms', 'opacity', '0ms') + ', ' +
                    Transitions.easeOut('800ms', 'transform', '0ms'),
      },
      boxWhenSwitched: {
        transition: Transitions.easeOut('100ms', null, '0ms'),
        fill: this.getTheme().checkedColor,
      },
      checkWhenDisabled: {
        fill: this.getTheme().disabledColor,
      },
      boxWhenDisabled: {
        fill: this.getTheme().disabledColor,
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor,
      },
    };

    return styles;
  },

  isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },

  _handleStateChange(newSwitched) {
    this.setState({switched: newSwitched});
  },

  render() {
    let {
      iconStyle,
      onCheck,
      checkedIcon,
      unCheckedIcon,
      ...other,
    } = this.props;
    let styles = this.getStyles();
    let boxStyles =
      this.mergeStyles(
        styles.box,
        this.state.switched && styles.boxWhenSwitched,
        iconStyle,
        this.props.disabled && styles.boxWhenDisabled);
    let checkStyles =
      this.mergeStyles(
        styles.check,
        this.state.switched && styles.checkWhenSwitched,
        iconStyle,
        this.props.disabled && styles.checkWhenDisabled);

    let checkedElement = checkedIcon ? React.cloneElement(checkedIcon, {
      style: this.mergeStyles(checkStyles, checkedIcon.props.style),
    }) : React.createElement(CheckboxChecked, {
      style: checkStyles,
    });

    let unCheckedElement = unCheckedIcon ? React.cloneElement(unCheckedIcon, {
      style: this.mergeStyles(boxStyles, unCheckedIcon.props.style),
    }) : React.createElement(CheckboxOutline, {
      style: boxStyles,
    });

    let checkboxElement = (
      <div>
        {unCheckedElement}
        {checkedElement}
      </div>
    );

    let rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;
    let mergedIconStyle = this.mergeStyles(styles.icon, iconStyle);

    let labelStyle = this.mergeStyles(
      styles.label,
      this.props.labelStyle
    );

    let enhancedSwitchProps = {
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
