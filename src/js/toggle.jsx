var React = require('react');
var Classable = require('./mixins/classable.js');
var DomIdable = require('./mixins/dom-idable.js');
var Paper = require('./paper.jsx');
var EnhancedSwitch = require('./enhanced-switch.jsx');

var Toggle = React.createClass({

  mixins: [Classable, DomIdable],

  propTypes: {
    id: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    checked: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool,
    labelPosition: React.PropTypes.oneOf(['left', 'right'])
  },

  getInitialState: function() {
    return {
      toggled: this.props.defaultToggled || this.props.checked
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasNewDefaultProp = 
      (nextProps.hasOwnProperty('defaultToggled') && 
      (nextProps.defaultToggled != this.props.defaultToggled));
    var newState = {};

    if (hasCheckedProp) {
      newState.toggled = nextProps.checked;
    } else if (hasCheckedLinkProp) {
      newState.toggled = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.toggled = nextProps.defaultToggled;
    }

    if (newState) this.setState(newState);
  },


  render: function() {
    var {
      id,
      onToggle,
      ...other
    } = this.props;
    
    var classes = this.getClasses("mui-toggle", {
      'mui-switch-wrap': true,
      'mui-is-switched': this.state.toggled,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var inputId = this.props.id || this.getDomId();

    var toggleDiv = (
      <div className="mui-toggle-icon mui-switch">
        <div className="mui-toggle-track" />
        <Paper className="mui-toggle-thumb" zDepth={1} />
      </div>
    );

    var labelElement = this.props.label ? (
      <label className="mui-switch-label" htmlFor={inputId}>
        {this.props.label}
      </label>
    ) : null;

    var labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    var divsInOrder = (labelPositionExist && (this.props.labelPosition.toUpperCase() === "RIGHT")) ? (
        <div>
          {toggleDiv}
          {labelElement}
        </div>
      ) : (
        <div>
          {labelElement}
          {toggleDiv}
        </div>
    );

    return (
      <div className={classes}>

        <EnhancedSwitch 
          {...other}
          id={inputId}
          ref="enhancedSwitch"
          inputType="checkbox"
          onSwitch={this._onToggle}
          defaultSwitched={this.props.defaultToggled} />

        {divsInOrder}

      </div>
    );
  },

  _onToggle: function(e, isInputChecked) {
    if (!this.props.hasOwnProperty('checked')) this.setState({toggled: !this.refs.enhancedSwitch.state.toggled});
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  isToggled: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  }

});

module.exports = Toggle;
