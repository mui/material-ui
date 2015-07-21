let React = require('react/addons');
let PureRenderMixin = React.addons.PureRenderMixin;
let StylePropable = require('../mixins/style-propable');
let AutoPrefix = require('../styles/auto-prefix');
let Colors = require('../styles/colors');
let Transitions = require('../styles/transitions');
let ScaleInTransitionGroup = require('../transition-groups/scale-in');

const pulsateDuration = 750;


let FocusRipple = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    opacity: React.PropTypes.number,
    show: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      color: Colors.darkBlack,
    };
  },

  componentDidMount() {
    if (this.props.show) {
      this._setRippleSize();
      this._pulsate();
    }
  },

  componentDidUpdate() {
    if (this.props.show) {
      this._setRippleSize();
      this._pulsate();
    } else {
      if (this._timeout) clearTimeout(this._timeout);
    }
  },

  render() {

    let {
      color,
      innerStyle,
      opacity,
      show,
      style,
    } = this.props;

    let mergedRootStyles = this.mergeStyles({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    }, style);

    let innerStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: opacity ? opacity : 0.16,
      backgroundColor: color,
      transition: Transitions.easeOut(pulsateDuration + 'ms', 'transform', null, Transitions.easeInOutFunction),
    }, innerStyle);

    let ripple = show ? (
      <div ref="innerCircle" style={innerStyles} />
    ) : null;

    return (
      <ScaleInTransitionGroup
        maxScale={0.85}
        style={mergedRootStyles}>
        {ripple}
      </ScaleInTransitionGroup>
    );
  },

  _pulsate() {
    if (!this.isMounted()) return;

    let innerCircle = React.findDOMNode(this.refs.innerCircle);
    if (!innerCircle) return;

    let startScale = 'scale(1)';
    let endScale = 'scale(0.85)';
    let currentScale = innerCircle.style[AutoPrefix.single('transform')];
    let nextScale;

    currentScale = currentScale || startScale;
    nextScale = currentScale === startScale ?
      endScale : startScale;

    innerCircle.style[AutoPrefix.single('transform')] = nextScale;
    this._timeout = setTimeout(this._pulsate, pulsateDuration);
  },

  _setRippleSize() {
    let el = React.findDOMNode(this.refs.innerCircle);
    let height = el.offsetHeight;
    let width = el.offsetWidth;
    let size = Math.max(height, width);

    el.style.height = size + 'px';
    el.style.top = (size / 2 * -1) + (height / 2) + 'px';
  },

});

module.exports = FocusRipple;
