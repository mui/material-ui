const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const StylePropable = require('../mixins/style-propable');
const Transitions = require('../styles/transitions');
const Colors = require('../styles/colors');


const CircleRipple = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

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
    const {
      color,
      ending,
      opacity,
      started,
      style,
      ...other,
    } = this.props;

    const mergedStyles = this.mergeAndPrefix({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      opacity:  ending ? 0 :
        opacity ? opacity : 0.16,
      borderRadius: '50%',
      transform: started ? 'scale(1)' : 'scale(0)',
      backgroundColor: color,
      transition:
        Transitions.easeOut('2s', 'opacity') + ',' +
        Transitions.easeOut('1s', 'transform'),
    }, style);

    return (
      <div {...other} style={mergedStyles} />
    );
  },

});

module.exports = CircleRipple;
