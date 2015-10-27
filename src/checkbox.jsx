const React = require('react');
const EnhancedSwitch = require('./enhanced-switch');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const CheckboxOutline = require('./svg-icons/toggle/check-box-outline-blank');
const CheckboxChecked = require('./svg-icons/toggle/check-box');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');


const Checkbox = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    checked: React.PropTypes.bool,
    checkedIcon: React.PropTypes.element,
    defaultChecked: React.PropTypes.bool,
    iconStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func,
    unCheckedIcon: React.PropTypes.element,
  },

  getInitialState() {
    return {
      switched:
        this.props.checked ||
        this.props.defaultChecked ||
        (this.props.valueLink && this.props.valueLink.value) ||
        false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switched: this.state.switched,
      switchElement: checkboxElement,
      rippleColor: rippleColor,
      iconStyle: mergedIconStyle,
      onSwitch: this._handleCheck,
      labelStyle: labelStyle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultChecked,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right",
    };

    return (
      <EnhancedSwitch
        {...other}
        {...enhancedSwitchProps}/>
    );
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

});

module.exports = Checkbox;
