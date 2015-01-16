var React = require('react');
var Classable = require('./mixins/classable.js');
var Icon = require('./icon.jsx');

var Checkbox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    onCheck: React.PropTypes.func,
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool
  },

  mixins: [Classable, React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      checked: this.props.defaultChecked || false
    }
  },

  componentDidMount: function() {
    var inputNode = this.refs.checkbox.getDOMNode();
    this.setState({checked: inputNode.checked});
  },

  componentWillReceiveProps: function() {
    var inputNode = this.refs.checkbox.getDOMNode();
    this.setState({checked: inputNode.checked});
  },

  handleChange: function(e) {
    var isInputChecked = this.refs.checkbox.getDOMNode().checked;

    if (!this.props.checked) this.setState({checked: isInputChecked});
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },


  render: function() {
    var classes = this.getClasses('mui-checkbox');

    var componentclasses = React.addons.classSet({
      'mui-checkbox-component': true,
      'mui-is-checked': this.state.checked,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var {
      type,
      name,
      value,
      onCheck,
      ...other
    } = this.props;

    return (
      <div className={classes}>

        <input 
          {...other} 
          ref="checkbox"
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}/>

        <div className={componentclasses}>
          <div className="mui-checkbox-box">
            <Icon icon="toggle-check-box-outline-blank" />
          </div>
          <div className="mui-checkbox-check">
            <Icon icon="toggle-check-box" />
          </div>
        </div>

        <div className="mui-checkbox-label"> 
          {this.props.label}
        </div>
      </div>
    );
  },

  isChecked: function() {
    return this.refs.checkbox.getDOMNode().checked;
  },

  // no callback here because there is no event
  setChecked: function(newCheckedValue) {
    if (!this.props.hasOwnProperty('checked')) {
      this.setState({checked: newCheckedValue});  
      this.refs.checkbox.getDOMNode().checked = newCheckedValue;
    } else {
      var message = 'Attempt to modify checked value for checkbox while ' +
                    'checked is defined as a property.';
      console.error(message);
    }
  }
});

module.exports = Checkbox;