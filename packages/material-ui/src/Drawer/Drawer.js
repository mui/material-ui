import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Modal from '../Modal';
import Backdrop from '../Backdrop';
import withStyles from '../styles/withStyles';
import Slide from '../Slide';
import Paper from '../Paper';
import capitalize from '../utils/capitalize';
import { duration } from '../styles/transitions';
import useTheme from '../styles/useTheme';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `variant="permanent or persistent"`. */
  docked: {
    flex: '0 0 auto',
  },
  /* Styles applied to the `Paper` component. */
  paper: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: '1 0 auto',
    zIndex: theme.zIndex.drawer,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    // temporary style
    position: 'fixed',
    top: 0,
    // We disable the focus ring for mouse, touch and keyboard users.
    // At some point, it would be better to keep it for keyboard users.
    // :focus-ring CSS pseudo-class will help.
    outline: 0,
  },
  /* Styles applied to the `Paper` component if `anchor="left"`. */
  paperAnchorLeft: {
    left: 0,
    right: 'auto',
  },
  /* Styles applied to the `Paper` component if `anchor="right"`. */
  paperAnchorRight: {
    left: 'auto',
    right: 0,
  },
  /* Styles applied to the `Paper` component if `anchor="top"`. */
  paperAnchorTop: {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 0,
    height: 'auto',
    maxHeight: '100%',
  },
  /* Styles applied to the `Paper` component if `anchor="bottom"`. */
  paperAnchorBottom: {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100%',
  },
  /* Styles applied to the `Paper` component if `anchor="left"` and `variant` is not "temporary". */
  paperAnchorDockedLeft: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  /* Styles applied to the `Paper` component if `anchor="top"` and `variant` is not "temporary". */
  paperAnchorDockedTop: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  /* Styles applied to the `Paper` component if `anchor="right"` and `variant` is not "temporary". */
  paperAnchorDockedRight: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  /* Styles applied to the `Paper` component if `anchor="bottom"` and `variant` is not "temporary". */
  paperAnchorDockedBottom: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  /* Styles applied to the `Modal` component. */
  modal: {},
});

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

const defaultTransitionDuration = { enter: duration.enteringScreen, exit: duration.leavingScreen };
/**
 * The props of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
const Drawer = React.forwardRef(function Drawer(props, ref) {
  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    classes,
    className,
    elevation = 16,
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
  const theme = useTheme();

  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);

  const anchor = getAnchor(theme, anchorProp);
  const drawer = (
    <Paper
      elevation={variant === 'temporary' ? elevation : 0}
      square
      {...PaperProps}
      className={clsx(
        classes.paper,
        classes[`paperAnchor${capitalize(anchor)}`],
        {
          [classes[`paperAnchorDocked${capitalize(anchor)}`]]: variant !== 'temporary',
        },
        PaperProps.className,
      )}
    >
      {children}
    </Paper>
  );

  if (variant === 'permanent') {
    return (
      <div className={clsx(classes.root, classes.docked, className)} ref={ref} {...other}>
        {drawer}
      </div>
    );
  }

  const slidingDrawer = (
    <TransitionComponent
      in={open}
      direction={oppositeDirection[anchor]}
      timeout={transitionDuration}
      appear={mounted.current}
      {...SlideProps}
    >
      {drawer}
    </TransitionComponent>
  );

  if (variant === 'persistent') {
    return (
      <div className={clsx(classes.root, classes.docked, className)} ref={ref} {...other}>
        {slidingDrawer}
      </div>
    );
  }

  // variant === temporary
  return (
    <Modal
      BackdropProps={{
        ...BackdropProps,
        ...BackdropPropsProp,
        transitionDuration,
      }}
      BackdropComponent={Backdrop}
      className={clsx(classes.root, classes.modal, className)}
      open={open}
      onClose={onClose}
      ref={ref}
      {...other}
      {...ModalProps}
    >
      {slidingDrawer}
    </Modal>
  );
});

Drawer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Side from which the drawer will appear.
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,
  /**
   * The contents of the drawer.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The elevation of the drawer.
   */
  elevation: PropTypes.number,
  /**
   * Props applied to the [`Modal`](/api/modal/) element.
   */
  ModalProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the drawer is open.
   */
  open: PropTypes.bool,
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: PropTypes.object,
  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps: PropTypes.object,
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
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

export default withStyles(styles, { name: 'MuiDrawer', flip: false })(Drawer);
