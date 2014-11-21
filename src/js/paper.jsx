/**
 * @jsx React.DOM
 */

var React = require('react'),
  Classable = require('./mixins/classable.js');

var Paper = React.createClass({

  mixins: [Classable],

  propTypes: {
    circle: React.PropTypes.bool,
    innerClassName: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    rounded: React.PropTypes.bool,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      circle: false,
      innerClassName: '',
      rounded: true,
      zDepth: 1
    };
  },

  render: function() {
    var classes = this.getClasses('mui-paper mui-z-depth-' + this.props.zDepth, {
          'mui-rounded': this.props.rounded,
          'mui-circle': this.props.circle
        }),
        insideClasses = this.props.innerClassName + ' mui-paper-container mui-z-depth-bottom';

    return (
      <div className={classes} onClick={this._onClick} onMouseDown={this._onMouseDown} 
      	onMouseUp={this._onMouseUp} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
        <div ref="innerContainer" className={insideClasses}>
          {this.props.children}
        </div>
      </div>
    );
  },

  getInnerContainer: function() {
    return this.refs.innerContainer;
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e);
  },

  _onMouseDown: function(e) {
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _onMouseOver: function(e) {
  	if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _onMouseOut: function(e) {
  	if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _onMouseUp: function(e) {
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  }

});

module.exports = Paper;
