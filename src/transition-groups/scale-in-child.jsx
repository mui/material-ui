const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const StylePropable = require('../mixins/style-propable');
const AutoPrefix = require('../styles/auto-prefix');
const Transitions = require('../styles/transitions');


const ScaleInChild = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

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

  componentWillAppear(callback) {
    this._initializeAnimation(callback);
  },

  componentWillEnter(callback) {
    this._initializeAnimation(callback);
  },

  componentDidAppear() {
    this._animate();
  },

  componentDidEnter() {
    this._animate();
  },

  componentWillLeave(callback) {
    let style = React.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.minScale + ')');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }.bind(this), 450);
  },

  render() {
    const {
      children,
      enterDelay,
      style,
      ...other,
    } = this.props;

    const mergedRootStyles = this.mergeAndPrefix({
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

  _animate() {
    let style = React.findDOMNode(this).style;

    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.maxScale + ')');
  },

  _initializeAnimation(callback) {
    let style = React.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(0)');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }.bind(this), this.props.enterDelay);
  },

});

module.exports = ScaleInChild;
