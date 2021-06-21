import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { fade, withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    // Create a "on paper" color with sufficient contrast retaining the color
    backgroundColor: fade(theme.palette.text.primary, theme.palette.type === 'light' ? 0.11 : 0.13),
    height: '1.2em',
  },
  /* Styles applied to the root element if `variant="text"`. */
  text: {
    marginTop: 0,
    marginBottom: 0,
    height: 'auto',
    transformOrigin: '0 60%',
    transform: 'scale(1, 0.60)',
    borderRadius: theme.shape.borderRadius,
    '&:empty:before': {
      content: '"\\00a0"',
    },
  },
  /* Styles applied to the root element if `variant="rect"`. */
  rect: {},
  /* Styles applied to the root element if `variant="circle"`. */
  circle: {
    borderRadius: '50%',
  },
  /* Styles applied to the root element if `animation="pulse"`. */
  pulse: {
    animation: '$pulse 1.5s ease-in-out 0.5s infinite',
  },
  '@keyframes pulse': {
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
  /* Styles applied to the root element if `animation="wave"`. */
  wave: {
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      animation: '$wave 1.6s linear 0.5s infinite',
      background: `linear-gradient(90deg, transparent, ${theme.palette.action.hover}, transparent)`,
      content: '""',
      position: 'absolute',
      transform: 'translateX(-100%)', // Avoid flash during server-side hydration
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  },
  '@keyframes wave': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '60%': {
      // +0.5s of delay between each loop
      transform: 'translateX(100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  /* Styles applied when the component is passed children. */
  withChildren: {
    '& > *': {
      visibility: 'hidden',
    },
  },
  /* Styles applied when the component is passed children and no width. */
  fitContent: {
    maxWidth: 'fit-content',
  },
  /* Styles applied when the component is passed children and no height. */
  heightAuto: {
    height: 'auto',
  },
});

const Skeleton = React.forwardRef(function Skeleton(props, ref) {
  const {
    animation = 'pulse',
    classes,
    className,
    component: Component = 'span',
    height,
    variant = 'text',
    width,
    ...other
  } = props;

  const hasChildren = Boolean(other.children);

  return (
    <Component
      ref={ref}
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes[animation]]: animation !== false,
          [classes.withChildren]: hasChildren,
          [classes.fitContent]: hasChildren && !width,
          [classes.heightAuto]: hasChildren && !height,
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
   * The animation.
   * If `false` the animation effect is disabled.
   */
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  /**
   * Optional children to infer width and height from.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
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
