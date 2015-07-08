let React = require('react');
let StylePropable = require('../mixins/style-propable');
let Transitions = require('../styles/transitions');
let Colors = require('../styles/colors');
let AutoPrefix = require('../styles/auto-prefix');

const pulsateDuration = 750;


let FocusRipple = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    show: React.PropTypes.bool,
    innerStyle: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      color: Colors.darkBlack,
    };
  },

  componentDidMount() {
    this._setRippleSize();
    this._pulsate();
  },

  render() {
    let outerStyles = this.mergeAndPrefix({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(null, ['transform', 'opacity']),
      transform: this.props.show ? 'scale(1)' : 'scale(0)',
      opacity: this.props.show ? 1 : 0,
      overflow: 'hidden',
    }, this.props.style);

    let innerStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: this.props.opacity ? this.props.opacity : 0.16,
      backgroundColor: this.props.color,
      transition: Transitions.easeOut(pulsateDuration + 'ms', 'transform', null, Transitions.easeInOutFunction),
    }, this.props.innerStyle);

    return (
      <div style={outerStyles}>
        <div ref="innerCircle" style={innerStyles} />
      </div>
    );
  },

  _pulsate() {
    if (!this.isMounted()) return;

    let startScale = 'scale(0.75)';
    let endScale = 'scale(0.85)';
    let innerCircle = React.findDOMNode(this.refs.innerCircle);
    let currentScale = innerCircle.style[AutoPrefix.single('transform')];
    let nextScale;

    currentScale = currentScale || startScale;
    nextScale = currentScale === startScale ?
      endScale : startScale;

    innerCircle.style[AutoPrefix.single('transform')] = nextScale;
    setTimeout(this._pulsate, pulsateDuration);
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
