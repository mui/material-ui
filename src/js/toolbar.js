/** @jsx React.DOM */

var Classable = require('./mixins/classable.js');
var React = require('react');

var Toolbar = React.createClass({

  mixins: [Classable],

  render: function() {
    var classes = this.getClasses('mui-toolbar', {
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Toolbar;
