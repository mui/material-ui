/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js'),
    RadioButton = require('./radio-button.jsx')

var Toggle = React.createClass({

  propTypes: {
    onToggle: React.PropTypes.func
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      toggled: false
    }
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    var classes = this.getClasses('mui-toggle', {
      'toggled': this.state.toggled === true
    })

    return (
      <div className={classes} toggled={this.state.toggled} onClick={this._onClick}>
        <div className="mui-toggle-bar">
        </div>
        <RadioButton></RadioButton>
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onToggle) this.props.onToggle(e);
      this.setState({ toggled: !this.state.toggled });
  }

});

module.exports = Toggle;