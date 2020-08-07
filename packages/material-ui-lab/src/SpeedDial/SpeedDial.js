import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { duration, withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { capitalize, isMuiElement, useForkRef } from '@material-ui/core/utils';

function getOrientation(direction) {
  if (direction === 'up' || direction === 'down') {
    return 'vertical';
  }
  if (direction === 'right' || direction === 'left') {
    return 'horizontal';
  }
  return undefined;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

const dialRadius = 32;
const spacingActions = 16;

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    zIndex: theme.zIndex.speedDial,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  /* Styles applied to the Fab component. */
  fab: {
    pointerEvents: 'auto',
  },
  /* Styles applied to the root if direction="up" */
  directionUp: {
    flexDirection: 'column-reverse',
    '& $actions': {
      flexDirection: 'column-reverse',
      marginBottom: -dialRadius,
      paddingBottom: spacingActions + dialRadius,
    },
  },
  /* Styles applied to the root if direction="down" */
  directionDown: {
    flexDirection: 'column',
    '& $actions': {
      flexDirection: 'column',
      marginTop: -dialRadius,
      paddingTop: spacingActions + dialRadius,
    },
  },
  /* Styles applied to the root if direction="left" */
  directionLeft: {
    flexDirection: 'row-reverse',
    '& $actions': {
      flexDirection: 'row-reverse',
      marginRight: -dialRadius,
      paddingRight: spacingActions + dialRadius,
    },
  },
  /* Styles applied to the root if direction="right" */
  directionRight: {
    flexDirection: 'row',
    '& $actions': {
      flexDirection: 'row',
      marginLeft: -dialRadius,
      paddingLeft: spacingActions + dialRadius,
    },
  },
  /* Styles applied to the actions (`children` wrapper) element. */
  actions: {
    display: 'flex',
    pointerEvents: 'auto',
  },
  /* Styles applied to the actions (`children` wrapper) element if `open={false}`. */
  actionsClosed: {
    transition: 'top 0s linear 0.2s',
    pointerEvents: 'none',
  },
});

