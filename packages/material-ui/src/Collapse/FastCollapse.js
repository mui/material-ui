import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { duration as durations } from '../styles/transitions';
import { useForkRef } from '../utils';

function appendStep({ percentage, step, startY, endY, outerAnimation, innerAnimation }) {
  const yScale = (startY + (endY - startY) * step).toFixed(5);

  const invScaleY = (1 / yScale).toFixed(5);

  outerAnimation[`${percentage}%`] = {
    transform: `scaleY(${yScale})`,
  };

  innerAnimation[`${percentage}%`] = {
    transform: `scaleY(${invScaleY})`,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function ease(value, pow = 4) {
  return 1 - (1 - clamp(value, 0, 1)) ** pow;
}

export const styles = () => {
  const duration = durations.standard; // TODO from theme?
  const frameTime = 1000 / 60;
  const nFrames = Math.round(duration / frameTime);
  const percentIncrement = 100 / nFrames;

  const expandWrapperAnimation = {};
  const expandContentAnimation = {};
  const collapseWrapperAnimation = {};
  const collapseContentAnimation = {};

  for (let i = 0; i <= nFrames; i += 1) {
    const step = ease(i / nFrames).toFixed(5);
    const percentage = (i * percentIncrement).toFixed(5);
    const startY = 0; // TODO from props
    const endY = 1;

    // Expand animation.
    appendStep({
      percentage,
      step,
      startY,
      endY,
      outerAnimation: expandWrapperAnimation,
      innerAnimation: expandContentAnimation,
    });

    // Collapse animation.
    appendStep({
      percentage,
      step,
      startX: 1,
      startY: 1,
      endY: 0, // TODO from props
      outerAnimation: collapseWrapperAnimation,
      innerAnimation: collapseContentAnimation,
    });
  }

  return {
    '@keyframes expandWrapperAnimation': expandWrapperAnimation,
    '@keyframes expandContentAnimation': expandContentAnimation,
    '@keyframes collapseWrapperAnimation': collapseWrapperAnimation,
    '@keyframes collapseContentAnimation': collapseContentAnimation,
    wrapper: {
      animationDuration: duration,
      animationTimingFunction: 'step-end',
      contain: 'content',
      overflow: 'hidden',
      '&$expanded': {
        animationName: '$expandWrapperAnimation',
      },
      '&$collapsed': {
        animationName: '$collapseWrapperAnimation',
      },
    },
    content: {
      animationDuration: duration,
      animationTimingFunction: 'step-end',
      '&$expanded': {
        animationName: '$expandContentAnimation',
      },
      '&$collapsed': {
        animationName: '$collapseContentAnimation',
      },
    },
    expanded: {},
    collapsed: {},
  };
};

/**
 * Based on https://googlechromelabs.github.io/ui-element-samples/animated-clip/
 */
const FastCollapse = React.forwardRef(function Collapse(props, ref) {
  const { children, classes, className, in: expanded, ...other } = props;

  const wrapperRef = React.useRef(null);
  const [collapsedScale, setCollapsedScale] = React.useState(Number.EPSILON);

  React.useEffect(() => {
    // cant be 0, otherwise content will be scaled up infinitely
    const collapsedHeight = Number.EPSILON; // TODO from props
    const expandedHeight = wrapperRef.current.getBoundingClientRect().height;

    // WARNING: possible infinite loop
    setCollapsedScale(collapsedHeight / expandedHeight);
  }, []);

  const { wrapperStyle, contentStyle } = React.useMemo(() => {
    if (expanded) {
      return {
        wrapperStyle: {
          transform: 'scaleY(1)',
        },
        contentStyle: {
          transform: 'scaleY(1)',
        },
      };
    }

    const y = collapsedScale;
    const invY = 1 / y;
    return {
      wrapperStyle: {
        transform: `scaleY(${y})`,
      },
      contentStyle: {
        transform: `scaleY(${invY})`,
      },
    };
  }, [collapsedScale, expanded]);

  const handleRef = useForkRef(ref, wrapperRef);

  return (
    <div
      className={clsx(
        classes.wrapper,
        {
          [classes.collapsed]: !expanded,
          [classes.expanded]: expanded,
        },
        className,
      )}
      ref={handleRef}
      style={wrapperStyle}
      {...other}
    >
      <div
        className={clsx(classes.content, {
          [classes.collapsed]: !expanded,
          [classes.expanded]: expanded,
        })}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
});

FastCollapse.propTypes = {
  /**
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiFastCollapse' })(FastCollapse);
