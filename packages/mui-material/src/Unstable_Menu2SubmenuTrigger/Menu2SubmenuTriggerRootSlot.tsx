'use client';
import * as React from 'react';
import clsx from 'clsx';
import { useRtl } from '@mui/system/RtlProvider';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import { mergeProps } from '@base-ui/react/merge-props';
import mergeSlotProps from '../utils/mergeSlotProps';
import MenuItemBase from '../internal/MenuItemBase';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import menuItemClasses from '../MenuItem/menuItemClasses';
import useSlot from '../utils/useSlot';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { getMenuItemHighlightStyles, menuItemOverridesResolver } from '../MenuItem/menuItemStyles';
import { Theme } from '../styles';
import {
  getMenu2RootRender,
  suppressButtonBaseKeyboardActivation,
} from '../Unstable_Menu2/menu2Utils';
import { menu2SubmenuTriggerClasses } from '../Unstable_Menu2/menu2Classes';
import type {
  Menu2SubmenuTriggerProps,
  Menu2SubmenuTriggerOwnerState,
} from './Menu2SubmenuTrigger';

function menu2SubmenuTriggerStyles(theme: Theme) {
  // Keyboard focus takes precedence over the open tint. With a focus ring,
  // the tint stays because it shows the open state, not focus.
  const notFocused = theme.focusVisible ? '' : `:not(.${menuItemClasses.focusVisible})`;

  return {
    [`&.${menu2SubmenuTriggerClasses.open}${notFocused}, &.${menu2SubmenuTriggerClasses.closing}${notFocused}`]:
      {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    // A selected trigger that is open blends its own tint with the open tint.
    [`&.${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.open}${notFocused}, &.${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.closing}${notFocused}`]:
      {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${
            (theme.vars || theme).palette.action.hoverOpacity
          }`,
        ),
      },
  };
}

const Menu2SubmenuTriggerRoot = styled(MenuItemBase, {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'Root',
  overridesResolver: menuItemOverridesResolver,
})<{ ownerState: Menu2SubmenuTriggerOwnerState }>(
  memoTheme(({ theme }) => getMenuItemHighlightStyles(theme)),
  memoTheme(({ theme }) => menu2SubmenuTriggerStyles(theme)),
);

const Menu2SubmenuTriggerIndicator = styled('span', {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'Indicator',
})({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  marginInlineStart: 'auto',
  paddingInlineStart: 8,
});

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
  ownerState: Menu2SubmenuTriggerOwnerState & Pick<Menu2SubmenuTriggerProps, 'classes'>;
}) {
  const RootSlot = slots?.root ?? Menu2SubmenuTriggerRoot;
  const externalSlotProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), {
    sx,
  });
  const rootProps = mergeProps(baseProps, externalSlotProps);
  const ref = useForkRef(baseProps.ref, externalSlotProps?.ref);
  const isRtl = useRtl();
  const [IndicatorSlot, indicatorProps] = useSlot('indicator', {
    elementType: Menu2SubmenuTriggerIndicator,
    externalForwardedProps: { slots, slotProps },
    ownerState,
    className: clsx(menu2SubmenuTriggerClasses.indicator, ownerState.classes?.indicator),
    additionalProps: {
      'aria-hidden': true,
      children: isRtl ? (
        <KeyboardArrowLeft fontSize="small" />
      ) : (
        <KeyboardArrowRight fontSize="small" />
      ),
    },
  });

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
      children: (
        <React.Fragment>
          {rootProps.children}
          <IndicatorSlot {...indicatorProps} />
        </React.Fragment>
      ),
    },
    Menu2SubmenuTriggerRoot,
  );
}

export default Menu2SubmenuTriggerRootSlot;
