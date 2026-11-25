'use client';
import type * as React from 'react';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { mergeProps } from '@base-ui/react/merge-props';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import type { SxProps } from '@mui/system';
import type { Theme } from '../styles';
import mergeSlotProps from '../utils/mergeSlotProps';
import useSlot from '../utils/useSlot';
import type { Menu2RootSlotProps, Menu2RootSlots } from '../Unstable_Menu2/menu2Utils';
import { getMenu2RootRender } from '../Unstable_Menu2/menu2Utils';
import Menu2RenderRoot from './Menu2RenderRoot';

/**
 * @ignore - internal component.
 */
export default function Menu2RootSlot<OwnerState extends object, RenderState extends object>(
  props: Menu2RootSlotComponentProps<OwnerState, RenderState>,
) {
  const {
    baseProps,
    elementType,
    ownerState,
    internalForwardedProps,
    render,
    renderState,
    shouldForwardComponentProp = false,
    slots,
    slotProps,
    sx,
  } = props;
  const rootSlotProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), { sx });
  const [RootSlot, rootProps] = useSlot('root', {
    elementType,
    shouldForwardComponentProp,
    externalForwardedProps: { slots, slotProps: { root: rootSlotProps } },
    ownerState,
    className: undefined,
    ref: null,
    getSlotProps: (handlers): HTMLProps => mergeProps(baseProps, handlers),
    // Replacing the root also replaces the styled render adapter.
    internalForwardedProps: {
      ...internalForwardedProps,
      ...(render && {
        // Keep ListSubheader and Divider in the styled render path.
        ...(shouldForwardComponentProp ? { component: Menu2RenderRoot } : { as: Menu2RenderRoot }),
        internalRender: render,
        internalRenderState: renderState,
      }),
    },
  });

  return getMenu2RootRender(RootSlot, ownerState, rootProps);
}

interface Menu2RootSlotComponentProps<OwnerState extends object, RenderState extends object> {
  baseProps: HTMLProps;
  elementType: React.ElementType;
  ownerState: OwnerState;
  internalForwardedProps?: Record<string, unknown> | undefined;
  render?:
    React.ReactElement | ComponentRenderFn<Omit<HTMLProps, 'color'>, RenderState> | undefined;
  renderState: RenderState;
  shouldForwardComponentProp?: boolean | undefined;
  slots?: Menu2RootSlots | undefined;
  slotProps?: Menu2RootSlotProps<OwnerState> | undefined;
  sx?: SxProps<Theme> | undefined;
}
