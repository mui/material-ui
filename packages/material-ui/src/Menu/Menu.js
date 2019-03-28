// @inheritedComponent Popover

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Popover from '../Popover';
import MenuList from '../MenuList';

const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left',
};

export const styles = {
  /* Styles applied to the `Paper` component. */
  paper: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tapable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100% - 96px)',
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: 'touch',
  },
};

const Menu = React.forwardRef(function Menu(props, ref) {
  const {
    children,
    classes,
    disableAutoFocusItem,
    MenuListProps,
    onClose,
    onEntering,
    open,
    PaperProps = {},
    PopoverClasses,
    theme,
    ...other
  } = props;
  const menuListActionsRef = React.useRef();

  const getContentAnchorEl = () => {
    return menuListActionsRef.current.getContentAnchorEl();
  };

  const handleEntering = element => {
    if (menuListActionsRef.current) {
      // Focus so the scroll computation of the Popover works as expected.
      if (disableAutoFocusItem !== true) {
        menuListActionsRef.current.focus();
      }
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }

    if (onEntering) {
      onEntering(element);
    }
  };

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (onClose) {
        onClose(event, 'tabKeyDown');
      }
    }
  };

  return (
    <Popover
      getContentAnchorEl={getContentAnchorEl}
      classes={PopoverClasses}
      onClose={onClose}
      onEntering={handleEntering}
      anchorOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN}
      transformOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN}
      PaperProps={{
        ...PaperProps,
        classes: {
          ...PaperProps.classes,
          root: classes.paper,
        },
      }}
      open={open}
      ref={ref}
      {...other}
    >
      <MenuList
        data-mui-test="Menu"
        onKeyDown={handleListKeyDown}
        {...MenuListProps}
        actions={menuListActionsRef}
      >
        {children}
      </MenuList>
    </Popover>
  );
});

Menu.propTypes = {
  /**
   * The DOM element used to set the position of the menu.
   */
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * If `true`, the selected / first menu item will not be auto focused.
   */
  disableAutoFocusItem: PropTypes.bool,
  /**
   * Properties applied to the [`MenuList`](/api/menu-list/) element.
   */
  MenuListProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`
   */
  onClose: PropTypes.func,
  /**
   * Callback fired before the Menu enters.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired when the Menu has entered.
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired when the Menu is entering.
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired before the Menu exits.
   */
  onExit: PropTypes.func,
  /**
   * Callback fired when the Menu has exited.
   */
  onExited: PropTypes.func,
  /**
   * Callback fired when the Menu is exiting.
   */
  onExiting: PropTypes.func,
  /**
   * If `true`, the menu is visible.
   */
  open: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: PropTypes.object,
  /**
   * `classes` property applied to the [`Popover`](/api/popover/) element.
   */
  PopoverClasses: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The length of the transition in `ms`, or 'auto'
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
};

Menu.defaultProps = {
  disableAutoFocusItem: false,
  transitionDuration: 'auto',
};

export default withStyles(styles, { name: 'MuiMenu', withTheme: true })(Menu);
