import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import Modal from '../Modal';
import Slide from '../Slide';
import Paper from '../Paper';
import capitalize from '../utils/capitalize';
import useTheme from '../styles/useTheme';
import useThemeProps from '../styles/useThemeProps';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { getDrawerUtilityClass } from './drawerClasses';

const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    (ownerState.variant === 'permanent' || ownerState.variant === 'persistent') && styles.docked,
    styles.modal,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { classes, anchor, variant } = ownerState;

  const slots = {
    root: ['root'],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: [
      'paper',
      `paperAnchor${capitalize(anchor)}`,
      variant !== 'temporary' && `paperAnchorDocked${capitalize(anchor)}`,
    ],
  };

  return composeClasses(slots, getDrawerUtilityClass, classes);
};

const DrawerRoot = styled(Modal, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver,
})(({ theme }) => ({
  zIndex: (theme.vars || theme).zIndex.drawer,
}));

const DrawerDockedRoot = styled('div', {
  shouldForwardProp: rootShouldForwardProp,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver,
})({
  flex: '0 0 auto',
});

const DrawerPaper = styled(Paper, {
  name: 'MuiDrawer',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.paper,
      styles[`paperAnchor${capitalize(ownerState.anchor)}`],
      ownerState.variant !== 'temporary' &&
        styles[`paperAnchorDocked${capitalize(ownerState.anchor)}`],
    ];
  },
})(({ theme, ownerState }) => ({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
  zIndex: (theme.vars || theme).zIndex.drawer,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  // temporary style
  position: 'fixed',
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0,
  ...(ownerState.anchor === 'left' && {
    left: 0,
  }),
  ...(ownerState.anchor === 'top' && {
    top: 0,
    left: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100%',
  }),
  ...(ownerState.anchor === 'right' && {
    right: 0,
  }),
  ...(ownerState.anchor === 'bottom' && {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100%',
  }),
  ...(ownerState.anchor === 'left' &&
    ownerState.variant !== 'temporary' && {
      borderRight: `1px solid ${(theme.vars || theme).palette.divider}`,
    }),
  ...(ownerState.anchor === 'top' &&
    ownerState.variant !== 'temporary' && {
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    }),
  ...(ownerState.anchor === 'right' &&
    ownerState.variant !== 'temporary' && {
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
    }),
  ...(ownerState.anchor === 'bottom' &&
    ownerState.variant !== 'temporary' && {
      borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
    }),
}));

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

export function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}

export function getAnchor(theme, anchor) {
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

/**
 * The props of the [Modal](/material-ui/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
const Drawer = React.forwardRef(function Drawer(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiDrawer' });
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    className,
    elevation = 16,
    hideBackdrop = false,
    ModalProps: { BackdropProps: BackdropPropsProp, ...ModalProps } = {},
    onClose,
    open = false,
    PaperProps = {},
    SlideProps,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Slide,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary',
    ...other
  } = props;

  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);

  const anchorInvariant = getAnchor(theme, anchorProp);
  const anchor = anchorProp;

  const ownerState = {
    ...props,
    anchor,
    elevation,
    open,
    variant,
    ...other,
  };

  const classes = useUtilityClasses(ownerState);

  const drawer = (
    <DrawerPaper
      elevation={variant === 'temporary' ? elevation : 0}
      square
      {...PaperProps}
      className={clsx(classes.paper, PaperProps.className)}
      ownerState={ownerState}
    >
      {children}
    </DrawerPaper>
  );

  if (variant === 'permanent') {
    return (
      <DrawerDockedRoot
        className={clsx(classes.root, classes.docked, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      >
        {drawer}
      </DrawerDockedRoot>
    );
  }

  const slidingDrawer = (
    <TransitionComponent
      in={open}
      direction={oppositeDirection[anchorInvariant]}
      timeout={transitionDuration}
      appear={mounted.current}
      {...SlideProps}
    >
      {drawer}
    </TransitionComponent>
  );

  if (variant === 'persistent') {
    return (
      <DrawerDockedRoot
        className={clsx(classes.root, classes.docked, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      >
        {slidingDrawer}
      </DrawerDockedRoot>
    );
  }

  // variant === temporary
  return (
    <DrawerRoot
      BackdropProps={{
        ...BackdropProps,
        ...BackdropPropsProp,
        transitionDuration,
      }}
      className={clsx(classes.root, classes.modal, className)}
      open={open}
      ownerState={ownerState}
      onClose={onClose}
      hideBackdrop={hideBackdrop}
      ref={ref}
      {...other}
      {...ModalProps}
    >
      {slidingDrawer}
    </DrawerRoot>
  );
});

Drawer.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,
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
   * The elevation of the drawer.
   * @default 16
   */
  elevation: integerPropType,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,
  /**
   * Props applied to the [`Modal`](/material-ui/api/modal/) element.
   * @default {}
   */
  ModalProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   * @default {}
   */
  PaperProps: PropTypes.object,
  /**
   * Props applied to the [`Slide`](/material-ui/api/slide/) element.
   */
  SlideProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

export default Drawer;
