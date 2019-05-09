import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Popover from '../Popover';
import MenuList from '../MenuList';
import warning from 'warning';
import ReactDOM from 'react-dom';
import { setRef } from '../utils/reactHelpers';

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
  /* Styles applied to the `List` component via `MenuList`. */
  list: {
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
  },
};

const Menu = React.forwardRef(function Menu(props, ref) {
  const {
    autoFocus: autoFocusProp,
    children,
    classes,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    onEntering,
    open,
    PaperProps = {},
    PopoverClasses,
    theme,
    transitionDuration = 'auto',
    variant = 'selectedMenu',
    ...other
  } = props;

  const autoFocus = autoFocusProp !== undefined ? autoFocusProp : !disableAutoFocusItem;

  const menuListActionsRef = React.useRef(null);
  const firstValidItemRef = React.useRef(null);
  const firstSelectedItemRef = React.useRef(null);

  const getContentAnchorEl = () => firstSelectedItemRef.current || firstValidItemRef.current;

  const handleEntering = element => {
    if (menuListActionsRef.current) {
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

  let firstValidElementIndex = null;
  let firstSelectedIndex = null;

  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    warning(
      child.type !== React.Fragment,
      [
        "Material-UI: the Menu component doesn't accept a Fragment as a child.",
        'Consider providing an array instead.',
      ].join('\n'),
    );
    if (firstValidElementIndex === null) {
      firstValidElementIndex = index;
    }
    let newChildProps = null;
    if (
      variant === 'selectedMenu' &&
      firstSelectedIndex === null &&
      child.props.selected &&
      !child.props.disabled
    ) {
      firstSelectedIndex = index;
      newChildProps = {};
      if (autoFocus) {
        newChildProps.autoFocus = true;
      }
      if (child.props.tabIndex === undefined) {
        newChildProps.tabIndex = 0;
      }
      newChildProps.ref = instance => {
        // #StrictMode ready
        firstSelectedItemRef.current = ReactDOM.findDOMNode(instance);
        setRef(child.ref, instance);
      };
    } else if (index === firstValidElementIndex) {
      newChildProps = {
        ref: instance => {
          // #StrictMode ready
          firstValidItemRef.current = ReactDOM.findDOMNode(instance);
          setRef(child.ref, instance);
        },
      };
    }

    if (newChildProps !== null) {
      return React.cloneElement(child, newChildProps);
    }
    return child;
  });

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
      transitionDuration={transitionDuration}
      {...other}
    >
      <MenuList
        data-mui-test="Menu"
        onKeyDown={handleListKeyDown}
        actions={menuListActionsRef}
        autoFocus={autoFocus && firstSelectedIndex === null}
        {...MenuListProps}
        className={clsx(classes.list, MenuListProps.className)}
      >
        {items}
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
   * If `true` (default), the menu list (possibly a particular item depending on the menu variant) will receive focus on open.
   */
  autoFocus: PropTypes.bool,
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
   * Same as `autoFocus=false`.
   * @deprecated Use `autoFocus` instead
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
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
};

export default withStyles(styles, { name: 'MuiMenu', withTheme: true })(Menu);
