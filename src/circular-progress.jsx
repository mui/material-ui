import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import AutoPrefix from './styles/auto-prefix';
import Transitions from './styles/transitions';
import muiThemeable from './muiThemeable';

let CircularProgress = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    color: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),
    size: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    value: React.PropTypes.number,
  },

  _getRelativeValue() {
    let value = this.props.value;
    let min = this.props.min;
    let max = this.props.max;

    let clampedValue = Math.min(Math.max(min, value), max);
    let rangeValue = max - min;
    let relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },

  componentDidMount() {
    let wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
    let path = ReactDOM.findDOMNode(this.refs.path);

    this._scalePath(path);
    this._rotateWrapper(wrapper);
  },

  _scalePath(path, step) {
    step = step || 0;
    step %= 3;

    setTimeout(this._scalePath.bind(this, path, step + 1), step ? 750 : 250);

    if (!this.isMounted()) return;
    if (this.props.mode !== 'indeterminate') return;

    if (step === 0) {
      path.style.strokeDasharray = '1, 200';
      path.style.strokeDashoffset = 0;
      path.style.transitionDuration = '0ms';
    }
    else if (step === 1) {
      path.style.strokeDasharray = '89, 200';
      path.style.strokeDashoffset = -35;
      path.style.transitionDuration = '750ms';
    }
    else {
      path.style.strokeDasharray = '89,200';
      path.style.strokeDashoffset = -124;
      path.style.transitionDuration = '850ms';
    }
  },

  _rotateWrapper(wrapper) {
    setTimeout(this._rotateWrapper.bind(this, wrapper), 10050);

    if (!this.isMounted()) return;
    if (this.props.mode !== 'indeterminate') return;

    AutoPrefix.set(wrapper.style, 'transform', 'rotate(0deg)');
    AutoPrefix.set(wrapper.style, 'transitionDuration', '0ms');

    setTimeout(() => {
      AutoPrefix.set(wrapper.style, 'transform', 'rotate(1800deg)');
      AutoPrefix.set(wrapper.style, 'transitionDuration', '10s');
      AutoPrefix.set(wrapper.style, 'transitionTimingFunction', 'linear');
    }, 50);
  },

  getDefaultProps() {
    return {
      mode: 'indeterminate',
      value: 0,
      min: 0,
      max: 100,
      size: 1,
    };
  },

  getTheme() {
    return this.props._muiTheme.baseTheme.palette;
  },

  getStyles(zoom) {
    zoom *= 1.4;
    let size = '50px';

    let margin = Math.round( ((50 * zoom) - 50) / 2 );

    if (margin < 0) margin = 0;

    let styles = {
      root: {
        position: 'relative',
        margin: margin + 'px',
        display: 'inline-block',
        width: size,
        height: size,
      },
      wrapper: {
        width: size,
        height: size,
        margin: '5px',
        display: 'inline-block',
        transition: Transitions.create('transform', '20s', null, 'linear'),
      },
      svg: {
        height: size,
        position: 'relative',
        transform: 'scale(' + zoom + ')',
        width: size,
      },
      path: {
        strokeDasharray: '89,200',
        strokeDashoffset: 0,
        stroke: this.props.color || this.getTheme().primary1Color,
        strokeLinecap: 'round',
        transition: Transitions.create('all', '1.5s', null, 'ease-in-out'),
      },
    };

    AutoPrefix.set(styles.wrapper, 'transitionTimingFunction', 'linear');

    if (this.props.mode === 'determinate') {
      let relVal = this._getRelativeValue();
      styles.path.transition = Transitions.create('all', '0.3s', null, 'linear');
      styles.path.strokeDasharray = Math.round(relVal * 1.25) + ',200';
    }

    return styles;
  },

  render() {
    let {
      style,
      innerStyle,
      size,
      ...other,
    } = this.props;


    let styles = this.getStyles(size || 1);

    return (
      <div {...other} style={this.prepareStyles(styles.root, style)} >
        <div ref="wrapper" style={this.prepareStyles(styles.wrapper, innerStyle)} >
          <svg style={this.prepareStyles(styles.svg)} >
            <circle ref="path" style={this.prepareStyles(styles.path)} cx="25" cy="25"
              r="20" fill="none" strokeWidth="2.5" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>
    );
  },
});

CircularProgress = muiThemeable(CircularProgress);

export default CircularProgress;
