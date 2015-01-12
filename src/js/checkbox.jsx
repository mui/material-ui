var React = require('react'),
    Classable = require('./mixins/classable.js');

var Checkbox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      checked: this.props.checked || false,
      disabled: this.props.disabled || false,
    }
  },

  componentDidMount: function() {
    console.log('DefaultChecked: ', this.refs.checkbox.getDOMNode().defaultChecked);
    
  },

  render: function() {
    var classes = this.getClasses('mui-mo-checkbox');

    var componentclasses = React.addons.classSet({
      'mui-mo-checkbox-component': true,
      'mui-checked': this.state.checked,
      'mui-disabled': this.state.disabled
    });

    var {
      type,
      name,
      value,
      checked,
      ...other
    } = this.props;

    return (
      <div className={classes} onClick={this._onClick}>
        <div className={componentclasses}>
          <div className="mui-mo-checkbox-check">
            C
            <input 
              ref="checkbox"
              type="checkbox"
              name={this.props.name}
              value={this.props.value}
              checked={this.state.checked}
              {...other} />
          </div>
          <div className="mui-mo-checkbox-box">
          B
          </div>
        </div>
        <div className="mui-mo-checkbox-label"> {this.props.label} </div>
      </div>
    );
  },

  _onClick: function() {
    if (!this.state.disabled) this.setState({checked: !this.state.checked});
    console.log(this.state);
  },

  componentDidUpdate: function() {
  //  console.log(this.state);
  },

  onChange: function() {
  console.log('onChange',this.state);
  }

});

module.exports = Checkbox;