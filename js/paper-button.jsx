/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js');

var PaperButton = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['raised', 'flat', 'fab']),
    onClick: React.PropTypes.func.isRequired
  },

  mixins: [Classable],

  getDefaultProps: function() {
    return {
      type: "raised"
    };
  },

  render: function() {
    var classes = this.getClasses('mui-paper-button'),
      zDepth;

    switch(this.props.type) {
      case 'flat':
        zDepth = 0;
        break;
      case 'raised':
        zDepth = 1;
        break;
      case 'fab':
        zDepth = 2;
        break;
    }

    return (
      <div className={classes} onClick={this._onClick}>
        <Paper zDepth={zDepth}>
            {this.props.label}
        </Paper>
      </div>
    );
  },

  _onClick: function(e) {
    this.props.onClick(e);
  }

});

module.exports = PaperButton;