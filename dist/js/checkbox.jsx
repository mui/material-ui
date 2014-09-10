/**
 * @jsx React.DOM
 */

var React = require('react'),
    Classable = require('./mixins/classable.js');

var Checkbox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onCheck: React.PropTypes.func
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

  check: function() {
    this.setState({ checked: !this.state.checked });
    this.refs.checkbox.getDOMNode().checked = !this.refs.checkbox.getDOMNode().checked;

  },

  render: function() {
    var classes = this.getClasses('mui-checkbox', {
      'mui-checked': this.state.checked === true
    })

    return (
      <div className={classes} onClick={this._onCheck}>
        <input ref="checkbox" type="checkbox" name={this.props.name} value={this.props.value} />  
        <span className="mui-checkbox-box" />
        <span className="mui-checkbox-check" />
      </div>
    );
  },

  _onCheck: function(e) {
    var checkedState = this.state.checked;

    this.check();

    if (this.props.onClick) this.props.onClick(e, !checkedState);
  }

});

module.exports = Checkbox;