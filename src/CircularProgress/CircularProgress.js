import React, {Component, PropTypes} from 'react';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  const rangeValue = max - min;
  const relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
  return relValue * 100;
}

function getStyles(props, context) {
  const {
    max,
    min,
    size,
    value,
  } = props;

  const {baseTheme: {palette}} = context.muiTheme;
  const zoom = size * 1.4 ;
  const baseSize = 50;
  let margin = Math.round( ((50 * zoom) - 50) / 2 );

  if (margin < 0) margin = 0;

  const styles = {
    root: {
      position: 'relative',
      margin: margin,
      display: 'inline-block',
      width: baseSize,
      height: baseSize,
    },
    wrapper: {
      width: baseSize,
      height: baseSize,
      display: 'inline-block',
      transition: transitions.create('transform', '20s', null, 'linear'),
      transitionTimingFunction: 'linear',
    },
    svg: {
      height: baseSize,
      position: 'relative',
      transform: `scale(${zoom})`,
      width: baseSize,
    },
    path: {
      strokeDasharray: '89, 200',
      strokeDashoffset: 0,
      stroke: props.color || palette.primary1Color,
      strokeLinecap: 'round',
      transition: transitions.create('all', '1.5s', null, 'ease-in-out'),
    },
  };

  if (props.mode === 'determinate') {
    const relVal = getRelativeValue(value, min, max);
    styles.path.transition = transitions.create('all', '0.3s', null, 'linear');
    styles.path.strokeDasharray = `${Math.round(relVal * 1.25)}, 200`;
  }

  return styles;
}

class CircularProgress extends Component {
  static propTypes = {
    /**
     * Override the progress's color.
     */
    color: PropTypes.string,
    /**
     * Style for inner wrapper div.
     */
    innerStyle: PropTypes.object,
    /**
     * The max value of progress, only works in determinate mode.
     */
    max: PropTypes.number,
    /**
     * The min value of progress, only works in determinate mode.
     */
    min: PropTypes.number,
    /**
     * The mode of show your progress, indeterminate
     * for when there is no value for progress.
     */
    mode: PropTypes.oneOf(['determinate', 'indeterminate']),
    /**
     * The size of the progress.
     */
    size: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The value of progress, only works in determinate mode.
     */
    value: PropTypes.number,
  };

  static defaultProps = {
    mode: 'indeterminate',
    value: 0,
    min: 0,
    max: 100,
    size: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.scalePath(this.refs.path);
    this.rotateWrapper(this.refs.wrapper);
  }

  componentWillUnmount() {
    clearTimeout(this.scalePathTimer);
    clearTimeout(this.rotateWrapperTimer);
  }

  scalePath(path, step) {
    if (this.props.mode !== 'indeterminate') return;

    step = step || 0;
    step %= 3;

    if (step === 0) {
      path.style.strokeDasharray = '1, 200';
      path.style.strokeDashoffset = 0;
      path.style.transitionDuration = '0ms';
    } else if (step === 1) {
      path.style.strokeDasharray = '89, 200';
      path.style.strokeDashoffset = -35;
      path.style.transitionDuration = '750ms';
    } else {
      path.style.strokeDasharray = '89, 200';
      path.style.strokeDashoffset = -124;
      path.style.transitionDuration = '850ms';
    }

    this.scalePathTimer = setTimeout(() => this.scalePath(path, step + 1), step ? 750 : 250);
  }

  rotateWrapper(wrapper) {
    if (this.props.mode !== 'indeterminate') return;

    autoPrefix.set(wrapper.style, 'transform', 'rotate(0deg)');
    autoPrefix.set(wrapper.style, 'transitionDuration', '0ms');

    setTimeout(() => {
      autoPrefix.set(wrapper.style, 'transform', 'rotate(1800deg)');
      autoPrefix.set(wrapper.style, 'transitionDuration', '10s');
      autoPrefix.set(wrapper.style, 'transitionTimingFunction', 'linear');
    }, 50);

    this.rotateWrapperTimer = setTimeout(() => this.rotateWrapper(wrapper), 10050);
  }

  render() {
    const {
      style,
      innerStyle,
      size, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))} >
        <div ref="wrapper" style={prepareStyles(Object.assign(styles.wrapper, innerStyle))} >
          <svg style={prepareStyles(styles.svg)} >
            <circle
              ref="path"
              style={prepareStyles(styles.path)}
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="2.5"
              strokeMiterlimit="20"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default CircularProgress;
