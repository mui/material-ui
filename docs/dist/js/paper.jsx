/**
 * @jsx React.DOM
 */

var React = require('react'),
  Classable = require('./mixins/classable.js');

var Paper = React.createClass({

  mixins: [Classable],

  propTypes: {
    zDepth: React.PropTypes.number,
    rounded: React.PropTypes.bool,
    circle: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      zDepth: 1,
      rounded: true,
      circle: false
    };
  },

  render: function() {
    var classes = this.getClasses('mui-paper mui-z-depth-' + this.props.zDepth, {
          'mui-rounded': this.props.rounded,
          'mui-circle': this.props.circle
        }),
        insideClasses = 'mui-paper-container mui-z-depth-bottom';

    return (
      <div className={classes} onClick={this._onClick} onMouseDown={this._onMouseDown} onMouseUp={this._onMouseUp}>
        <div className={insideClasses}>
          {this.props.children}
        </div>
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e);
  },

  _onMouseDown: function(e) {
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _onMouseUp: function(e) {
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  }

});

module.exports = Paper;
