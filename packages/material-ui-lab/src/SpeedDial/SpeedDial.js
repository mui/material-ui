import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keycode from 'keycode';
import warning from 'warning';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { duration } from '@material-ui/core/styles/transitions';
import Button from '@material-ui/core/Button';
import { isMuiElement } from '@material-ui/core/utils/reactHelpers';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    zIndex: 1050,
    display: 'flex',
    pointerEvents: 'none',
  },
  /* Styles applied to the Button component. */
  fab: {
    pointerEvents: 'auto',
  },
  /* Styles applied to the root and action container elements when direction="up" */
  directionUp: {
    flexDirection: 'column-reverse',
  },
  /* Styles applied to the root and action container elements when direction="down" */
  directionDown: {
    flexDirection: 'column',
  },
  /* Styles applied to the root and action container elements when direction="left" */
  directionLeft: {
    flexDirection: 'row-reverse',
  },
  /* Styles applied to the root and action container elements when direction="right" */
  directionRight: {
    flexDirection: 'row',
  },
  /* Styles applied to the actions (`children` wrapper) element. */
  actions: {
    display: 'flex',
    paddingBottom: 16,
    pointerEvents: 'auto',
  },
  /* Styles applied to the actions (`children` wrapper) element if `open={false}`. */
  actionsClosed: {
    transition: 'top 0s linear 0.2s',
    pointerEvents: 'none',
  },
};

class SpeedDial extends React.Component {
  /**
   * refs to all children SpeedDialActions
   */
  actions = [];

  state = {
    focusedAction: -1,
  };

  handleButtonKeyDown = event => {
    const key = keycode(event);
    const { direction, open } = this.props;

    if (open && key === direction) {
      event.preventDefault();

      const focusedAction = 0;
      const firstActionRef = this.actions[focusedAction];
      if (firstActionRef != null) {
        firstActionRef.focus();
        this.setState({ focusedAction });
      }
    }
  };

  handleActionButtonKeyDown = event => {
    const key = keycode(event);
    const { direction, onClose } = this.props;
    const { focusedAction } = this.state;

    const directionAxis = direction === 'up' || direction === 'down' ? 'vertical' : 'horizontal';
    const isNavigating =
      (directionAxis === 'vertical' && (key === 'up' || key === 'down')) ||
      (directionAxis === 'horizontal' && (key === 'left' || key === 'right'));

    if (key === 'esc') {
      this.fabRef.focus();
      if (onClose) {
        onClose(event, key);
      }
    } else if (isNavigating) {
      event.preventDefault();

      const actionStep = key === direction ? 1 : -1;

      // consider the actions as a ring
      const nextAction = (focusedAction + actionStep + this.actions.length) % this.actions.length;
      const nextActionRef = this.actions[nextAction];
      nextActionRef.focus();
      this.setState({ focusedAction: nextAction });
    }
  };

  createHandleSpeedDialActionButtonRef = (dialActionIndex, origButtonRef) => ref => {
    this.actions[dialActionIndex] = ref;
    if (origButtonRef) {
      origButtonRef(ref);
    }
  };

  render() {
    const {
      ariaLabel,
      ButtonProps,
      children: childrenProp,
      classes,
      className: classNameProp,
      hidden,
      icon: iconProp,
      onClick,
      onClose,
      onKeyDown,
      open,
      direction,
      openIcon,
      TransitionComponent,
      transitionDuration,
      TransitionProps,
      ...other
    } = this.props;

    // Filter the label for valid id characters.
    const id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');

    let totalValidChildren = 0;
    React.Children.forEach(childrenProp, child => {
      if (React.isValidElement(child)) totalValidChildren += 1;
    });

    this.actions = [];
    let validChildCount = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      warning(
        child.type !== React.Fragment,
        [
          "Material-UI: the SpeedDial component doesn't accept a Fragment as a child.",
          'Consider providing an array instead.',
        ].join('\n'),
      );

      const delay = 30 * (open ? validChildCount : totalValidChildren - validChildCount);
      validChildCount += 1;

      const { ButtonProps: { buttonRef: origButtonRef, ...ChildButtonProps } = {} } = child.props;
      const NewChildButtonProps = {
        ...ChildButtonProps,
        buttonRef: this.createHandleSpeedDialActionButtonRef(validChildCount - 1, origButtonRef),
      };

      return React.cloneElement(child, {
        ButtonProps: NewChildButtonProps,
        delay,
        onKeyDown: this.handleActionButtonKeyDown,
        open,
        id: `${id}-item-${validChildCount}`,
      });
    });

    const icon = () => {
      if (React.isValidElement(iconProp) && isMuiElement(iconProp, ['SpeedDialIcon'])) {
        return React.cloneElement(iconProp, { open });
      }
      return iconProp;
    };

    const actionsPlacementClass = {
      [classes.directionUp]: direction === 'up',
      [classes.directionDown]: direction === 'down',
      [classes.directionLeft]: direction === 'left',
      [classes.directionRight]: direction === 'right',
    };

    return (
      <div className={classNames(classes.root, actionsPlacementClass, classNameProp)} {...other}>
        <TransitionComponent
          in={!hidden}
          timeout={transitionDuration}
          unmountOnExit
          {...TransitionProps}
        >
          <Button
            variant="fab"
            color="primary"
            onClick={onClick}
            onKeyDown={this.handleButtonKeyDown}
            aria-label={ariaLabel}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : 'false'}
            aria-controls={`${id}-actions`}
            buttonRef={ref => {
              this.fabRef = ref;
            }}
            className={classes.fab}
            {...ButtonProps}
          >
            {icon()}
          </Button>
        </TransitionComponent>
        <div
          id={`${id}-actions`}
          className={classNames(
            classes.actions,
            { [classes.actionsClosed]: !open },
            actionsPlacementClass,
          )}
          ref={ref => {
            this.actionsRef = ref;
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

SpeedDial.propTypes = {
  /**
   * The aria-label of the `Button` element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * Properties applied to the [`Button`](/api/button) element.
   */
  ButtonProps: PropTypes.object,
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The direction the actions open relative to the floating action button.
   */
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  /**
   * If `true`, the SpeedDial will be hidden.
   */
  hidden: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Floating Action Button. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon: PropTypes.element.isRequired,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   * @param {string} key The key pressed
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * If `true`, the SpeedDial is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node,
  /**
   * Transition component.
   */
  TransitionComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
  /**
   * Properties applied to the `Transition` element.
   */
  TransitionProps: PropTypes.object,
};

SpeedDial.defaultProps = {
  hidden: false,
  direction: 'up',
  TransitionComponent: Zoom,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withStyles(styles, { name: 'MuiSpeedDial' })(SpeedDial);
