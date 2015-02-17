var React = require('react');
var EnhancedSwitch = require('./enhanced-switch');
var StylePropable = require('./mixins/style-propable.js');
var Transitions = require('./styles/mixins/transitions.js');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked');
var CustomVariables = require('./styles/variables/custom-variables.js');

var Checkbox = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    onCheck: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      switched: 
        this.props.checked ||
        this.props.defaultChecked || 
        (this.props.valueLink && this.props.valueLink.value) || 
        false,
    }
  },

  render: function() {
    var {
      onCheck,
      ...other
    } = this.props;

    var checkboxSize = 24;

    var iconStyles = {
        height: checkboxSize,
        width: checkboxSize,
    }

    var checkStyles = {
        positiion: 'absolute',
        opacity: 0,
        transform: 'scale(0)',
        transitionOrigin: '50% 50%',
        transition: Transitions.easeOut('450ms', 'opacity', '0ms') + ', ' + 
                    Transitions.easeOut('0ms', 'transform', '450ms'),
        fill: CustomVariables.checkboxCheckedColor   
    }

    var boxStyles = {
        position: 'absolute',
        opacity: 1,
        fill: CustomVariables.checkboxBoxColor,          
        transition: Transitions.easeOut('2s', null, '200ms') 
    }

    if (this.state.switched) {
      checkStyles = this.mergeStyles(checkStyles, {
          opacity: 1,
          transform: 'scale(1)',
          transition: Transitions.easeOut('0ms', 'opacity', '0ms') + ', ' + 
                      Transitions.easeOut('800ms', 'transform', '0ms')
        });
      boxStyles = this.mergeStyles(boxStyles, {
          transition: Transitions.easeOut('100ms', null, '0ms'),
          fill: CustomVariables.checkboxCheckedColor
        });
    }

    if (this.props.disabled) {
      checkStyles = this.mergeStyles(checkStyles, {
          opacity: 0.3,
          fill: CustomVariables.disabledColor,
        });
      boxStyles = this.mergeStyles(boxStyles, {
          opacity: 0.3,
          fill: CustomVariables.disabledColor,
        });
    }

    if (this.state.switched && this.props.disabled) boxStyles.opacity = 0;

    var checkboxElement = (
      <div>
        <CheckboxOutline style={boxStyles} />
        <CheckboxChecked style={checkStyles} />
      </div>
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switched: this.state.switched,
      switchElement: checkboxElement,
      iconStyle: iconStyles,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultChecked,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck: function(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },

  _handleStateChange: function(newSwitched) {
    this.setState({switched: newSwitched});
  }

});

module.exports = Checkbox;
