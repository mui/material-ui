var React = require('react');
var StylePropable = require('../mixins/style-propable.js');
var Transitions = require('../styles/mixins/transitions.js');
var AutoPrefix = require('../styles/auto-prefix.js');
var Colors = require('../styles/colors.js');

var pulsateDuration = 750;

var FocusRipple = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    show: React.PropTypes.bool,
    innerStyle: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      color: Colors.darkBlack
    };
  },

  componentDidMount: function() {
    this._setRippleSize();
    this._pulsate();
  },

  render: function() {

    var outerStyles = this.mergeStyles({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(),
      transform: this.props.show ? 'scale(1)' : 'scale(0)',
      opacity: this.props.show ? 1 : 0
    });

    var innerStyles = this.mergeStyles({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: 0.2,
      backgroundColor: this.props.color,
      transition: Transitions.easeOut(pulsateDuration + 'ms', null, null, Transitions.easeInOutFunction)
    }, this.props.innerStyle);

    return (
      <div style={AutoPrefix.all(outerStyles)}>
        <div ref="innerCircle" style={AutoPrefix.all(innerStyles)} />
      </div>
    );
  },

  _pulsate: function() {
    if (!this.isMounted()) return;

    var startScale = 'scale(0.75)';
    var endScale = 'scale(0.85)';
    var innerCircle = this.refs.innerCircle.getDOMNode();
    var currentScale = innerCircle.style.transform;
    var nextScale;

    currentScale = currentScale || startScale;
    nextScale = currentScale === startScale ?
      endScale : startScale;

    innerCircle.style.transform = nextScale;
    setTimeout(this._pulsate, pulsateDuration);
  },

  _setRippleSize: function() {
    var el = this.getDOMNode();
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    el.style.height = size + 'px';
    el.style.top = (size / 2 * -1) + (height / 2) + 'px';
  }

});

module.exports = FocusRipple;