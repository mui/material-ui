import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge, HTMLElementType } from '@material-ui/utils';
import MenuList from '../MenuList';
import Paper from '../Paper';
import Popover from '../Popover';
import experimentalStyled, { shouldForwardProp } from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import setRef from '../utils/setRef';
import menuClasses, { getMenuUtilityClass } from './menuClasses';

const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left',
};

const overridesResolver = (props, styles) => {
  return deepmerge(styles.popover || {}, {
    [`& .${menuClasses.paper}`]: styles.paper,
    [`& .${menuClasses.list}`]: styles.list,
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    popover: ['popover'],
    paper: ['paper'],
    list: ['list'],
  };

  return composeClasses(slots, getMenuUtilityClass, classes);
};

const MenuPopover = experimentalStyled(
  Popover,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiMenu',
    slot: 'Popover',
    overridesResolver,
  },
)({});

const MenuPaper = experimentalStyled(
  Paper,
  {},
  {
    name: 'MuiMenu',
    slot: 'Paper',
  },
)({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tapable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: 'calc(100% - 96px)',
  // Add iOS momentum scrolling.
  WebkitOverflowScrolling: 'touch',
});

const MenuMenuList = experimentalStyled(
  MenuList,
  {},
  {
    name: 'MuiMenu',
    slot: 'List',
  },
)({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const { isRtl, theme, ...props } = useThemeProps({ props: inProps, name: 'MuiMenu' });

  const {
    autoFocus = true,
    children,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open,
    // eslint-disable-next-line react/prop-types
    PaperProps = {},
    PopoverClasses,
    transitionDuration = 'auto',
    variant = 'selectedMenu',
    TransitionProps: { onEntering, ...TransitionProps } = {},
    ...other
  } = props;

  const styleProps = {
    ...props,
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    PaperProps,
    transitionDuration,
    variant,
    onEntering,
    TransitionProps,
  };

  const classes = useUtilityClasses(styleProps);

  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;

  const menuListActionsRef = React.useRef(null);
  const contentAnchorRef = React.useRef(null);

  const getContentAnchorEl = () => contentAnchorRef.current;

  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }

    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (onClose) {
        onClose(event, 'tabKeyDown');
      }
    }
  };

  /**
   * the index of the item should receive focus
   * in a `variant="selectedMenu"` it's the first `selected` item
   * otherwise it's the very first item.
   */
  let activeItemIndex = -1;
  // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback
  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "Material-UI: The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    if (!child.props.disabled) {
      if (variant === 'selectedMenu' && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });

  const items = React.Children.map(children, (child, index) => {
    if (index === activeItemIndex) {
      return React.cloneElement(child, {
        ref: (instance) => {
          contentAnchorRef.current = instance;
          setRef(child.ref, instance);
        },
      });
    }

    return child;
  });

  return (
    <MenuPopover
      getContentAnchorEl={getContentAnchorEl}
      classes={PopoverClasses}
      onClose={onClose}
      anchorOrigin={isRtl ? RTL_ORIGIN : LTR_ORIGIN}
      transformOrigin={isRtl ? RTL_ORIGIN : LTR_ORIGIN}
      PaperProps={{
        component: MenuPaper,
        ...PaperProps,
        classes: {
          ...PaperProps.classes,
          root: classes.paper,
        },
      }}
      open={open}
      ref={ref}
      transitionDuration={transitionDuration}
      TransitionProps={{ onEntering: handleEntering, ...TransitionProps }}
      styleProps={styleProps}
      {...other}
    >
      <MenuMenuList
        onKeyDown={handleListKeyDown}
        actions={menuListActionsRef}
        autoFocus={autoFocus && (activeItemIndex === -1 || disableAutoFocusItem)}
        autoFocusItem={autoFocusItem}
        variant={variant}
        {...MenuListProps}
        className={clsx(classes.list, MenuListProps.className)}
      >
        {items}
      </MenuMenuList>
    </MenuPopover>
  );
});

Menu.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: PropTypes.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: PropTypes.bool,
  /**
   * Props applied to the [`MenuList`](/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * `classes` prop applied to the [`Popover`](/api/popover/) element.
   */
  PopoverClasses: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   * @default {}
   */
  TransitionProps: PropTypes.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
};

export default Menu;
