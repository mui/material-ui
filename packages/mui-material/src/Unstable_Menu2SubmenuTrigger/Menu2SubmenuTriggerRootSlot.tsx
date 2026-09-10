'use client';
import * as React from 'react';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import { mergeProps } from '@base-ui/react/merge-props';
import mergeSlotProps from '../utils/mergeSlotProps';
import MenuItemBase from '../MenuItem/MenuItemBase';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { getMenuItemHighlightStyles } from '../MenuItem/menuItemStyles';
import { Theme } from '../styles';
import {
  getMenu2RootRender,
  suppressButtonBaseKeyboardActivation,
} from '../Unstable_Menu2/menu2Utils';
import { menu2ItemOverridesResolver } from '../Unstable_Menu2/menu2ItemShared';
import { menu2SubmenuTriggerClasses } from '../Unstable_Menu2/menu2Classes';
import type {
  Menu2SubmenuTriggerProps,
  Menu2SubmenuTriggerOwnerState,
} from './Menu2SubmenuTrigger';

function menu2SubmenuTriggerStyles(theme: Theme) {
  // The highlight outranks the open tint. The open selector excludes both states
  // that paint the highlight, so the rules never match the same element and the
  // insertion order cannot decide the winner. Under `theme.focusVisible` the
  // highlight paints no background, so the tint stays.
  const notHighlighted = theme.focusVisible
    ? ''
    : `:not(.${menu2SubmenuTriggerClasses.highlighted}):not(:hover)`;

  return {
    // The trigger owns its state styling, independently of its parent list.
    // An open trigger keeps a tint, because open is a state and not a focus cue.
    // `action.hover` is the lightest of the three, so an open parent stays visible
    // without competing with the item the reader is on.
    [`&.${menu2SubmenuTriggerClasses.open}${notHighlighted}, &.${menu2SubmenuTriggerClasses.closing}${notHighlighted}`]:
      {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    // The theme ring replaces the highlight, the way it does for a plain item.
    // `:hover` is here too: Base UI highlights a submenu trigger only once its
    // submenu opens, so during the open delay the trigger would otherwise show
    // the weaker hover tint while its neighbours show the full highlight.
    ...(!theme.focusVisible && {
      [`&.${menu2SubmenuTriggerClasses.root}:hover, &.${menu2SubmenuTriggerClasses.highlighted}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
    }),
    // A selected trigger that is open blends its own tint with the open tint.
    [`&.${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.open}${notHighlighted}, &.${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.closing}${notHighlighted}`]:
      {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${
            (theme.vars || theme).palette.action.hoverOpacity
          }`,
        ),
      },
    ...(!theme.focusVisible && {
      [`&.${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.highlighted}`]: {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${
            (theme.vars || theme).palette.action.focusOpacity
          }`,
        ),
      },
    }),
  };
}

const Menu2SubmenuTriggerRoot = styled(MenuItemBase, {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'Root',
  overridesResolver: menu2ItemOverridesResolver,
})<{ ownerState: Menu2SubmenuTriggerOwnerState }>(
  memoTheme(({ theme }) =>
    getMenuItemHighlightStyles(theme, menu2SubmenuTriggerClasses.highlighted),
  ),
  memoTheme(({ theme }) => menu2SubmenuTriggerStyles(theme)),
);

function Menu2SubmenuTriggerRootSlot({
  baseProps,
  ownerState,
  component,
  disableRipple,
  slotProps,
  slots,
  sx,
}: Pick<Menu2SubmenuTriggerProps, 'component' | 'disableRipple' | 'slotProps' | 'slots' | 'sx'> & {
  baseProps: React.ComponentPropsWithRef<'div'>;
  ownerState: Menu2SubmenuTriggerOwnerState;
}) {
  const RootSlot = slots?.root ?? Menu2SubmenuTriggerRoot;
  const externalSlotProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), {
    sx,
  });
  const rootProps = mergeProps(baseProps, externalSlotProps);
  const ref = useForkRef(baseProps.ref, externalSlotProps?.ref);

  return getMenu2RootRender(
    RootSlot,
    ownerState,
    {
      ...rootProps,
      ref,
      component: component ?? 'div',
      ...(disableRipple !== undefined && { disableRipple }),
      ownerState,
      ...suppressButtonBaseKeyboardActivation(rootProps),
    },
    Menu2SubmenuTriggerRoot,
  );
}

export default Menu2SubmenuTriggerRootSlot;
