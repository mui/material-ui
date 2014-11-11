/**
 * @jsx React.DOM
 */

var React = require('react'),
  Classable = require('./mixins/classable.js');

var Icon = React.createClass({

  mixins: [Classable],

  propTypes: {
    icon: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  render: function() {
    var isMuiCustomIcon = this.props.icon.indexOf('mui-icon') > -1,
      iconClassName = isMuiCustomIcon ? this.props.icon : 'mdfi_' + this.props.icon.replace(/-/g, '_'),
      classes = this.getClasses('mui-icon ' + iconClassName);

    return (
      <span className={classes} onClick={this._onClick}>
        <span className="mui-icon-highlight">&nbsp;</span>
      </span>
    );
  },

  _onClick: function(e) {
    if (this.props.onClick) this.props.onClick(e);
  }

});

module.exports = Icon;
