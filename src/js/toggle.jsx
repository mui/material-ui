var React = require('react');
var Classable = require('./mixins/classable.js');
var Paper = require('./paper.jsx');

var Toggle = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      toggled: this.props.defaultToggled || false
    }
  },

  componentDidMount: function() {
    var inputNode = this.refs.toggleInput.getDOMNode();
    this.setState({toggled: inputNode.toggled});
  },

  componentWillReceiveProps: function() {
    var inputNode = this.refs.toggleInput.getDOMNode();
    this.setState({toggled: inputNode.toggled});
  },

  handleChange: function(e) {
    var isInputToggled = this.refs.toggleInput.getDOMNode().checked;

    if (!this.props.toggled) this.setState({toggled: isInputToggled});
    if (this.props.onToggle) this.props.onToggle(e, isInputToggled);
  },


  render: function() {
    var classes = this.getClasses('mui-toggle', {
      'mui-is-toggled': this.state.toggled,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var {
      type,
      name,
      value,
      label,
      onToggle,
      ...other
    } = this.props;

    return (
      <div className="mui-toggle-wrap">

        <input 
          {...other} 
          ref="toggleInput"
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

  isToggled: function() {
    return this.refs.toggleInput.getDOMNode().checked;
  },

  // no callback here because there is no event
  setToggled: function(newToggledValue) {
    if (!this.props.hasOwnProperty('checked')) {
      this.setState({toggled: newToggledValue});  
      this.refs.toggleInput.getDOMNode().checked = newToggledValue;
    } else {
      var message = 'Cannot call setToggled() while checked is defined as a property.';
      console.error(message);
    }
  }
});

module.exports = Toggle;