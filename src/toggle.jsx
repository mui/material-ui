var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Paper = require('./paper');
var EnhancedSwitch = require('./enhanced-switch');

var Toggle = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      switched: 
        this.props.toggled ||
        this.props.defaultToggled || 
        (this.props.valueLink && this.props.valueLink.value) || 
        false,
    }
  },

  getTheme: function() {
    return this.context.theme.component.toggle;
  },

  render: function() {
    var {
      onToggle,
      ...other
    } = this.props;

    var toggleSize = 20;
    var toggleTrackWidth = 36;
    var iconStyles = {
        padding: '4px 0px 6px 2px'
    };
    var trackStyles = {
        transition: Transitions.easeOut(),
        width: toggleTrackWidth,
        height: 14,
        borderRadius: 30,
        backgroundColor: this.props.disabled ? this.getTheme().trackDisabledColor :
                         this.state.switched ? this.getTheme().trackOnColor : 
                         this.getTheme().trackOffColor
    };
    var thumbStyles = {
        transition: Transitions.easeOut(),
        position: 'absolute',
        top: 1,
        left: this.state.switched ? 18 : 2,
        width: toggleSize,
        height: toggleSize,
        lineHeight: '24px',
        borderRadius: '50%',
        backgroundColor: this.props.disabled ? this.getTheme().thumbDisabledColor :
                         this.state.switched ? this.getTheme().thumbOnColor : 
                         this.getTheme().thumbOffColor
    };

    if (this.state.switched) {
      trackStyles.backgroundColor = this.getTheme().trackOnColor;
      thumbStyles.backgroundColor = this.getTheme().thumbOnColor;
      thumbStyles.left = 18;
    }

    if (this.props.disabled) {
      trackStyles.backgroundColor = this.getTheme().trackDisabledColor;
      thumbStyles.backgroundColor = this.getTheme().thumbDisabledColor;
    }

    var toggleElement = (
      <div>
        <div style={trackStyles} />
        <Paper style={thumbStyles} circle={true} zDepth={1} />
      </div>
    );

    var customRippleStyle = {
      top: '-10',
      left: '-10'
    };

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: toggleElement,
      className: "mui-toggle",
      rippleStyle: customRippleStyle,
      iconStyle: iconStyles,
      trackStyle: trackStyles,
      thumbStyle: thumbStyles,
      switched: this.state.switched,
      onSwitch: this._handleToggle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "left"
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  isToggled: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  _handleStateChange: function(newSwitched) {
    this.setState({switched: newSwitched});
  }

});

module.exports = Toggle;
