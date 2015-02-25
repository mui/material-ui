var Classable = require('./mixins/classable');
var React = require('react');

var ToolbarGroup = React.createClass({

  propTypes: {
    float: React.PropTypes.string
  },

  mixins: [Classable],

  render: function() {

    var classes = this.getClasses('mui-toolbar-group', {
      'mui-left': this.props.float === 'left',
      'mui-right': this.props.float === 'right'
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = ToolbarGroup;
