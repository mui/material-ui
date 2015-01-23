var React = require('react');
var Classable = require('./mixins/classable.js');
var Paper = require('./paper.jsx');
var EnhancedSwitch = require('./enhanced-switch.jsx');

var Toggle = React.createClass({

  mixins: [Classable],

  propTypes: {
    id: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    checked: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool,
    labelPosition: React.PropTypes.oneOf(['left', 'right'])
  },

  getInitialState: function() {
    return {
      switched: this.props.defaultToggled || this.props.checked
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedProperty = nextProps.hasOwnProperty('checked');
    var hasDifferentDefaultProperty = 
      (nextProps.hasOwnProperty('defaultToggled') && 
      (nextProps.defaultToggled != this.props.defaultToggled));

    if (hasCheckedProperty) {
      this.setState({switched: nextProps.checked});
    } else if (hasDifferentDefaultProperty) {
      this.setState({switched: nextProps.defaultToggled});
    }
  },


  render: function() {
    var {
      onToggle,
      ...other
    } = this.props;
    
    var classes = this.getClasses("mui-switch-wrap", {
      'mui-is-switched': this.state.switched,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var toggleDiv = (
      <div className="mui-switch">
        <div className="mui-toggle">
          <div className="mui-toggle-track" />
          <Paper className="mui-toggle-thumb" zDepth={1} />
        </div>
      </div>
    );

    var labelElement = this.props.label ? (
      <label className="mui-switch-label" htmlFor={this.props.id}>
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
          ref="enhancedSwitch"
          inputType="checkbox"
          onSwitch={this._onToggle}
          defaultSwitched={this.props.defaultToggled} />

        {divsInOrder}

      </div>
    );
  },

  _onToggle: function(e, isInputChecked) {
    if (!this.props.hasOwnProperty('checked')) this.setState({switched: !this.refs.enhancedSwitch.state.switched});
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
