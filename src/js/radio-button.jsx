var React = require('react');
var Paper = require('./paper.jsx');
var Classable = require('./mixins/classable.js');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off.jsx');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on.jsx');

var RadioButton = React.createClass({

  mixins: [Classable],

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
    var hasCheckedProperty = nextProps.hasOwnProperty('checked');
    var hasDifferentDefaultProperty = 
      (nextProps.hasOwnProperty('defaultChecked') && 
      (nextProps.defaultChecked != this.props.defaultChecked));

    if (hasCheckedProperty) {
      this.setState({switched: nextProps.checked});
    } else if (hasDifferentDefaultProperty) {
      this.setState({switched: nextProps.defaultChecked});
    } 
  },

  render: function() {
    var {
      onCheck,
      ...other
    } = this.props;

    var classes = this.getClasses("mui-switch-radio-button", {
      'mui-is-switched': this.state.switched,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });


    var labelElement = this.props.label ? (
      <label className="mui-switch-label" htmlFor={this.props.id}>
        {this.props.label}
      </label>
    ) : null;

    return (
      <div className="mui-switch-wrap">

        <EnhancedSwitch 
          {...other}
          ref="enhancedSwitch"
          inputType="radio"
          className="mui-switch-radio-button"
          onSwitch={this._onCheck}
          defaultSwitched={this.props.defaultChecked} />

        <div className="mui-switch">

          <div className={classes}>
            <RadioButtonOff className="mui-radio-button-target" />
            <RadioButtonOn className="mui-radio-button-fill" />
          </div>
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
  }

});

module.exports = RadioButton;
