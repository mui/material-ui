/**
 * @jsx React.DOM
 */

var React = require('react'),
    Paper = require('./paper.jsx'),
    Classable = require('./mixins/classable.js'),

    Types = {
      RAISED: 'RAISED',
      FLAT: 'FLAT',
      FAB: 'FAB',
      FAB_MINI: 'FAB_MINI'
    },

    zDepths = {
      FLAT: 0,
      RAISED: 1,
      FAB: 2
    };

var PaperButton = React.createClass({

  propTypes: {
    primary: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    type: React.PropTypes.oneOf(Object.keys(Types)),
    onClick: React.PropTypes.func
  },

  mixins: [Classable],

  statics: {
    Types: Types
  },

  getDefaultProps: function() {
    return {
      primary: false,
      disabled: false,
      type: Types.RAISED
    };
  },

  render: function() {
    var classes = this.getClasses('mui-paper-button', {
      'mui-primary': this.props.primary,
      'mui-disabled': this.props.disabled,
      'mui-flat': this.props.type === Types.FLAT,
      'mui-fab': this.props.type === Types.FAB,
      'mui-fab-mini': this.props.type === Types.FAB_MINI
    }),
      circle = this.props.type === Types.FAB || this.props.type === Types.FAB_MINI,
      zDepth = this.props.disabled ? 0 : zDepths[this.props.type];

    return (
      <div className={classes} onClick={this._onClick}>
        <Paper zDepth={zDepth} circle={circle}>
            {this.props.label}
        </Paper>
      </div>
    );
  },

  _onClick: function(e) {
    if (!this.props.disabled && this.props.onClick) this.props.onClick(e);
  }

});

module.exports = PaperButton;