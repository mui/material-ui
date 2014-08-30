/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js'),

    Types = {
      RAISED: 'RAISED',
      FLAT: 'FLAT',
      FAB: 'FAB'
    },

    Sizes = {
      REGULAR: 'REGULAR',
      MINI: 'MINI'
    },

    zDepths = {
      FLAT: 0,
      RAISED: 1,
      FAB: 2
    };

var PaperButton = React.createClass({

  propTypes: {
    label: React.PropTypes.string,
    size: React.PropTypes.oneOf(Object.keys(Sizes)),
    type: React.PropTypes.oneOf(Object.keys(Types)),
    onClick: React.PropTypes.func.isRequired
  },

  mixins: [Classable],

  statics: {
    Types: Types,
    Sizes: Sizes
  },

  getDefaultProps: function() {
    return {
      size: Sizes.REGULAR,
      type: Types.RAISED
    };
  },

  render: function() {
    var classes = this.getClasses('mui-paper-button', {
      'mui-flat': this.props.type === Types.FLAT,
      'mui-fab': ((this.props.type === Types.FAB) && (this.props.size === Sizes.REGULAR)),
      'mui-fab-mini': ((this.props.type === Types.FAB) && (this.props.size === Sizes.MINI))
    }),
      circle = this.props.type === Types.FAB,
      zDepth = zDepths[this.props.type];

    return (
      <div className={classes} onClick={this._onClick}>
        <Paper zDepth={zDepth} circle={circle}>
            {this.props.label}
        </Paper>
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e);
  }

});

module.exports = PaperButton;