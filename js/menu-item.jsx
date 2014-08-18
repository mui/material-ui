var React = require('react'),
  KeyLine = require('./utils/key-line.js'),
  Classable = require('./mixins/classable.js');

var MenuItem = React.createClass({

	mixins: [Classable],

  propTypes: {
    key: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
  },

  getInitialState: function() {
  	return {
  		classes: 'item'
  	}
  },

  render: function() {
    return (
    	<div key={this.props.key} className={this.state.mergedClasses} onClick={this._onClick}>
        {this.props.children}
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.key);
  }

});

module.exports = MenuItem;
