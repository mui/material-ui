/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js');

var Input = React.createClass({

  propTypes: {
    style: React.PropTypes.string,
    error: React.PropTypes.string,
    label: React.PropTypes.string,
    description: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
    }
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    var classes = this.getClasses('mui-input', {
      'mui-floating': this.props.style === 'floating',
      'mui-text': this.props.type === 'text',
      'mui-error': this.props.error != null
    })

    return (
      <div className={classes}>
        <input type={this.props.type} name={this.props.name} required />
        <span className="mui-input-placeholder">
          {this.props.placeholder}
        </span>
        <span className="mui-input-highlight">
        </span>
        <span className="mui-input-bar">
        </span>
        <span className="mui-input-description">
          {this.props.description}
        </span>
        <span className="mui-input-error">
          {this.props.error}
        </span>
      </div>
    );
  }

});

module.exports = Input;