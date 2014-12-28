var React = require('react');
var Classable = require('../mixins/classable');

var RippleCircle = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    started: React.PropTypes.bool,
    ending: React.PropTypes.bool
  },

  render: function() {
    var {
      innerClassName,
      started,
      ending,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-ripple-circle', {
      'mui-is-started': this.props.started,
      'mui-is-ending': this.props.ending
    });

    return (
      <div {...other} className={classes}>
        <div className="mui-ripple-circle-inner" />
      </div>
    );
  }

});

module.exports = RippleCircle;