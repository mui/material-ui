var React = require('react');
var Classable = require('./mixins/classable');

var FontIcon = React.createClass({

  mixins: [Classable],

  render: function() {

    var {
      className,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-font-icon');

    return (
      <span {...other} className={classes} />
    );
  }

});

module.exports = FontIcon;