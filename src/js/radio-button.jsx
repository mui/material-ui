var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js');

var RadioButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onClick: React.PropTypes.func,
    value: React.PropTypes.string,
    defaultChecked: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
       defaultChecked: false
    }
  },
  getInitialState: function() {
    return {
      checked: this.props.defaultChecked
    }
  },

  toggle: function() {
    var radioButton = this.refs.radioButton.getDOMNode();

    this.setState({ checked: !this.state.checked });
    radioButton.checked = !radioButton.checked;
  },

  render: function() {
    var classes = this.getClasses('mui-radio-button');

    return (
      <div className={classes} onClick={this._onClick}>
        <div className="mui-radio-button-target">
          <input
            ref="radioButton"
            type="radio"
            name={this.props.name}
            value={this.props.value}
            defaultChecked={this.props.defaultChecked}
          />
          <div className="mui-radio-button-fill" />
          </div>
        <span className="mui-radio-button-label">{this.props.label}</span>
      </div>
    );
  },

  _onClick: function(e) {
    var checkedState = this.state.checked;

    this.toggle();
    if (this.props.onClick) this.props.onClick(e, !checkedState);
  }

});

module.exports = RadioButton;
