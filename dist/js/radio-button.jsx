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

  toggle: function() {
    this.setState({ checked: !this.state.checked });
  },

  render: function() {
    var classes = this.getClasses('mui-radio-button', {
      'mui-checked': this.state.checked === true
    })

    return (
      <div className={classes} onClick={this._onClick}>
        <div className="mui-radio-button-fill">
        </div>
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