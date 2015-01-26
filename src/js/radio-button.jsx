var React = require('react');
var Paper = require('./paper.jsx');
var Classable = require('./mixins/classable.js');
var DomIdable = require('./mixins/dom-idable.js');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off.jsx');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on.jsx');

var RadioButton = React.createClass({

  mixins: [Classable, DomIdable],

  propTypes: {
    id: React.PropTypes.string,
    onCheck: React.PropTypes.func,
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    labelPositionRight: React.PropTypes.bool
  },

  componentDidMount: function() {
    this.setState({switched: this.isChecked()});
  },

  getInitialState: function() {
    return {
      switched: this.props.defaultChecked || this.props.checked
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasNewDefaultProp = 
      (nextProps.hasOwnProperty('defaultChecked') && 
      (nextProps.defaultChecked != this.props.defaultChecked));
    var newState = {};


    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.switched = nextProps.defaultChecked;
    }

    if (newState) this.setState(newState);
  },

  render: function() {

    var {
      id,
      onCheck,
      ...other
    } = this.props;

    var classes = this.getClasses("mui-radio-button", {
      'mui-switch-wrap': true,
      'mui-is-switched': this.state.switched,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var inputId = this.props.id || this.getDomId();

    var labelElement = this.props.label ? (
      <label className="mui-switch-label" htmlFor={inputId}>
        {this.props.label}
      </label>
    ) : null;

    return (
      <div className={classes}>

        <EnhancedSwitch 
          {...other}
          id={inputId}
          ref="enhancedSwitch"
          inputType="radio"
          onSwitch={this._onCheck}
          defaultSwitched={this.props.defaultChecked} />

        <div className="mui-radio-button-icon mui-switch">
          <RadioButtonOff className="mui-radio-button-target" />
          <RadioButtonOn className="mui-radio-button-fill" />
        </div>

        {labelElement}

      </div> 
    );
  },

  // Only called when selected, not when unselected.
  _onCheck: function(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
    this.setState({switched: newCheckedValue});
  },
  
  getValue: function() {
    return this.refs.enhancedSwitch.getValue();
  }


});

module.exports = RadioButton;
