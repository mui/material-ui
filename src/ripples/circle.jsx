var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var Colors = require('../styles/colors');

var RippleCircle = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
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

    var styles = this.mergeAndPrefix({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      opacity:  this.props.ending ? 0 : 
                this.props.opacity ? this.props.opacity : 0.16,
      borderRadius: '50%',
      transform: this.props.started ? 'scale(1)' : 'scale(0)',
      backgroundColor: this.props.color,
      transition:
        Transitions.easeOut('2s', 'opacity') + ',' +
        Transitions.easeOut('1s', 'transform')
    }, this.props.style);

    return (
      <div {...other} style={styles} />
    );
  }

});

module.exports = RippleCircle;