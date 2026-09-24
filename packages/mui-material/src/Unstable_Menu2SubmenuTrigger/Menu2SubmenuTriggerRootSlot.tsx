'use client';
import * as React from 'react';
import clsx from 'clsx';
import { useRtl } from '@mui/system/RtlProvider';
import type { HTMLProps } from '@base-ui/react/types';
import MenuItemBase from '../internal/MenuItemBase';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import menuItemClasses from '../MenuItem/menuItemClasses';
import useSlot from '../utils/useSlot';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { getMenuItemHighlightStyles, menuItemOverridesResolver } from '../MenuItem/menuItemStyles';
import { Theme } from '../styles';
import { Menu2ItemRootSlot } from '../Unstable_Menu2/menu2ItemShared';
import { menu2SubmenuTriggerClasses } from '../Unstable_Menu2/menu2Classes';
import type {
  Menu2SubmenuTriggerProps,
  Menu2SubmenuTriggerOwnerState,
} from './Menu2SubmenuTrigger';

export interface Menu2SubmenuTriggerStyleOwnerState extends Menu2SubmenuTriggerOwnerState {
  retainClosingTint: boolean;
}

function menu2SubmenuTriggerStyles(theme: Theme, stateClass: string) {
  // Keyboard focus takes precedence over the open tint. With a focus ring,
  // the tint stays because it shows the open state, not focus.
  // Keep the focus guard at zero specificity so state style overrides can win.
  const notFocused = theme.focusVisible ? '' : `:where(:not(.${menuItemClasses.focusVisible}))`;

  return {
    [`&.${stateClass}${notFocused}`]: {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
    // A selected trigger that is open blends its own tint with the open tint.
    [`&.${menu2SubmenuTriggerClasses.selected}.${stateClass}${notFocused}`]: {
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
  overridesResolver: (props, styles) => [
    menuItemOverridesResolver(props, styles),
    { [`&.${menu2SubmenuTriggerClasses.highlighted}`]: styles.highlighted },
    { [`&.${menu2SubmenuTriggerClasses.closing}`]: styles.closing },
  ],
})<{ ownerState: Menu2SubmenuTriggerStyleOwnerState }>(
  memoTheme(({ theme }) => getMenuItemHighlightStyles(theme)),
  memoTheme(({ theme }) => ({
    ...menu2SubmenuTriggerStyles(theme, menu2SubmenuTriggerClasses.open),
    variants: [
      {
        props: { retainClosingTint: true },
        style: menu2SubmenuTriggerStyles(theme, menu2SubmenuTriggerClasses.closing),
      },
    ],
  })),
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

function Menu2SubmenuTriggerRootSlot(
  props: Pick<
    Menu2SubmenuTriggerProps,
    'component' | 'disableRipple' | 'nativeButton' | 'slotProps' | 'slots' | 'sx'
  > & {
    baseProps: HTMLProps;
    ownerState: Menu2SubmenuTriggerStyleOwnerState & Pick<Menu2SubmenuTriggerProps, 'classes'>;
  },
) {
  const { ownerState, slotProps, slots } = props;
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

  return (
    <Menu2ItemRootSlot
      {...props}
      elementType={Menu2SubmenuTriggerRoot}
      endIndicator={<IndicatorSlot {...indicatorProps} />}
    />
  );
}

export default Menu2SubmenuTriggerRootSlot;
