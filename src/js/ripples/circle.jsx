var React = require('react');
var Classable = require('../mixins/classable');

var RippleCircle = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    innerClassName: React.PropTypes.string,
    started: React.PropTypes.bool,
    ending: React.PropTypes.bool
  },

  render: function() {
    var classes = this.getClasses('mui-ripple-circle', {
      'mui-is-started': this.props.started,
      'mui-is-ending': this.props.ending
    });
    var innerClasses = 'mui-ripple-circle-inner';

    if (this.props.innerClassName) {
      innerClasses += ' ' + this.props.innerClassName;
    }

    return (
      <div className={classes}>
        <div className={innerClasses} />
      </div>
    );
  }

});

module.exports = RippleCircle;