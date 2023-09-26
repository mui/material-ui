'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useMenu, MenuProvider } from '@mui/base/useMenu';
import { useSlotProps } from '@mui/base/utils';
import { ListActionTypes } from '@mui/base/useList';
import { HTMLElementType } from '@mui/utils';
import Popover, { PopoverPaper } from '@mui/material/Popover';
import { styled, useTheme, useThemeProps } from '@mui/material/styles';
import { rootShouldForwardProp } from '@mui/material/styles/styled';
import { getMenuUtilityClass } from './menuClasses';

const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left',
};

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    paper: ['paper'],
    list: ['list'],
  };

  return composeClasses(slots, getMenuUtilityClass, classes);
};

const MenuRoot = styled(Popover, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});

export const MenuPaper = styled(PopoverPaper, {
  name: 'MuiMenu',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper,
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: 'calc(100% - 96px)',
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
});

const MenuListbox = styled('ul', {
  name: 'MuiMenu',
  slot: 'List',
  overridesResolver: (props, styles) => styles.list,
})({
  // reset the default padding-inline-start
  paddingInlineStart: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiMenu' });

  const {
    anchorEl,
    autoFocus = true,
    children,
    className,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open: openProp,
    PaperProps = {},
    PopoverClasses,
    transitionDuration = 'auto',
    TransitionProps: { onEntering, ...TransitionProps } = {},
    variant = 'selectedMenu',
    slots = {},
    slotProps = {},
    actions,
    ...other
  } = props;

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const ownerState = {
    ...props,
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant,
  };

  const { contextValue, getListboxProps, dispatch, open, triggerElement } = useMenu({
    // onItemsChange,
    disabledItemsFocusable: Boolean(MenuListProps.disabledItemsFocusable),
    open: openProp,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      dispatch,
      resetHighlight: () => dispatch({ type: ListActionTypes.resetHighlight, event: null }),
    }),
    [dispatch],
  );

  const classes = useUtilityClasses(ownerState);

  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;

  const menuListActionsRef = React.useRef(null);

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
            "MUI: The Menu component doesn't accept a Fragment as a child.",
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

  const PaperSlot = slots.paper ?? MenuPaper;
  const paperExternalSlotProps = slotProps.paper ?? PaperProps;

  const rootSlotProps = useSlotProps({
    elementType: slots.root,
    externalSlotProps: slotProps.root,
    // externalForwardedProps: other,
    // additionalProps: {
    //   ref: forwardedRef,
    //   role: undefined,
    // },
    ownerState,
    className: [classes.root, className],
  });

  const paperSlotProps = useSlotProps({
    elementType: PaperSlot,
    externalSlotProps: paperExternalSlotProps,
    ownerState,
    className: classes.paper,
  });

  const Listbox = slots.listbox ?? MenuListbox;
  const listboxProps = useSlotProps({
    elementType: Listbox,
    getSlotProps: (otherHandlers) => {
      return getListboxProps({
        onKeyDown: handleListKeyDown,
        ...otherHandlers,
      });
    },
    externalSlotProps: (args) => ({
      ...(typeof slotProps.listbox === 'function' ? slotProps.listbox(args) : slotProps.listbox),
      // TOD: Make sure all previous support props still work
      ...MenuListProps,
    }),
    additionalProps: {
      variant,
      autoFocusItem,
      autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
    },
    className: clsx(classes.list, MenuListProps.className),
    ownerState,
  });

  return (
    <MenuRoot
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: isRtl ? 'right' : 'left',
      }}
      transformOrigin={isRtl ? RTL_ORIGIN : LTR_ORIGIN}
      slots={{
        paper: PaperSlot,
        root: slots.root,
      }}
      slotProps={{
        root: rootSlotProps,
        paper: paperSlotProps,
      }}
      open={open}
      ref={ref}
      transitionDuration={transitionDuration}
      TransitionProps={{ onEntering: handleEntering, ...TransitionProps }}
      ownerState={ownerState}
      anchorEl={anchorEl ?? triggerElement}
      {...other}
      classes={PopoverClasses}
    >
      <MenuProvider value={contextValue}>
        <Listbox {...listboxProps}>{children}</Listbox>
      </MenuProvider>
    </MenuRoot>
  );
});

Menu.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A ref with imperative actions that can be performed on the menu.
   */
  actions: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        resetHighlight: PropTypes.func.isRequired,
      }),
    }),
  ]),
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
   * @ignore
   */
  className: PropTypes.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: PropTypes.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
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
  open: PropTypes.bool,
  /**
   * @ignore
   */
  PaperProps: PropTypes.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: PropTypes.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
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
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: PropTypes.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
};

export default Menu;
