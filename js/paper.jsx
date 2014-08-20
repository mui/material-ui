/**
 * @jsx React.DOM
 */
 
var React = require('react'),
  Classable = require('./mixins/classable.js');

var Paper = React.createClass({

	mixins: [Classable],

  propTypes: {
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      zDepth: 1
    };
  },

  render: function() {
    var classes = this.getClasses('mui-paper mui-z-depth-top mui-z-depth-' + this.props.zDepth),
      insideClasses = 'mui-paper-container mui-z-depth-bottom mui-z-depth-' + this.props.zDepth;

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
