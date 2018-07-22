import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
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
    flexDirection: 'column-reverse', // Place the Actions above the FAB.
    pointerEvents: 'none',
  },
  /* Styles applied to the Button component. */
  fab: {
    pointerEvents: 'auto',
  },
  /* Styles applied to the actions (`children` wrapper) element. */
  actions: {
    display: 'flex',
    flexDirection: 'column-reverse', // Display the first action at the bottom.
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
  state = {
    nextKey: null,
    prevKey: null,
  };

  handleKeyDown = event => {
    const actions = ReactDOM.findDOMNode(this.actionsRef);
    const fab = ReactDOM.findDOMNode(this.fabRef);
    const key = keycode(event);
    const currentFocus = document.activeElement;
    const { open, onClose, onKeyDown } = this.props;
    const { nextKey, prevKey } = this.state;

    const firstKeyPress = (key === 'up' || key === 'down') && nextKey == null;

    if (key === 'up' || key === 'down') {
      event.preventDefault();
    }
    // If not actions, SpeedDial must be focused, so focus the first action.
    if (currentFocus.parentElement.parentElement !== actions) {
      if (open && (firstKeyPress || key === nextKey)) {
        actions.firstChild.firstChild.focus();

        // This determines which key focuses the next / previous action.
        // For example, if a user presses down to select the first action
        // (i.e. following DOM ordering rather than visual ordering),
        // down will select the next action, and up the previous.
        if (nextKey == null) {
          this.setState({ nextKey: key });
          this.setState({ prevKey: key === 'up' ? 'down' : 'up' });
        }
      }
      // Select the previous action or SpeedDial
    } else if (key === prevKey) {
      event.preventDefault();
      if (currentFocus.parentElement.previousElementSibling) {
        currentFocus.parentElement.previousElementSibling.firstChild.focus();
      } else {
        fab.focus();
      }
      // Select the next action
    } else if (key === nextKey) {
      event.preventDefault();
      if (currentFocus.parentElement.nextElementSibling) {
        currentFocus.parentElement.nextElementSibling.firstChild.focus();
      }
      // Close the SpeedDial
    } else if (key === 'esc') {
      fab.focus();
      if (onClose) {
        onClose(event, key);
      }
    }
    // Forward the event
    if (onKeyDown) {
      onKeyDown(event, key);
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
      return React.cloneElement(child, {
        delay,
        open,
        onKeyDown: this.handleKeyDown,
        id: `${id}-item-${validChildCount}`,
      });
    });

    const icon = () => {
      if (!React.isValidElement(iconProp)) {
        return iconProp;
      }
      if (isMuiElement(iconProp, ['SpeedDialIcon'])) {
        return React.cloneElement(iconProp, { open });
      }
      return icon;
    };

    return (
      <div className={classNames(classes.root, classNameProp)} {...other}>
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
            onKeyDown={this.handleKeyDown}
            aria-label={ariaLabel}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : 'false'}
            aria-controls={`${id}-actions`}
            ref={ref => {
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
          className={classNames(classes.actions, { [classes.actionsClosed]: !open })}
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
  TransitionComponent: Zoom,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withStyles(styles, { name: 'MuiSpeedDial' })(SpeedDial);
