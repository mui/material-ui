import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '../composeClasses';
import isHostComponent from '../utils/isHostComponent';
import { getBackdropUtilityClass } from './backdropUnstyledClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, invisible } = styleProps;

  const slots = {
    root: ['root', invisible && 'invisible'],
  };

  return composeClasses(slots, getBackdropUtilityClass, classes);
};

const BackdropUnstyled = React.forwardRef(function BackdropUnstyled(props, ref) {
  const {
    classes: classesProp,
    className,
    invisible = false,
    component = 'div',
    components = {},
    componentsProps = {},
    /* eslint-disable react/prop-types */
    theme,
    ...other
  } = props;

  const styleProps = {
    ...props,
    classes: classesProp,
    invisible,
  };

  const classes = useUtilityClasses(styleProps);

  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};

  return (
    <Root
      aria-hidden
      {...rootProps}
      {...(!isHostComponent(Root) && {
        as: component,
        styleProps: { ...styleProps, ...rootProps.styleProps },
        theme,
      })}
      ref={ref}
      {...other}
      className={clsx(classes.root, rootProps.className, className)}
    />
  );
});

BackdropUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Backdrop.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Backdrop.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: PropTypes.bool,
};

export default BackdropUnstyled;
