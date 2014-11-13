/** @jsx React.DOM */

var Classable = require('./mixins/classable.js');
var React = require('react');

var Toolbar = React.createClass({

  propTypes: {
    groups: React.PropTypes.array.isRequired
  },

  mixins: [Classable],

  render: function() {
    var classes = this.getClasses('mui-toolbar', {
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  },

  _getChildren: function() {
    var children = [],
        group;

    for (var i=0; i < this.props.groups.length; i++) {
      group = this.props.groups[i];

      children.push(group);
    }

    return children;
  },

});

module.exports = Toolbar;
