var React = require('react'),
  Classable = require('./mixins/classable.js');

var Overlay = React.createClass({

  mixins: [Classable],

  propTypes: {
    show: React.PropTypes.bool
  },

  render: function() {
    var 
      {
        className,
        ...other
      } = this.props,
      classes = this.getClasses('mui-overlay', {
        'mui-is-shown': this.props.show
      });

    return (
      <div {...other} className={classes} />
    );
  }

});

module.exports = Overlay;