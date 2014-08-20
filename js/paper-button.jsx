/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js');

var PaperButton = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired,
    size: React.PropTypes.string,
    type: React.PropTypes.oneOf(['raised', 'flat', 'fab']),
    onClick: React.PropTypes.func.isRequired
  },

  mixins: [Classable],

  getDefaultProps: function() {
    return {
      size: 'regular',
      type: "raised"
    };
  },

  render: function() {
    var classes = this.getClasses('mui-paper-button', {
      'mui-fab': ((this.props.type === 'fab') && (this.props.size === 'regular')),
      'mui-fab-mini': ((this.props.type === 'fab') && (this.props.size === 'mini'))
    }),
      zDepth,
      circle;

    switch(this.props.type) {
      case 'flat':
        zDepth = 0;
        break;
      case 'raised':
        zDepth = 1;
        break;
      case 'fab':
        zDepth = 2;
        circle = true;
        break;
    }

    return (
      <div className={classes} onClick={this._onClick}>
        <Paper zDepth={zDepth} circle={circle}>
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