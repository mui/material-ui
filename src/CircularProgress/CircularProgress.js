import React, {Component, PropTypes} from 'react';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  return clampedValue / (max - min);
}

function getArcLength(fraction, props) {
  return fraction * Math.PI * (props.size - props.thickness);
}

function getStyles(props, context) {
  const {
    max,
    min,
    size,
    value,
  } = props;

  const {baseTheme: {palette}} = context.muiTheme;

  const styles = {
    root: {
      position: 'relative',
      display: 'inline-block',
      width: size,
      height: size,
    },
    wrapper: {
      width: size,
      height: size,
      display: 'inline-block',
      transition: transitions.create('transform', '20s', null, 'linear'),
      transitionTimingFunction: 'linear',
    },
    svg: {
      width: size,
      height: size,
      position: 'relative',
    },
    path: {
      stroke: props.color || palette.primary1Color,
      strokeLinecap: 'round',
      transition: transitions.create('all', '1.5s', null, 'ease-in-out'),
    },
  };

  if (props.mode === 'determinate') {
    const relVal = getRelativeValue(value, min, max);
    styles.path.transition = transitions.create('all', '0.3s', null, 'linear');
    styles.path.strokeDasharray = `${getArcLength(relVal, props)}, ${getArcLength(1, props)}`;
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
     * The diameter of the progress in pixels.
     */
    size: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Stroke width in pixels.
     */
    thickness: PropTypes.number,
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
    size: 40,
    thickness: 3.5,
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

  scalePath(path, step = 0) {
    if (this.props.mode !== 'indeterminate') return;

    step %= 3;

    if (step === 0) {
      path.style.strokeDasharray = `${getArcLength(0, this.props)}, ${getArcLength(1, this.props)}`;
      path.style.strokeDashoffset = 0;
      path.style.transitionDuration = '0ms';
    } else if (step === 1) {
      path.style.strokeDasharray = `${getArcLength(0.7, this.props)}, ${getArcLength(1, this.props)}`;
      path.style.strokeDashoffset = getArcLength(-0.3, this.props);
      path.style.transitionDuration = '750ms';
    } else {
      path.style.strokeDasharray = `${getArcLength(0.7, this.props)}, ${getArcLength(1, this.props)}`;
      path.style.strokeDashoffset = getArcLength(-1, this.props);
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
      size,
      thickness,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))} >
        <div ref="wrapper" style={prepareStyles(Object.assign(styles.wrapper, innerStyle))} >
          <svg
            viewBox={`0 0 ${size} ${size}`}
            style={prepareStyles(styles.svg)}
          >
            <circle
              ref="path"
              style={prepareStyles(styles.path)}
              cx={size / 2}
              cy={size / 2}
              r={(size - thickness) / 2}
              fill="none"
              strokeWidth={thickness}
              strokeMiterlimit="20"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default CircularProgress;
