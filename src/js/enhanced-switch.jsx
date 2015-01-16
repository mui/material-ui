var React = require('react');
var Classable = require('./mixins/classable.js');

var EnhancedSwitch = React.createClass({
	propTypes: {
      className: React.PropTypes.string.isRequired,
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string.isRequired,
	    label: React.PropTypes.string,
	    onSwitch: React.PropTypes.func,
	    required: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    defaultSwitch: React.PropTypes.bool
	  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      switched: this.props.defaultSwitch || false
    }
  },

  componentDidMount: function() {
    var inputNode = this.refs.checkbox.getDOMNode();
    this.setState({switched: inputNode.checked});
  },

  componentWillReceiveProps: function() {
    var inputNode = this.refs.checkbox.getDOMNode();
    this.setState({switched: inputNode.checked});
  },

  handleChange: function(e) {
    var isInputChecked = this.refs.checkbox.getDOMNode().checked;

    if (!this.props.switched) this.setState({checked: isInputChecked});
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },

  render: function() {
    var classes = this.getClasses(this.props.className, {
      'mui-is-switched': this.state.switched,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var {
      type,
      name,
      value,
      label,
      onSwitch,
      ...other
    } = this.props;

    var checkbox = (
      <div className={classes}>
        <div className="mui-checkbox-box">
          <Icon icon="toggle-check-box-outline-blank" />
        </div>
        <div className="mui-checkbox-check">
          <Icon icon="toggle-check-box" />
        </div>
      </div> 
    );

    var toggle = (
      <div className={classes} >
        <div className="mui-toggle-track" />
        <Paper className="mui-toggle-thumb" zDepth={1} />
      </div>
    );

    return (this.props.className == "mui-checkbox") ? (
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

    ) : (
    
      <div className="mui-toggle-wrap">

        <input 
          {...other} 
          ref="checkbox"
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}/>

        <div className={classes} >
          <div className="mui-toggle-track" />
          <Paper className="mui-toggle-thumb" zDepth={1} />
        </div>
        
        <div className="mui-toggle-label">
          {this.props.label}
        </div>

      </div> 
    );
  },


  isSwitched: function() {
    return this.refs.checkbox.getDOMNode().checked;
  },

  // no callback here because there is no event
  setSwitched: function(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked')) {
      this.setState({toggled: newSwitchedValue});  
      this.refs.checkbox.getDOMNode().checked = newSwitchedValue;
    } else {
      var message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  }
});

module.exports = EnhancedSwitch;