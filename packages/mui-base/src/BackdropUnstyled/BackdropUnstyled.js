import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '../composeClasses';
import appendOwnerState from '../utils/appendOwnerState';
import { getBackdropUnstyledUtilityClass } from './backdropUnstyledClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getBackdropUnstyledUtilityClass, {});
};

const BackdropUnstyled = React.forwardRef(function BackdropUnstyled(props, ref) {
  const { className, component, components = {}, componentsProps = {}, ...other } = props;

  const ownerState = props;

  const classes = useUtilityClasses(ownerState);

  const Root = component ?? components.Root ?? 'div';
  const rootProps = appendOwnerState(
    Root,
    {
      'aria-hidden': true,
      ...other,
      ...componentsProps.root,
      ref,
      className: clsx(className, componentsProps.root?.className, classes.root),
    },
    ownerState,
  );

  return <Root {...rootProps} />;
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
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
};

export default BackdropUnstyled;
