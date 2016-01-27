import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import getMuiTheme from './styles/getMuiTheme';

const LinearProgress = React.createClass({
  propTypes: {
    /**
     * The mode of show your progress, indeterminate for
     * when there is no value for progress.
     */
    color: React.PropTypes.string,

    /**
     * The max value of progress, only works in determinate mode.
     */
    max: React.PropTypes.number,

    /**
     * The min value of progress, only works in determinate mode.
     */
    min: React.PropTypes.number,

    /**
     * The mode of show your progress, indeterminate for when
     * there is no value for progress.
     */
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),

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

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      mode: 'indeterminate',
      value: 0,
      min: 0,
      max: 100,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    let bar1 = ReactDOM.findDOMNode(this.refs.bar1);
    let bar2 = ReactDOM.findDOMNode(this.refs.bar2);

    this.timers.bar1 = this._barUpdate('bar1', 0, bar1, [
      [-35, 100],
      [100, -90],
    ]);

    this.timers.bar2 = setTimeout(() => {
      this._barUpdate('bar2', 0, bar2, [
        [-200, 100],
        [107, -8],
      ]);
    }, 850);
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentWillUnmount() {
    clearTimeout(this.timers.bar1);
    clearTimeout(this.timers.bar2);
  },

  timers: {
    bar1: undefined,
    bar2: undefined,
  },

  _barUpdate(id, step, barElement, stepValues) {
    if (this.props.mode !== 'indeterminate') return;

    step = step || 0;
    step %= 4;

    const right = this.state.muiTheme.isRtl ? 'left' : 'right';
    const left = this.state.muiTheme.isRtl ? 'right' : 'left';

    if (step === 0) {
      barElement.style[left] = stepValues[0][0] + '%';
      barElement.style[right] = stepValues[0][1] + '%';
    } else if (step === 1) {
      barElement.style.transitionDuration = '840ms';
    } else if (step === 2) {
      barElement.style[left] = stepValues[1][0] + '%';
      barElement.style[right] = stepValues[1][1] + '%';
    } else if (step === 3) {
      barElement.style.transitionDuration = '0ms';
    }
    this.timers[id] = setTimeout(() => this._barUpdate(id, step + 1, barElement, stepValues), 420);
  },

  getTheme() {
    return this.state.muiTheme.rawTheme.palette;
  },

  getStyles() {
    let styles = {
      root: {
        position: 'relative',
        height: 4,
        display: 'block',
        width: '100%',
        backgroundColor: this.getTheme().primary3Color,
        borderRadius: 2,
        margin: 0,
        overflow: 'hidden',
      },
      bar: {
        height: '100%',
      },
      barFragment1: {},
      barFragment2: {},
    };

    if (this.props.mode === 'indeterminate') {
      styles.barFragment1 = {
        position: 'absolute',
        backgroundColor: this.props.color || this.getTheme().primary1Color,
        top: 0,
        left: 0,
        bottom: 0,
        transition: Transitions.create('all', '840ms', null, 'cubic-bezier(0.650, 0.815, 0.735, 0.395)'),
      };

      styles.barFragment2 = {
        position: 'absolute',
        backgroundColor: this.props.color || this.getTheme().primary1Color,
        top: 0,
        left: 0,
        bottom: 0,
        transition: Transitions.create('all', '840ms', null, 'cubic-bezier(0.165, 0.840, 0.440, 1.000)'),
      };
    } else {
      styles.bar.backgroundColor = this.props.color || this.getTheme().primary1Color;
      styles.bar.transition = Transitions.create('width', '.3s', null, 'linear');
      styles.bar.width = this._getRelativeValue() + '%';
    }

    return styles;
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

  render() {
    let {
      style,
      ...other,
    } = this.props;

    let styles = this.getStyles();

    return (
      <div {...other} style={this.prepareStyles(styles.root, style)}>
        <div style={this.prepareStyles(styles.bar)}>
          <div ref="bar1" style={this.prepareStyles(styles.barFragment1)}></div>
          <div ref="bar2" style={this.prepareStyles(styles.barFragment2)}></div>
        </div>
      </div>
    );
  },
});

export default LinearProgress;
