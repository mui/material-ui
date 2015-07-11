let React = require('react');
let StylePropable = require('../mixins/style-propable');
let Transitions = require('../styles/transitions');
let Colors = require('../styles/colors');


let CircleRipple = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    started: React.PropTypes.bool,
    ending: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      color: Colors.darkBlack,
    };
  },

  render() {
    let {
      color,
      started,
      ending,
      style,
      ...other,
    } = this.props;

    let styles = this.mergeAndPrefix({
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
        Transitions.easeOut('1s', 'transform'),
    }, this.props.style);

    return (
      <div {...other} style={styles} />
    );
  },

});

module.exports = CircleRipple;
