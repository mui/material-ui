var React = require('react');

module.exports = React.createClass({

	propTypes: {
    type: React.PropTypes.string,
    value: React.PropTypes.object,
    className: React.PropTypes.string,
		onClick: React.PropTypes.func
	},

  render: function() {
    var classes = this.props.className + ' button';

    return (
      <div className={classes} onClick={this._onClick}>
        {this.props.children}
      </div>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.value);
  },

});