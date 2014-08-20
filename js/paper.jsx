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
    circle: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      zDepth: 1,
      rounded: true,
      circle: false
    };
  },

  render: function() {
    var insideClasses = 'mui-paper-container mui-z-depth-bottom mui-z-depth-' + this.props.zDepth,
      classes = this.getClasses('mui-paper mui-z-depth-top mui-z-depth-' + this.props.zDepth, {
        'mui-rounded': this.props.rounded,
        'mui-circle': this.props.circle
      });

    return (
      <div className={classes}>
      	<div className={insideClasses}>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Paper;
