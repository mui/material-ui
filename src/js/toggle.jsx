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

  render: function() {
    var classes = this.getClasses('mui-toggle', {
      'mui-toggled': this.state.toggled === true
    })

    return (
      <div className={classes} onClick={this._onClick}>
        <div className="mui-toggle-bar">
        </div>
        <RadioButton ref="radioButton" />
      </div>
    );
  },

  _onClick: function(e) {
    if (this.refs.radioButton._onClick != null) {
        this.refs.radioButton._onClick = null;
        this.refs.radioButton.setState({ checked: false});
        this.refs.radioButton.refs.radioButton.getDOMNode().checked = false;
    }
    var toggledState = !this.state.toggled;

    this.setState({ toggled: toggledState });

    if (this.props.onToggle) this.props.onToggle(e, toggledState);
  }

});

module.exports = Toggle;
