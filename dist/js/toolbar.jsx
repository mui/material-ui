/**
 * @jsx React.DOM
 */

var React = require('react'),
    ToolbarGroup = require('./toolbar-group.jsx'),
    Classable = require('./mixins/classable.js');

var Toolbar = React.createClass({

  propTypes: {
    groups: React.PropTypes.array.isRequired
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
    }
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    var classes = this.getClasses('mui-toolbar', {
    })

    return (
      <div className={classes}>
        {this._getChildren()}
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