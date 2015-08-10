'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Colors = require('../styles/colors');
var Transitions = require('../styles/transitions');
var ScaleInTransitionGroup = require('../transition-groups/scale-in');

var pulsateDuration = 750;

var FocusRipple = React.createClass({
  displayName: 'FocusRipple',

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    opacity: React.PropTypes.number,
    show: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: Colors.darkBlack
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.show) {
      this._setRippleSize();
      this._pulsate();
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.show) {
      this._setRippleSize();
      this._pulsate();
    } else {
      if (this._timeout) clearTimeout(this._timeout);
    }
  },

  render: function render() {
    var _props = this.props;
    var color = _props.color;
    var innerStyle = _props.innerStyle;
    var opacity = _props.opacity;
    var show = _props.show;
    var style = _props.style;

    var mergedRootStyles = this.mergeStyles({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    }, style);

    var innerStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: opacity ? opacity : 0.16,
      backgroundColor: color,
      transition: Transitions.easeOut(pulsateDuration + 'ms', 'transform', null, Transitions.easeInOutFunction)
    }, innerStyle);

    var ripple = show ? React.createElement('div', { ref: 'innerCircle', style: innerStyles }) : null;

    return React.createElement(
      ScaleInTransitionGroup,
      {
        maxScale: 0.85,
        style: mergedRootStyles },
      ripple
    );
  },

  _pulsate: function _pulsate() {
    if (!this.isMounted()) return;

    var innerCircle = React.findDOMNode(this.refs.innerCircle);
    if (!innerCircle) return;

    var startScale = 'scale(1)';
    var endScale = 'scale(0.85)';
    var currentScale = innerCircle.style[AutoPrefix.single('transform')];
    var nextScale = undefined;

    currentScale = currentScale || startScale;
    nextScale = currentScale === startScale ? endScale : startScale;

    innerCircle.style[AutoPrefix.single('transform')] = nextScale;
    this._timeout = setTimeout(this._pulsate, pulsateDuration);
  },

  _setRippleSize: function _setRippleSize() {
    var el = React.findDOMNode(this.refs.innerCircle);
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    el.style.height = size + 'px';
    el.style.top = size / 2 * -1 + height / 2 + 'px';
  }

});

module.exports = FocusRipple;