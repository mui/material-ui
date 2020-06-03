import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import Modal from '../Modal';
import Backdrop from '../Backdrop';
import Fade from '../Fade';
import { duration } from '../styles/transitions';
import Paper from '../Paper';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    '@media print': {
      // Use !important to override the Modal inline-style.
      position: 'absolute !important',
    },
  },
  /* Styles applied to the container element if `scroll="paper"`. */
  scrollPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Styles applied to the container element if `scroll="body"`. */
  scrollBody: {
    overflowY: 'auto',
    overflowX: 'hidden',
    textAlign: 'center',
    '&:after': {
      content: '""',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: '100%',
      width: '0',
    },
  },
  /* Styles applied to the container element. */
  container: {
    height: '100%',
    '@media print': {
      height: 'auto',
    },
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  },
  /* Styles applied to the `Paper` component. */
  paper: {
    margin: 32,
    position: 'relative',
    overflowY: 'auto', // Fix IE 11 issue, to remove at some point.
    '@media print': {
      overflowY: 'visible',
      boxShadow: 'none',
    },
  },
  /* Styles applied to the `Paper` component if `scroll="paper"`. */
  paperScrollPaper: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 64px)',
  },
  /* Styles applied to the `Paper` component if `scroll="body"`. */
  paperScrollBody: {
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'left', // 'initial' doesn't work on IE 11
  },
  /* Styles applied to the `Paper` component if `maxWidth=false`. */
  paperWidthFalse: {
    maxWidth: 'calc(100% - 64px)',
  },
  /* Styles applied to the `Paper` component if `maxWidth="xs"`. */
  paperWidthXs: {
    maxWidth: Math.max(theme.breakpoints.values.xs, 444),
    '&$paperScrollBody': {
      [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)',
      },
    },
  },
  /* Styles applied to the `Paper` component if `maxWidth="sm"`. */
  paperWidthSm: {
    maxWidth: theme.breakpoints.values.sm,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.sm + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)',
      },
    },
  },
  /* Styles applied to the `Paper` component if `maxWidth="md"`. */
  paperWidthMd: {
    maxWidth: theme.breakpoints.values.md,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.md + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)',
      },
    },
  },
  /* Styles applied to the `Paper` component if `maxWidth="lg"`. */
  paperWidthLg: {
    maxWidth: theme.breakpoints.values.lg,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.lg + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)',
      },
    },
  },
  /* Styles applied to the `Paper` component if `maxWidth="xl"`. */
  paperWidthXl: {
    maxWidth: theme.breakpoints.values.xl,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.xl + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)',
      },
    },
  },
  /* Styles applied to the `Paper` component if `fullWidth={true}`. */
  paperFullWidth: {
    width: 'calc(100% - 64px)',
  },
  /* Styles applied to the `Paper` component if `fullScreen={true}`. */
  paperFullScreen: {
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'none',
    borderRadius: 0,
    '&$paperScrollBody': {
      margin: 0,
      maxWidth: '100%',
    },
  },
});

const defaultTransitionDuration = { enter: duration.enteringScreen, exit: duration.leavingScreen };
/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
const Dialog = React.forwardRef(function Dialog(props, ref) {
  const {
    BackdropProps,
    children,
    classes,
    className,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onBackdropClick,
    onClose,
    onEnter,
    onEntered,
    onEntering,
    onEscapeKeyDown,
    onExit,
    onExited,
    onExiting,
    open,
    PaperComponent = Paper,
    PaperProps = {},
    scroll = 'paper',
    TransitionComponent = Fade,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledby,
    ...other
  } = props;

  const mouseDownTarget = React.useRef();
  const handleMouseDown = (event) => {
    mouseDownTarget.current = event.target;
  };
  const handleBackdropClick = (event) => {
    // Ignore the events not coming from the "backdrop"
    // We don't want to close the dialog when clicking the dialog content.
    if (event.target !== event.currentTarget) {
      return;
    }

    // Make sure the event starts and ends on the same DOM element.
    if (event.target !== mouseDownTarget.current) {
      return;
    }

    mouseDownTarget.current = null;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  };

  return (
    <Modal
      className={clsx(classes.root, className)}
      BackdropComponent={Backdrop}
      BackdropProps={{
        transitionDuration,
        ...BackdropProps,
      }}
      closeAfterTransition
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
      onEscapeKeyDown={onEscapeKeyDown}
      onClose={onClose}
      open={open}
      ref={ref}
      {...other}
    >
      <TransitionComponent
        appear
        in={open}
        timeout={transitionDuration}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        role="none presentation"
        {...TransitionProps}
      >
        {/* roles are applied via cloneElement from TransitionComponent */}
        {/* roles needs to be applied on the immediate child of Modal or it'll inject one */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={clsx(classes.container, classes[`scroll${capitalize(scroll)}`])}
          onMouseUp={handleBackdropClick}
          onMouseDown={handleMouseDown}
          data-mui-test="FakeBackdrop"
        >
          <PaperComponent
            elevation={24}
            role="dialog"
            aria-describedby={ariaDescribedby}
            aria-labelledby={ariaLabelledby}
            {...PaperProps}
            className={clsx(
              classes.paper,
              classes[`paperScroll${capitalize(scroll)}`],
              classes[`paperWidth${capitalize(String(maxWidth))}`],
              {
                [classes.paperFullScreen]: fullScreen,
                [classes.paperFullWidth]: fullWidth,
              },
              PaperProps.className,
            )}
          >
            {children}
          </PaperComponent>
        </div>
      </TransitionComponent>
    </Modal>
  );
});

Dialog.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby': PropTypes.string,
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,
  /**
   * Dialog children, usually the included sub-components.
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
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   */
  disableBackdropClick: PropTypes.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   */
  disableEscapeKeyDown: PropTypes.bool,
  /**
   * If `true`, the dialog will be full-screen
   */
  fullScreen: PropTypes.bool,
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   */
  fullWidth: PropTypes.bool,
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs', false]),
  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired before the dialog enters.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired when the dialog has entered.
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired when the dialog is entering.
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired when the escape key is pressed,
   * `disableKeyboard` is false and the modal is in focus.
   */
  onEscapeKeyDown: PropTypes.func,
  /**
   * Callback fired before the dialog exits.
   */
  onExit: PropTypes.func,
  /**
   * Callback fired when the dialog has exited.
   */
  onExited: PropTypes.func,
  /**
   * Callback fired when the dialog is exiting.
   */
  onExiting: PropTypes.func,
  /**
   * If `true`, the Dialog is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The component used to render the body of the dialog.
   */
  PaperComponent: PropTypes.elementType,
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: PropTypes.object,
  /**
   * Determine the container for scrolling the dialog.
   */
  scroll: PropTypes.oneOf(['body', 'paper']),
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
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
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiDialog' })(Dialog);
