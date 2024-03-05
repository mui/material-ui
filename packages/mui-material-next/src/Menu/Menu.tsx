'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useMenu, MenuProvider } from '@mui/base/useMenu';
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import { useSlotProps } from '@mui/base/utils';
import { ListActionTypes } from '@mui/base/useList';
import {
  HTMLElementType,
  unstable_getScrollbarSize as getScrollbarSize,
  unstable_ownerDocument as ownerDocument,
} from '@mui/utils';
// TODO v6: Replace with @mui/material-next when the Popover component is available
import Popover, { PopoverPaper, PopoverOrigin } from '@mui/material/Popover';
import { styled, useTheme, useThemeProps, rootShouldForwardProp } from '../styles';
import { MenuTypeMap, MenuOwnerState } from './Menu.types';
import { getMenuUtilityClass } from './menuClasses';

const RTL_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right',
};

const LTR_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const useUtilityClasses = (ownerState: MenuOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    paper: ['paper'],
    list: ['list'],
  };

  return composeClasses(slots, getMenuUtilityClass, classes);
};

const MenuRoot = styled(Popover, {
  shouldForwardProp: (prop: string) => rootShouldForwardProp(prop) || prop === 'classes',
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

const MenuInner = React.forwardRef(function Menu(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiMenu' });

  const {
    anchorEl,
    autoFocus = true,
    children,
    className,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
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

  const listRef = React.useRef<HTMLElement>(null);

  // TODO v6: Handle the rest of the props from the MenuListProps prop
  const {
    // varaint
    className: menuListPropsClassName,
    disabledItemsFocusable,
    disableListWrap,
    ...otherMenuListProps
  } = MenuListProps;

  const { contextValue, getListboxProps, dispatch, open, triggerElement } = useMenu({
    // onItemsChange,
    disabledItemsFocusable: Boolean(disabledItemsFocusable),
    disableListWrap: Boolean(disableListWrap),
    autoFocus,
    componentName: 'Menu',
  });

  const ownerState = {
    ...props,
    open,
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant,
  };

  React.useImperativeHandle(
    actions,
    () => ({
      dispatch,
      resetHighlight: () => dispatch({ type: ListActionTypes.resetHighlight, event: null }),
    }),
    [dispatch],
  );

  const classes = useUtilityClasses(ownerState);

  const handleEntering = (element: HTMLElement, isAppearing: boolean) => {
    // adjust styles for scrollbar
    if (element && listRef.current) {
      // Let's ignore that piece of logic if users are already overriding the width
      // of the menu.
      const containerElement = element;
      const noExplicitWidth = !listRef.current.style.width;
      if (containerElement.clientHeight < listRef?.current?.clientHeight && noExplicitWidth) {
        const scrollbarSize = `${getScrollbarSize(ownerDocument(containerElement))}px`;
        listRef.current.style[theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] =
          scrollbarSize;
        listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
      }
    }

    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
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
    additionalProps: {
      role: undefined,
    },
    ownerState,
    className: [classes.root, className],
  });

  const paperSlotProps = useSlotProps({
    elementType: PaperSlot,
    externalSlotProps: paperExternalSlotProps,
    ownerState,
    className: classes.paper,
  });

  // TODO v6: Setting autoFocus = false is missing feature at this point
  // const autoFocusList = autoFocus && (activeItemIndex === -1 || disableAutoFocusItem);

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
      ...otherMenuListProps,
    }),
    additionalProps: {
      ref: listRef,
      // TODO v6: These need to be handled on the Menu component level, now that the MenuListbox is simply ul
      // variant,
      // autoFocusItem,
      // autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
    },
    className: clsx(classes.list, menuListPropsClassName),
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
      // @ts-ignore internal usage
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
}) as OverridableComponent<MenuTypeMap>;

/**
 *
 * Demos:
 *
 * - [App Bar](https://mui.com/material-ui/react-app-bar/)
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/material-ui/api/menu/)
 * - inherits [Popover API](https://mui.com/material-ui/api/popover/)
 */
const Menu = React.forwardRef(function Menu(inProps, ref) {
  const { open } = inProps;
  const upperDropdownContext = React.useContext(DropdownContext);

  const { contextValue: dropdownContextValue } = useDropdown({
    open,
    componentName: 'Menu',
  });

  return !upperDropdownContext ? (
    <DropdownContext.Provider value={dropdownContextValue}>
      <MenuInner ref={ref} {...inProps} />
    </DropdownContext.Provider>
  ) : (
    <MenuInner ref={ref} {...inProps} />
  );
}) as OverridableComponent<MenuTypeMap>;

Menu.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
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
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
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
   * Set to 'auto' to automatically calculate transition time based on height.
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: PropTypes.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
} as any;

export default Menu;
