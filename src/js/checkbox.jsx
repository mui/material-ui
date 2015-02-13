var React = require('react');
var EnhancedSwitch = require('./enhanced-switch');
var Classable = require('./mixins/classable');
var StylePropable = require('./mixins/style-propable.js');
var Transitions = require('./styles/mixins/transitions.js');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked');
var CustomVariables = require('./styles/custom-variables.js');

var Checkbox = React.createClass({

  mixins: [Classable],

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
    var styles = {
      checkboxIcon: {
        height: checkboxSize,
        width: checkboxSize,
        marginRight: CustomVariables.desktopGutterMini,
      },
      check: {
        positiion: 'absolute',
        opacity: this.props.disabled ? 0.3 :
                 this.state.switched ? 1 : 0,
        transform: this.state.switched ? 'scale(1)' : 'scale(0)',
        transitionOrigin: '50% 50%',
        //transition: Transitions.easeOut(),
        fill: !this.props.disabled ? CustomVariables.checkboxCheckedColor : CustomVariables.disabledColor
      },
      box: {
        position: 'absolute',
        opacity: this.props.disabled ? 0.3 : 1,
        fill: this.props.disabled ? CustomVariables.disabledColor : CustomVariables.checkboxCheckedColor
      }
    };

    var classes = this.getClasses("mui-checkbox");

    var checkboxElement = (
      <div>
        <CheckboxOutline style={styles.box} />
        <CheckboxChecked style={styles.check} />
      </div>
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switched: this.state.switched,
      switchElement: checkboxElement,
      className: classes,
      iconClassName: "mui-checkbox-icon",
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
