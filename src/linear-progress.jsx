import React from 'react';
import Transitions from './styles/transitions';
import getMuiTheme from './styles/getMuiTheme';

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  const rangeValue = max - min;
  const relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
  return relValue * 100;
}

function getStyles(props, state) {
  const {
    max,
    min,
    value,
  } = props;

  const {
    baseTheme: {
      palette,
    },
  } = state.muiTheme;

  const styles = {
    root: {
      position: 'relative',
      height: 4,
      display: 'block',
      width: '100%',
      backgroundColor: palette.primary3Color,
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

  if (props.mode === 'indeterminate') {
    styles.barFragment1 = {
      position: 'absolute',
      backgroundColor: props.color || palette.primary1Color,
      top: 0,
      left: 0,
      bottom: 0,
      transition: Transitions.create('all', '840ms', null, 'cubic-bezier(0.650, 0.815, 0.735, 0.395)'),
    };

    styles.barFragment2 = {
      position: 'absolute',
      backgroundColor: props.color || palette.primary1Color,
      top: 0,
      left: 0,
      bottom: 0,
      transition: Transitions.create('all', '840ms', null, 'cubic-bezier(0.165, 0.840, 0.440, 1.000)'),
    };
  } else {
    styles.bar.backgroundColor = props.color || palette.primary1Color;
    styles.bar.transition = Transitions.create('width', '.3s', null, 'linear');
    styles.bar.width = `${getRelativeValue(value, min, max)}%`;
  }

  return styles;
}

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

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

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
    this.timers.bar1 = this._barUpdate('bar1', 0, this.refs.bar1, [
      [-35, 100],
      [100, -90],
    ]);

    this.timers.bar2 = setTimeout(() => {
      this._barUpdate('bar2', 0, this.refs.bar2, [
        [-200, 100],
        [107, -8],
      ]);
    }, 850);
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
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
      barElement.style[left] = `${stepValues[0][0]}%`;
      barElement.style[right] = `${stepValues[0][1]}%`;
    } else if (step === 1) {
      barElement.style.transitionDuration = '840ms';
    } else if (step === 2) {
      barElement.style[left] = `${stepValues[1][0]}%`;
      barElement.style[right] = `${stepValues[1][1]}%`;
    } else if (step === 3) {
      barElement.style.transitionDuration = '0ms';
    }
    this.timers[id] = setTimeout(() => this._barUpdate(id, step + 1, barElement, stepValues), 420);
  },

  render() {
    const {
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        <div style={prepareStyles(styles.bar)}>
          <div ref="bar1" style={prepareStyles(styles.barFragment1)}></div>
          <div ref="bar2" style={prepareStyles(styles.barFragment2)}></div>
        </div>
      </div>
    );
  },
});

export default LinearProgress;
