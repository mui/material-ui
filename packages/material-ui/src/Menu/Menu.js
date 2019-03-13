// @inheritedComponent Popover

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import withForwardedRef from '../utils/withForwardedRef';
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

class Menu extends React.Component {
  menuListActionsRef = React.createRef();

  componentDidMount() {
    if (this.props.open && this.props.disableAutoFocusItem !== true) {
      this.focus();
    }
  }

  getContentAnchorEl = () => {
    return this.menuListActionsRef.current.getContentAnchorEl();
  };

  focus = () => {
    return this.menuListActionsRef.current && this.menuListActionsRef.current.focus();
  };

  handleEntering = element => {
    const { disableAutoFocusItem, theme } = this.props;

    if (this.menuListActionsRef.current) {
      // Focus so the scroll computation of the Popover works as expected.
      if (disableAutoFocusItem !== true) {
        this.menuListActionsRef.current.focus();
      }
      this.menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }

    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (this.props.onClose) {
        this.props.onClose(event, 'tabKeyDown');
      }
    }
  };

  render() {
    const {
      children,
      classes,
      disableAutoFocusItem,
      innerRef,
      MenuListProps,
      onEntering,
      PaperProps = {},
      PopoverClasses,
      theme,
      ...other
    } = this.props;

    return (
      <Popover
        getContentAnchorEl={this.getContentAnchorEl}
        classes={PopoverClasses}
        onEntering={this.handleEntering}
        anchorOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN}
        transformOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN}
        PaperProps={{
          ...PaperProps,
          classes: {
            ...PaperProps.classes,
            root: classes.paper,
          },
        }}
        ref={innerRef}
        {...other}
      >
        <MenuList
          data-mui-test="Menu"
          onKeyDown={this.handleListKeyDown}
          {...MenuListProps}
          actions={this.menuListActionsRef}
        >
          {children}
        </MenuList>
      </Popover>
    );
  }
}

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
   * @ignore
   * from `withForwardRef`
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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

export default withStyles(styles, { name: 'MuiMenu', withTheme: true })(withForwardedRef(Menu));
