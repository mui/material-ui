'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useId from '@mui/utils/useId';
import capitalize from '../utils/capitalize';
import Modal from '../Modal';
import Fade from '../Fade';
import Paper from '../Paper';
import dialogClasses, { getDialogUtilityClass } from './dialogClasses';
import DialogContext from './DialogContext';
import Backdrop from '../Backdrop';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

import { useDefaultProps } from '../DefaultPropsProvider';

const DialogBackdrop = styled(Backdrop, {
  name: 'MuiDialog',
  slot: 'Backdrop',
  overrides: (props, styles) => styles.backdrop,
})({
  // Improve scrollable dialog support.
  zIndex: -1,
});

const useUtilityClasses = (ownerState) => {
  const { classes, scroll, maxWidth, fullWidth, fullScreen } = ownerState;

  const slots = {
    root: ['root'],
    container: ['container', `scroll${capitalize(scroll)}`],
    paper: [
      'paper',
      `paperScroll${capitalize(scroll)}`,
      `paperWidth${capitalize(String(maxWidth))}`,
      fullWidth && 'paperFullWidth',
      fullScreen && 'paperFullScreen',
    ],
  };

  return composeClasses(slots, getDialogUtilityClass, classes);
};

const DialogRoot = styled(Modal, {
  name: 'MuiDialog',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  '@media print': {
    // Use !important to override the Modal inline-style.
    position: 'absolute !important',
  },
});

const DialogContainer = styled('div', {
  name: 'MuiDialog',
  slot: 'Container',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.container, styles[`scroll${capitalize(ownerState.scroll)}`]];
  },
})({
  height: '100%',
  '@media print': {
    height: 'auto',
  },
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  variants: [
    {
      props: {
        scroll: 'paper',
      },
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    {
      props: {
        scroll: 'body',
      },
      style: {
        overflowY: 'auto',
        overflowX: 'hidden',
        textAlign: 'center',
        '&::after': {
          content: '""',
          display: 'inline-block',
          verticalAlign: 'middle',
          height: '100%',
          width: '0',
        },
      },
    },
  ],
});

const DialogPaper = styled(Paper, {
  name: 'MuiDialog',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.paper,
      styles[`scrollPaper${capitalize(ownerState.scroll)}`],
      styles[`paperWidth${capitalize(String(ownerState.maxWidth))}`],
      ownerState.fullWidth && styles.paperFullWidth,
      ownerState.fullScreen && styles.paperFullScreen,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    margin: 32,
    position: 'relative',
    '@media print': {
      overflowY: 'visible',
      boxShadow: 'none',
    },
    variants: [
      {
        props: {
          scroll: 'paper',
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100% - 64px)',
        },
      },
      {
        props: {
          scroll: 'body',
        },
        style: {
          display: 'inline-block',
          verticalAlign: 'middle',
          textAlign: 'initial',
        },
      },
      {
        props: ({ ownerState }) => !ownerState.maxWidth,
        style: {
          maxWidth: 'calc(100% - 64px)',
        },
      },
      {
        props: {
          maxWidth: 'xs',
        },
        style: {
          maxWidth:
            theme.breakpoints.unit === 'px'
              ? Math.max(theme.breakpoints.values.xs, 444)
              : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)`,
          [`&.${dialogClasses.paperScrollBody}`]: {
            [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
              maxWidth: 'calc(100% - 64px)',
            },
          },
        },
      },
      ...Object.keys(theme.breakpoints.values)
        .filter((maxWidth) => maxWidth !== 'xs')
        .map((maxWidth) => ({
          props: { maxWidth },
          style: {
            maxWidth: `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit}`,
            [`&.${dialogClasses.paperScrollBody}`]: {
              [theme.breakpoints.down(theme.breakpoints.values[maxWidth] + 32 * 2)]: {
                maxWidth: 'calc(100% - 64px)',
              },
            },
          },
        })),
      {
        props: ({ ownerState }) => ownerState.fullWidth,
        style: {
          width: 'calc(100% - 64px)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.fullScreen,
        style: {
          margin: 0,
          width: '100%',
          maxWidth: '100%',
          height: '100%',
          maxHeight: 'none',
          borderRadius: 0,
          [`&.${dialogClasses.paperScrollBody}`]: {
            margin: 0,
            maxWidth: '100%',
          },
        },
      },
    ],
  })),
);

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
const Dialog = React.forwardRef(function Dialog(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiDialog' });
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledbyProp,
    BackdropComponent,
    BackdropProps,
    children,
    className,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onBackdropClick,
    onClick,
    onClose,
    open,
    PaperComponent = Paper,
    PaperProps = {},
    scroll = 'paper',
    TransitionComponent = Fade,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    ...other
  } = props;

  const ownerState = {
    ...props,
    disableEscapeKeyDown,
    fullScreen,
    fullWidth,
    maxWidth,
    scroll,
  };

  const classes = useUtilityClasses(ownerState);

  const backdropClick = React.useRef();
  const handleMouseDown = (event) => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };
  const handleBackdropClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return;
    }

    backdropClick.current = null;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const ariaLabelledby = useId(ariaLabelledbyProp);
  const dialogContextValue = React.useMemo(() => {
    return { titleId: ariaLabelledby };
  }, [ariaLabelledby]);

  return (
    <DialogRoot
      className={clsx(classes.root, className)}
      closeAfterTransition
      components={{ Backdrop: DialogBackdrop }}
      componentsProps={{
        backdrop: {
          transitionDuration,
          as: BackdropComponent,
          ...BackdropProps,
        },
      }}
      disableEscapeKeyDown={disableEscapeKeyDown}
      onClose={onClose}
      open={open}
      ref={ref}
      onClick={handleBackdropClick}
      ownerState={ownerState}
      {...other}
    >
      <TransitionComponent
        appear
        in={open}
        timeout={transitionDuration}
        role="presentation"
        {...TransitionProps}
      >
        {/* roles are applied via cloneElement from TransitionComponent */}
        {/* roles needs to be applied on the immediate child of Modal or it'll inject one */}
        <DialogContainer
          className={clsx(classes.container)}
          onMouseDown={handleMouseDown}
          ownerState={ownerState}
        >
          <DialogPaper
            as={PaperComponent}
            elevation={24}
            role="dialog"
            aria-describedby={ariaDescribedby}
            aria-labelledby={ariaLabelledby}
            {...PaperProps}
            className={clsx(classes.paper, PaperProps.className)}
            ownerState={ownerState}
          >
            <DialogContext.Provider value={dialogContextValue}>{children}</DialogContext.Provider>
          </DialogPaper>
        </DialogContainer>
      </TransitionComponent>
    </DialogRoot>
  );
});

Dialog.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby': PropTypes.string,
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: PropTypes.elementType,
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
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: PropTypes.bool,
  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: PropTypes.bool,
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
    PropTypes.string,
  ]),
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: PropTypes.elementType,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   * @default {}
   */
  PaperProps: PropTypes.object,
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: PropTypes.oneOf(['body', 'paper']),
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
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: PropTypes.object,
};

export default Dialog;
