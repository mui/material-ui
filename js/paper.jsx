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
  		classes: 'mui-paper mui-z-depth-top mui-z-depth-' + this.props.zDepth
  	};
  },

  render: function() {
    var bottomClassName = 'mui-paper-container mui-z-depth-bottom mui-z-depth-' + this.props.zDepth;

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
