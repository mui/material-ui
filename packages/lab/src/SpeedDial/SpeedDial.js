import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import keycode from 'keycode';
import { withStyles } from 'material-ui/styles';
import Zoom from 'material-ui/transitions/Zoom';
import { duration } from 'material-ui/styles/transitions';
import Button from 'material-ui/Button';
import { isMuiElement } from 'material-ui/utils/reactHelpers';

const styles = {
  root: {
    width: 56,
    zIndex: 1050,
    display: 'flex',
    flexDirection: 'column-reverse', // Place the Actions above the FAB.
    transformOrigin: 'center center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column-reverse', // Display the first action at the bottom.
    marginBottom: 16,
  },
  actionsClosed: {
    transition: 'top 0s linear 0.2s',
  },
};

class SpeedDial extends React.Component {
  state = {
    nextKey: null,
    prevKey: null,
  };

  handleKeyDown = (event: SyntheticUIEvent<>) => {
    const actions = findDOMNode(this.actions);
    const fab = findDOMNode(this.fab);
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
        // For example, if a visually impaired user presses down to select the first action
        // (i.e. following DOM ordering), down will select the next action, and up the previous.
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
        findDOMNode(this.fab).focus();
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
      onClose,
      onKeyDown,
      open,
      openIcon,
      transition: Transition,
      transitionDuration,
      ...other
    } = this.props;

    const rootClassName = classNames(classes.root, classNameProp);
    const actionsClassName = classNames(classes.actions, { [classes.actionsClosed]: !open });

    // Filter the label for valid id characters.
    const id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');

    let totalValidChildren = 0;
    React.Children.forEach(childrenProp, child => {
      if (React.isValidElement(child)) totalValidChildren += 1;
    });

    let validChildCount = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) return null;
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
      <div className={rootClassName} {...other}>
        <Transition in={!hidden} timeout={transitionDuration} mountOnEnter unmountOnExit>
          <Button
            variant="fab"
            color="primary"
            onKeyDown={this.handleKeyDown}
            aria-label={ariaLabel}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : 'false'}
            aria-controls={`${id}-actions`}
            ref={fab => {
              this.fab = fab;
            }}
            data-mui-test="SpeedDialAction"
            {...ButtonProps}
          >
            {icon()}
          </Button>
        </Transition>
        <div
          id={`${id}-actions`}
          className={actionsClassName}
          ref={actions => {
            this.actions = actions;
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
   * Properties applied to the `Button` element.
   */
  ButtonProps: PropTypes.object,
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
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
  transition: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

SpeedDial.defaultProps = {
  hidden: false,
  open: false,
  transition: Zoom,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withStyles(styles)(SpeedDial);
