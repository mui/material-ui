import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import AutoPrefix from './styles/auto-prefix';
import Transitions from './styles/transitions';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const CircularProgress = React.createClass({

  propTypes: {
    /**
     * Override the progress's color.
     */
    color: React.PropTypes.string,

    /**
     * Style for inner wrapper div.
     */
    innerStyle: React.PropTypes.object,

    /**
     * The max value of progress, only works in determinate mode.
     */
    max: React.PropTypes.number,

    /**
     * The min value of progress, only works in determinate mode.
     */
    min: React.PropTypes.number,

    /**
     * The mode of show your progress, indeterminate
     * for when there is no value for progress.
     */
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),

    /**
     * The size of the progress.
     */
    size: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The value of progress, only works in determinate mode.
     */
    value: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      mode: 'indeterminate',
      value: 0,
      min: 0,
      max: 100,
      size: 1,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    let wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
    let path = ReactDOM.findDOMNode(this.refs.path);

    this._scalePath(path);
    this._rotateWrapper(wrapper);
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentWillUnmount() {
    clearTimeout(this.scalePathTimer);
    clearTimeout(this.rotateWrapperTimer);
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

  scalePathTimer: undefined,
  rotateWrapperTimer: undefined,

  _scalePath(path, step) {
    if (this.props.mode !== 'indeterminate') return;

    step = step || 0;
    step %= 3;

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

    this.scalePathTimer = setTimeout(() => this._scalePath(path, step + 1), step ? 750 : 250);
  },

  _rotateWrapper(wrapper) {
    if (this.props.mode !== 'indeterminate') return;

    AutoPrefix.set(wrapper.style, 'transform', 'rotate(0deg)');
    AutoPrefix.set(wrapper.style, 'transitionDuration', '0ms');

    setTimeout(() => {
      AutoPrefix.set(wrapper.style, 'transform', 'rotate(1800deg)');
      AutoPrefix.set(wrapper.style, 'transitionDuration', '10s');
      AutoPrefix.set(wrapper.style, 'transitionTimingFunction', 'linear');
    }, 50);

    this.rotateWrapperTimer = setTimeout(() => this._rotateWrapper(wrapper), 10050);
  },

  getTheme() {
    return this.state.muiTheme.rawTheme.palette;
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

export default CircularProgress;
