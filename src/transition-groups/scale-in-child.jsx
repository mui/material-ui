let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let AutoPrefix = require('../styles/auto-prefix');
let Transitions = require('../styles/transitions');


let ScaleInChild = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      enterDelay: 0,
      maxScale: 1,
      minScale: 0,
    };
  },

  componentWillEnter(callback) {
    let style = React.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(0)');

    setTimeout(callback, this.props.enterDelay);
  },

  componentDidEnter() {
    let style = React.findDOMNode(this).style;

    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.maxScale + ')');
  },

  componentWillLeave(callback) {
    let style = React.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.minScale + ')');

    setTimeout(callback, 450);
  },

  render() {
    let {
      children,
      enterDelay,
      style,
      ...other,
    } = this.props;

    let mergedRootStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(null, ['transform', 'opacity']),
    }, style);

    return (
      <div {...other} style={mergedRootStyles}>
        {children}
      </div>
    );
  },

});

module.exports = ScaleInChild;