const SpeedDial = React.forwardRef(function SpeedDial(props, ref) {
  const {
    ariaLabel,
    FabProps: { ref: origDialButtonRef, ...FabProps } = {},
    children: childrenProp,
    classes,
    className,
    direction = 'up',
    hidden = false,
    icon,
    onBlur,
    onClose,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onOpen,
    open,
    openIcon,
    TransitionComponent = Zoom,
    transitionDuration = {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
    TransitionProps,
    ...other
  } = props;

  const eventTimer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(eventTimer.current);
    };
  }, []);

  /**
   * an index in actions.current
   */
  const focusedAction = React.useRef(0);

  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */
  const nextItemArrowKey = React.useRef();

  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */
  const actions = React.useRef([]);
  actions.current = [actions.current[0]];

  const handleOwnFabRef = React.useCallback((fabFef) => {
    actions.current[0] = fabFef;
  }, []);
  const handleFabRef = useForkRef(origDialButtonRef, handleOwnFabRef);

  /**
   * creates a ref callback for the Button in a SpeedDialAction
   * Is called before the original ref callback for Button that was set in buttonProps
   *
   * @param dialActionIndex {number}
   * @param origButtonRef {React.RefObject?}
   */
  const createHandleSpeedDialActionButtonRef = (dialActionIndex, origButtonRef) => {
    return (buttonRef) => {
      actions.current[dialActionIndex + 1] = buttonRef;
      if (origButtonRef) {
        origButtonRef(buttonRef);
      }
    };
  };

  const handleKeyDown = (event) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    const key = event.key.replace('Arrow', '').toLowerCase();
    const { current: nextItemArrowKeyCurrent = key } = nextItemArrowKey;

    if (event.key === 'Escape') {
      if (onClose) {
        actions.current[0].focus();
        onClose(event, 'escapeKeyDown');
      }
      return;
    }

    if (
      getOrientation(key) === getOrientation(nextItemArrowKeyCurrent) &&
      getOrientation(key) !== undefined
    ) {
      event.preventDefault();

      const actionStep = key === nextItemArrowKeyCurrent ? 1 : -1;

      // stay within array indices
      const nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
      actions.current[nextAction].focus();
      focusedAction.current = nextAction;
      nextItemArrowKey.current = nextItemArrowKeyCurrent;
    }
  };

  React.useEffect(() => {
    // actions were closed while navigation state was not reset
    if (!open) {
      focusedAction.current = 0;
      nextItemArrowKey.current = undefined;
    }
  }, [open]);

  const handleClose = (event) => {
    if (event.type === 'mouseleave' && onMouseLeave) {
      onMouseLeave(event);
    }

    if (event.type === 'blur' && onBlur) {
      onBlur(event);
    }

    clearTimeout(eventTimer.current);

    if (onClose) {
      if (event.type === 'blur') {
        event.persist();
        eventTimer.current = setTimeout(() => {
          onClose(event, 'blur');
        });
      } else {
        onClose(event, 'mouseLeave');
      }
    }
  };

  const handleClick = (event) => {
    if (FabProps.onClick) {
      FabProps.onClick(event);
    }

    clearTimeout(eventTimer.current);

    if (open) {
      if (onClose) {
        onClose(event, 'toggle');
      }
    } else if (onOpen) {
      onOpen(event, 'toggle');
    }
  };

  const handleOpen = (event) => {
    if (event.type === 'mouseenter' && onMouseEnter) {
      onMouseEnter(event);
    }

    if (event.type === 'focus' && onFocus) {
      onFocus(event);
    }

    // When moving the focus between two items,
    // a chain if blur and focus event is triggered.
    // We only handle the last event.
    clearTimeout(eventTimer.current);

    if (onOpen && !open) {
      event.persist();
      // Wait for a future focus or click event
      eventTimer.current = setTimeout(() => {
        const eventMap = {
          focus: 'focus',
          mouseenter: 'mouseEnter',
        };

        onOpen(event, eventMap[event.type]);
      });
    }
  };

  // Filter the label for valid id characters.
  const id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');

  const allItems = React.Children.toArray(childrenProp).filter((child) => {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "Material-UI: The SpeedDial component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    return React.isValidElement(child);
  });

  const children = allItems.map((child, index) => {
    const { FabProps: { ref: origButtonRef, ...ChildFabProps } = {} } = child.props;

    return React.cloneElement(child, {
      FabProps: {
        ...ChildFabProps,
        ref: createHandleSpeedDialActionButtonRef(index, origButtonRef),
      },
      delay: 30 * (open ? index : allItems.length - index),
      open,
      id: `${id}-action-${index}`,
    });
  });

  return (
    <div
      className={clsx(classes.root, classes[`direction${capitalize(direction)}`], className)}
      ref={ref}
      role="presentation"
      onKeyDown={handleKeyDown}
      onBlur={handleClose}
      onFocus={handleOpen}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      {...other}
    >
      <TransitionComponent
        in={!hidden}
        timeout={transitionDuration}
        unmountOnExit
        {...TransitionProps}
      >
        <Fab
          color="primary"
          aria-label={ariaLabel}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={`${id}-actions`}
          {...FabProps}
          onClick={handleClick}
          className={clsx(classes.fab, FabProps.className)}
          ref={handleFabRef}
        >
          {React.isValidElement(icon) && isMuiElement(icon, ['SpeedDialIcon'])
            ? React.cloneElement(icon, { open })
            : icon}
        </Fab>
      </TransitionComponent>
      <div
        id={`${id}-actions`}
        role="menu"
        aria-orientation={getOrientation(direction)}
        className={clsx(classes.actions, { [classes.actionsClosed]: !open })}
      >
        {children}
      </div>
    </div>
  );
});

SpeedDial.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
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
   * The direction the actions open relative to the floating action button.
   */
  direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  /**
   * Props applied to the [`Fab`](/api/fab/) element.
   */
  FabProps: PropTypes.object,
  /**
   * If `true`, the SpeedDial will be hidden.
   */
  hidden: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"focus"`, `"mouseEnter"`.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the SpeedDial is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon: PropTypes.node,
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

export default withStyles(styles, { name: 'MuiSpeedDial' })(SpeedDial);
