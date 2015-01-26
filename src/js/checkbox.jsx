var React = require('react');
var Classable = require('./mixins/classable.js');
var DomIdable = require('./mixins/dom-idable.js');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank.jsx');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked.jsx');

var Checkbox = React.createClass({

  mixins: [Classable, DomIdable],

  propTypes: {
    id: React.PropTypes.string,
    onCheck: React.PropTypes.func,
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    labelPositionRight: React.PropTypes.bool
  },

  componentDidMount: function() {
    this.setState({checked: this.refs.enhancedSwitch.isSwitched()});
  },

  getInitialState: function() {
    return {
      checked: this.props.defaultChecked || this.props.checked
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
      newState.checked = nextProps.checked;
    } else if (hasCheckedLinkProp) {
      newState.checked = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.checked = nextProps.defaultChecked;
    }

    if (newState) this.setState(newState);
  },

  render: function() {
    var {
      id,
      onCheck,
      ...other
    } = this.props;

    var classes = this.getClasses("mui-checkbox", {
      'mui-switch-wrap': true,
      'mui-is-switched': this.state.checked,
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
          ref="enhancedSwitch"
          inputType="checkbox"
          onSwitch={this._onCheck}
          defaultSwitched={this.props.defaultChecked} />

        <div className="mui-checkbox-icon mui-switch">
          <CheckboxOutline className="mui-checkbox-box" />
          <CheckboxChecked className="mui-checkbox-check" />
        </div>

        {labelElement}

      </div> 
    );
  },

  _onCheck: function(e, isInputChecked) {
    if (!this.props.hasOwnProperty('checked')) this.setState({checked: !this.refs.enhancedSwitch.state.checked});
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
