var React = require('react');
var Classable = require('./mixins/classable.js');
var Icon = require('./icon.jsx');

var Checkbox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    onCheck: React.PropTypes.func
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      checked: this.props.checked || false,
      disabled: this.props.disabled || false,
    }
  },

  render: function() {
    var classes = this.getClasses('mui-checkbox');

    var componentclasses = React.addons.classSet({
      'mui-checkbox-component': true,
      'mui-checked': this.state.checked,
      'mui-disabled': this.state.disabled
    });

    var {
      type,
      name,
      value,
      checked,
      onCheck,
      ...other
    } = this.props;

    return (
      <div className={classes} onClick={this._onClick}>
        <div className={componentclasses}>
          <div className="mui-checkbox-box">
            <Icon icon="toggle-check-box-outline-blank" />
          </div>
          <div className="mui-checkbox-check">
            <Icon icon="toggle-check-box" />
          </div>
          <input 
              ref="checkbox"
              type="checkbox"
              name={this.props.name}
              value={this.props.value}
              checked={this.state.checked}
              {...other} />
        </div>
        <div className="mui-checkbox-label"> {this.props.label} </div>
      </div>
    );
  },

  _onClick: function(e) {
    if (!this.state.disabled) this.setState({checked: !this.state.checked});
    if (this.props.onCheck) this.props.onCheck(e, !checkedState);
  },
});

module.exports = Checkbox;