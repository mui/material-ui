var React = require('react');
var Classable = require('./mixins/classable.js');
var Icon = require('./icon.jsx');
var EnhancedSwitch = require('./enhanced-switch.jsx');

var Checkbox = React.createClass({

  mixins: [Classable],

  propTypes: {
    onCheck: React.PropTypes.func,
    defaultChecked: React.PropTypes.bool,
    labelPositionRight: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      switched: this.props.defaultChecked || false
    }
  },

  render: function() {
    var {
      onCheck,
      ...other
    } = this.props;

    var classes = this.getClasses("mui-switch-checkbox", {
      'mui-is-switched': this.state.switched,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    return (
      <div className="mui-switch-wrap">

        <EnhancedSwitch 
          {...other}
          ref="enhancedSwitch"
          switchType="checkbox"
          className="mui-switch-checkbox"
          onSwitch={this._onCheck}
          defaultSwitched={this.props.defaultChecked} />

        <div className="mui-switch">
          <div className={classes} >
            <div className="mui-checkbox-box">
              <Icon icon="toggle-check-box-outline-blank" />
            </div>
            <div className="mui-checkbox-check">
              <Icon icon="toggle-check-box" />
            </div>
          </div>
        </div>

        <div className="mui-switch-label">
          {this.props.label}
        </div>

    </div> 
    );
  },

  _onCheck: function(e, isInputChecked) {
    this.setState({switched: !this.refs.enhancedSwitch.state.switched});
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
