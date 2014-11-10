/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js');

var RadioButton = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    onClick: React.PropTypes.func,
    value: React.PropTypes.string,
    label: React.PropTypes.string
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      checked: false
    }
  },

  toggle: function() {
    this.setState({ checked: !this.state.checked });
    this.refs.radioButton.getDOMNode().checked = !this.refs.radioButton.getDOMNode().checked;
  },

  render: function() {
    var classes = this.getClasses('mui-radio-button', {
    })

    return (
      <div className={classes} onClick={this._onClick}>
        <input ref="radioButton" type="radio" name={this.props.name} value={this.props.value} />
        <div className="mui-radio-button-fill" />
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
