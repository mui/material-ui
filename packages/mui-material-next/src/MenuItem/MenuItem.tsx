'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { alpha } from '@mui/system';
import {
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { useSlotProps } from '@mui/base/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useMenuItem } from '@mui/base/useMenuItem';
// TODO v6: Replace with @mui/material-next when the List components are available
import ListContext from '@mui/material/List/ListContext';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { styled, useThemeProps, rootShouldForwardProp } from '../styles';
import ButtonBase from '../ButtonBase';
import { dividerClasses } from '../Divider';
import { MenuItemProps, MenuItemOwnerState, MenuItemTypeMap } from './MenuItem.types';
import menuItemClasses, { getMenuItemUtilityClass } from './menuItemClasses';

export const overridesResolver = (
  props: MenuItemProps & { ownerState: MenuItemOwnerState },
  styles: any,
) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ];
};

const useUtilityClasses = (ownerState: MenuItemOwnerState) => {
  const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;
  const slots = {
    root: [
      'root',
      dense && 'dense',
      disabled && 'disabled',
      !disableGutters && 'gutters',
      divider && 'divider',
      selected && 'selected',
    ],
  };

  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: (prop: string) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver,
})<{ ownerState: MenuItemOwnerState }>(({ theme, ownerState }) => ({
  ...theme.typography.body1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  ...(!ownerState.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16,
  }),
  ...(ownerState.divider && {
    borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    backgroundClip: 'padding-box',
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  [`&.${menuItemClasses.selected}`]: {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
      : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${menuItemClasses.focusVisible}`]: {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
        : alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
          ),
    },
  },
  [`&.${menuItemClasses.selected}:hover`]: {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
      : alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
        : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
  },
  [`&.${menuItemClasses.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus,
  },
  [`&.${menuItemClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
  },
  [`& + .${dividerClasses.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  [`& + .${dividerClasses.inset}`]: {
    marginLeft: 52,
  },
  [`& .${listItemTextClasses.root}`]: {
    marginTop: 0,
    marginBottom: 0,
  },
  [`& .${listItemTextClasses.inset}`]: {
    paddingLeft: 36,
  },
  [`& .${listItemIconClasses.root}`]: {
    minWidth: 36,
  },
  ...(!ownerState.dense && {
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
  }),
  ...(ownerState.dense && {
    minHeight: 32, // https://m2.material.io/components/menus#specs > Dense
    paddingTop: 4,
    paddingBottom: 4,
    ...theme.typography.body2,
    [`& .${listItemIconClasses.root} svg`]: {
      fontSize: '1.25rem',
    },
  }),
}));

const MenuItem = React.forwardRef(function MenuItem<RootComponentType extends React.ElementType>(
  inProps: MenuItemProps<RootComponentType>,
  ref: React.ForwardedRef<Element>,
) {
  const props = useThemeProps({ props: inProps, name: 'MuiMenuItem' });
  const {
    autoFocus = false,
    component = 'li',
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = 'menuitem',
    tabIndex: tabIndexProp,
    className,
    disabled: disabledProp,
    label: labelProp,
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = React.useMemo(
    () => ({
      dense: dense || context.dense || false,
      disableGutters,
    }),
    [context.dense, dense, disableGutters],
  );

  const menuItemRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(menuItemRef, ref);

  const { getRootProps, disabled, focusVisible, highlighted } = useMenuItem({
    disabled: disabledProp,
    rootRef: handleRef,
    label: labelProp,
  });

  useEnhancedEffect(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
        );
      }
    }
  }, [autoFocus]);

  const ownerState = {
    ...props,
    dense: childContext.dense,
    divider,
    disableGutters,
    disabled,
    focusVisible,
    highlighted,
  };

  const classes = useUtilityClasses(props);

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  const Root = /* slots.root ?? */ MenuItemRoot;
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    // TODO v6: Add support for slotProps.root
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      role,
      tabIndex,
      component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
      classes,
    },
    className: clsx(classes.root, className),
    ownerState,
  });
  return (
    <ListContext.Provider value={childContext}>
      <MenuItemRoot {...rootProps} />
    </ListContext.Provider>
  );
}) as OverridableComponent<MenuItemTypeMap>;

MenuItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * @ignore
   */
  role: PropTypes.oneOfType([
    PropTypes.oneOf([
      'alert',
      'alertdialog',
      'application',
      'article',
      'banner',
      'button',
      'cell',
      'checkbox',
      'columnheader',
      'combobox',
      'complementary',
      'contentinfo',
      'definition',
      'dialog',
      'directory',
      'document',
      'feed',
      'figure',
      'form',
      'grid',
      'gridcell',
      'group',
      'heading',
      'img',
      'link',
      'list',
      'listbox',
      'listitem',
      'log',
      'main',
      'marquee',
      'math',
      'menu',
      'menubar',
      'menuitem',
      'menuitemcheckbox',
      'menuitemradio',
      'navigation',
      'none',
      'note',
      'option',
      'presentation',
      'progressbar',
      'radio',
      'radiogroup',
      'region',
      'row',
      'rowgroup',
      'rowheader',
      'scrollbar',
      'search',
      'searchbox',
      'separator',
      'slider',
      'spinbutton',
      'status',
      'switch',
      'tab',
      'table',
      'tablist',
      'tabpanel',
      'term',
      'textbox',
      'timer',
      'toolbar',
      'tooltip',
      'tree',
      'treegrid',
      'treeitem',
    ]),
    PropTypes.shape({
      '__@iterator@42136': PropTypes.func.isRequired,
      anchor: PropTypes.func.isRequired,
      at: PropTypes.func.isRequired,
      big: PropTypes.func.isRequired,
      blink: PropTypes.func.isRequired,
      bold: PropTypes.func.isRequired,
      charAt: PropTypes.func.isRequired,
      charCodeAt: PropTypes.func.isRequired,
      codePointAt: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      endsWith: PropTypes.func.isRequired,
      fixed: PropTypes.func.isRequired,
      fontcolor: PropTypes.func.isRequired,
      fontsize: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      italics: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      link: PropTypes.func.isRequired,
      localeCompare: PropTypes.func.isRequired,
      match: PropTypes.func.isRequired,
      matchAll: PropTypes.func.isRequired,
      normalize: PropTypes.func.isRequired,
      padEnd: PropTypes.func.isRequired,
      padStart: PropTypes.func.isRequired,
      repeat: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      search: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      small: PropTypes.func.isRequired,
      split: PropTypes.func.isRequired,
      startsWith: PropTypes.func.isRequired,
      strike: PropTypes.func.isRequired,
      sub: PropTypes.func.isRequired,
      substr: PropTypes.func.isRequired,
      substring: PropTypes.func.isRequired,
      sup: PropTypes.func.isRequired,
      toLocaleLowerCase: PropTypes.func.isRequired,
      toLocaleUpperCase: PropTypes.func.isRequired,
      toLowerCase: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      toUpperCase: PropTypes.func.isRequired,
      trim: PropTypes.func.isRequired,
      trimEnd: PropTypes.func.isRequired,
      trimLeft: PropTypes.func.isRequired,
      trimRight: PropTypes.func.isRequired,
      trimStart: PropTypes.func.isRequired,
      valueOf: PropTypes.func.isRequired,
    }),
  ]),
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
} as any;

export default MenuItem;
