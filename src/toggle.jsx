const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const Paper = require('./paper');
const EnhancedSwitch = require('./enhanced-switch');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');

const Toggle = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    elementStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool,
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

  getInitialState() {
    return {
      switched:
        this.props.toggled ||
        this.props.defaultToggled ||
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
    return this.state.muiTheme.toggle;
  },

  getStyles() {
    let toggleSize = 20;
    let toggleTrackWidth = 36;
    let styles = {
      icon: {
        width: 36,
        padding: '4px 0px 6px 2px',
      },
      toggleElement: {
        width: toggleTrackWidth,
      },
      track: {
          transition: Transitions.easeOut(),
          width: '100%',
          height: 14,
          borderRadius: 30,
          backgroundColor: this.getTheme().trackOffColor,
      },
      thumb: {
        transition: Transitions.easeOut(),
        position: 'absolute',
        top: 1,
        left: 0,
        width: toggleSize,
        height: toggleSize,
        lineHeight: '24px',
        borderRadius: '50%',
        backgroundColor: this.getTheme().thumbOffColor,
      },
      trackWhenSwitched: {
        backgroundColor: this.getTheme().trackOnColor,
      },
      thumbWhenSwitched: {
        backgroundColor: this.getTheme().thumbOnColor,
        left: '100%',
      },
      trackWhenDisabled: {
        backgroundColor: this.getTheme().trackDisabledColor,
      },
      thumbWhenDisabled: {
        backgroundColor: this.getTheme().thumbDisabledColor,
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor,
        width: 'calc(100% - ' + (toggleTrackWidth + 10) + 'px)',
      },
    };

    return styles;
  },

  render() {
    let {
      onToggle,
      ...other,
    } = this.props;

    let styles = this.getStyles();

    let trackStyles = this.mergeStyles(
      styles.track,
      this.props.trackStyle,
      this.state.switched && styles.trackWhenSwitched,
      this.props.disabled && styles.trackWhenDisabled
    );

    let thumbStyles = this.mergeStyles(
      styles.thumb,
      this.props.thumbStyle,
      this.state.switched && styles.thumbWhenSwitched,
      this.props.disabled && styles.thumbWhenDisabled
    );

    if (this.state.switched) {
      thumbStyles.marginLeft = '-' + thumbStyles.width;
    }

    let toggleElementStyles = this.mergeStyles(styles.toggleElement, this.props.elementStyle);

    let toggleElement = (
      <div style={this.prepareStyles(toggleElementStyles)}>
        <div style={this.prepareStyles(trackStyles)} />
        <Paper style={thumbStyles} circle={true} zDepth={1} />
      </div>
    );

    let customRippleStyle = this.mergeStyles({
      top: -10,
      left: -10,
    }, this.props.rippleStyle);

    let rippleColor = this.state.switched ?
      this.getTheme().thumbOnColor : this.state.muiTheme.textColor;

    let iconStyle = this.mergeStyles(
      styles.icon,
      this.props.iconStyle
    );

    let labelStyle = this.mergeStyles(
      styles.label,
      this.props.labelStyle
    );

    let enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: toggleElement,
      rippleStyle: customRippleStyle,
      rippleColor: rippleColor,
      iconStyle: iconStyle,
      trackStyle: trackStyles,
      thumbStyle: thumbStyles,
      labelStyle: labelStyle,
      switched: this.state.switched,
      onSwitch: this._handleToggle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "left",
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return (
      <EnhancedSwitch
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  isToggled() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  _handleStateChange(newSwitched) {
    this.setState({switched: newSwitched});
  },

});

module.exports = Toggle;
