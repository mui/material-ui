import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    backgroundColor: theme.palette.action.hover,
    height: '1.2em',
  },
  /* Styles applied to the root element if `variant="text"`. */
  text: {
    marginTop: 0,
    marginBottom: 0,
    height: 'auto',
    transformOrigin: '0 65%',
    transform: 'translateZ(0) scale(1, 0.65)',
    borderRadius: theme.shape.borderRadius,
    textIndent: -999,
    '&:empty:before': {
      content: '"&nbsp;"',
    },
  },
  /* Styles applied to the root element if `variant="rect"`. */
  rect: {},
  /* Styles applied to the root element if `variant="circle"`. */
  circle: {
    borderRadius: '50%',
  },
  /* Styles applied to the root element if `disabledAnimate={false}`. */
  animate: {
    animation: '$animate 1.5s ease-in-out infinite',
  },
  '@keyframes animate': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.4,
    },
    '100%': {
      opacity: 1,
    },
  },
});

const Skeleton = React.forwardRef(function Skeleton(props, ref) {
  const {
    classes,
    className,
    component: Component = 'div',
    disableAnimate = false,
    height,
    variant = 'text',
    width,
    ...other
  } = props;

  return (
    <Component
      ref={ref}
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes.animate]: !disableAnimate,
        },
        className,
      )}
      {...other}
      style={{
        width,
        height,
        ...other.style,
      }}
    />
  );
});

Skeleton.propTypes = {
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true` the animation effect is disabled.
   */
  disableAnimate: PropTypes.bool,
  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The type of content that will be rendered.
   */
  variant: PropTypes.oneOf(['text', 'rect', 'circle']),
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default withStyles(styles, { name: 'MuiSkeleton' })(Skeleton);
