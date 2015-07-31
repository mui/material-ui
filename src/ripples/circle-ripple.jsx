const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const StylePropable = require('../mixins/style-propable');
const AutoPrefix = require('../styles/auto-prefix');
const Transitions = require('../styles/transitions');
const Colors = require('../styles/colors');


const CircleRipple = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      color: Colors.darkBlack,
      opacity: 0.16,
    };
  },

  componentDidEnter() {
    let style = React.findDOMNode(this).style;
    AutoPrefix.set(style, 'transform', 'scale(1)');
  },

  componentWillEnter(callback) {
    let style = React.findDOMNode(this).style;
    style.opacity = this.props.opacity;
    AutoPrefix.set(style, 'transform', 'scale(0)');
    setTimeout(callback, 0);
  },

  componentWillLeave(callback) {
    let style = React.findDOMNode(this).style;
    style.opacity = 0;
    setTimeout(() => {
      if (this.isMounted()) callback();
    }.bind(this), 2000);
  },

  render() {
    const {
      color,
      opacity,
      style,
      ...other,
    } = this.props;

    const mergedStyles = this.mergeAndPrefix({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
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
