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

  getInitialState: function() {
  	return {
  		classes: 'paper z-depth-top z-depth-' + this.props.zDepth
  	};
  },

  render: function() {
    var bottomClassName = 'paper-container z-depth-bottom z-depth-' + this.props.zDepth;

    return (
      <div className={this.state.mergedClasses}>
      	<div className={bottomClassName}>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Paper;
