import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Fade from '../Fade';
import { getBackdropUtilityClass } from './backdropClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, invisible } = ownerState;

  const slots = {
    root: ['root', invisible && 'invisible'],
  };

  return composeClasses(slots, getBackdropUtilityClass, classes);
};

const BackdropRoot = styled('div', {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.invisible && styles.invisible];
  },
})(({ ownerState }) => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent',
  ...(ownerState.invisible && {
    backgroundColor: 'transparent',
  }),
}));

const Backdrop = React.forwardRef(function Backdrop(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiBackdrop' });
  const {
    children,
    className,
    component = 'div',
    components = {},
    componentsProps = {},
    invisible = false,
    open,
    slotProps = {},
    slots = {},
    TransitionComponent = Fade,
    transitionDuration,
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    invisible,
  };

  const classes = useUtilityClasses(ownerState);

  const rootSlotProps = slotProps.root ?? componentsProps.root;

  return (
    <TransitionComponent in={open} timeout={transitionDuration} {...other}>
      <BackdropRoot
        aria-hidden
        {...rootSlotProps}
        as={slots.root ?? components.Root ?? component}
        className={clsx(classes.root, className, rootSlotProps?.className)}
        ownerState={{ ...ownerState, ...rootSlotProps?.ownerState }}
        classes={classes}
        ref={ref}
      >
        {children}
      </BackdropRoot>
    </TransitionComponent>
  );
});

Backdrop.propTypes /* remove-proptypes */ = {
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
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

export default Backdrop;
