'use client';
import * as React from 'react';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import { mergeProps } from '@base-ui/react/merge-props';
import ButtonBase from '../ButtonBase';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { getMenu2ItemStyles, menu2SubmenuTriggerStyles } from '../Unstable_Menu2/menu2SharedStyles';
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

const Menu2SubmenuTriggerRoot = styled(ButtonBase, {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'Root',
  overridesResolver: menu2ItemOverridesResolver,
})<{ ownerState: Menu2SubmenuTriggerOwnerState }>(
  memoTheme(({ theme }) => getMenu2ItemStyles(theme, menu2SubmenuTriggerClasses)),
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
  const externalSlotProps = resolveComponentProps(slotProps?.root, ownerState);
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
      sx,
      ...suppressButtonBaseKeyboardActivation(rootProps),
    },
    Menu2SubmenuTriggerRoot,
  );
}

export default Menu2SubmenuTriggerRootSlot;
