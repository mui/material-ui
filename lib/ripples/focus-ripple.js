'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var Colors = require('../styles/colors');
var AutoPrefix = require('../styles/auto-prefix');

var pulsateDuration = 750;

var FocusRipple = React.createClass({
  displayName: 'FocusRipple',

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    show: React.PropTypes.bool,
    innerStyle: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: Colors.darkBlack
    };
  },

  componentDidMount: function componentDidMount() {
    this._setRippleSize();
    this._pulsate();
  },

  render: function render() {
    var outerStyles = this.mergeAndPrefix({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(null, ['transform', 'opacity']),
      transform: this.props.show ? 'scale(1)' : 'scale(0)',
      opacity: this.props.show ? 1 : 0,
      overflow: 'hidden'
    }, this.props.style);

    var innerStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: this.props.opacity ? this.props.opacity : 0.16,
      backgroundColor: this.props.color,
      transition: Transitions.easeOut(pulsateDuration + 'ms', 'transform', null, Transitions.easeInOutFunction)
    }, this.props.innerStyle);

    return React.createElement(
      'div',
      { style: outerStyles },
      React.createElement('div', { ref: 'innerCircle', style: innerStyles })
    );
  },

  _pulsate: function _pulsate() {
    if (!this.isMounted()) return;

    var startScale = 'scale(0.75)';
    var endScale = 'scale(0.85)';
    var innerCircle = React.findDOMNode(this.refs.innerCircle);
    var currentScale = innerCircle.style[AutoPrefix.single('transform')];
    var nextScale = undefined;

    currentScale = currentScale || startScale;
    nextScale = currentScale === startScale ? endScale : startScale;

    innerCircle.style[AutoPrefix.single('transform')] = nextScale;
    setTimeout(this._pulsate, pulsateDuration);
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