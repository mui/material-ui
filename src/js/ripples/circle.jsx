var React = require('react');
var StylePropable = require('../mixins/style-propable.js');
var AutoPrefix = require('../styles/auto-prefix.js');
var Transitions = require('../styles/mixins/transitions.js');
var Colors = require('../styles/colors.js');

var RippleCircle = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    started: React.PropTypes.bool,
    ending: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      color: Colors.darkBlack
    };
  },

  render: function() {
    var {
      color,
      started,
      ending,
      style,
      ...other
    } = this.props;

    var styles = this.mergePropStyles({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      opacity: 0.2,
      borderRadius: '50%',
      transform: this.props.started ? 'scale(1)' : 'scale(0)',
      backgroundColor: this.props.color,
      transition:
        Transitions.easeOut('2s', 'opacity') + ',' +
        Transitions.easeOut('1s', 'transform')
    });

    if (this.props.started) styles.opacity = 0.2;
    if (this.props.ending) styles.opacity = 0;

    return (
      <div {...other} style={AutoPrefix.all(styles)} />
    );
  }

});

module.exports = RippleCircle;