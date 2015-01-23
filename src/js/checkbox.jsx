var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank.jsx');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked.jsx');

var Checkbox = React.createClass({

  mixins: [Classable],

  propTypes: {
    id: React.PropTypes.string,
    onCheck: React.PropTypes.func,
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    labelPositionRight: React.PropTypes.bool
  },

  componentDidMount: function() {
    this.setState({switched: this.refs.enhancedSwitch.isSwitched()});
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

    var classes = this.getClasses("mui-switch-wrap", {
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
      <div className={classes}>

        <EnhancedSwitch 
          {...other}
          ref="enhancedSwitch"
          inputType="checkbox"
          onSwitch={this._onCheck}
          defaultSwitched={this.props.defaultChecked} />

        <div className="mui-switch">
          <div className="mui-checkbox">
            <CheckboxOutline className="mui-checkbox-box" />
            <CheckboxChecked className="mui-checkbox-check" />
          </div>
        </div>

        {labelElement}

      </div> 
    );
  },

  _onCheck: function(e, isInputChecked) {
    if (!this.props.hasOwnProperty('checked')) this.setState({switched: !this.refs.enhancedSwitch.state.switched});
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  }

});

module.exports = Checkbox;
