/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js');

var RadioButton = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func,
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      checked: false
    }
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    var classes = this.getClasses('mui-radio-button', {
      'checked': this.state.checked === true
    })

    return (
      <div className={classes} checked={this.state.checked} onClick={this._onClick}>
        <div className="mui-radio-button-fill">
        </div>
      </div>
    );
  },

  _onClick: function(e) {
    this.setState({ checked: !this.state.checked });
  }

});

module.exports = RadioButton;