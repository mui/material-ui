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

interface Menu2RootSlotComponentProps<State extends object> {
  baseProps: HTMLProps;
  elementType: React.ElementType;
  ownerState: State;
  render?: React.ReactElement | ComponentRenderFn<Omit<HTMLProps, 'color'>, State> | undefined;
  renderState: State;
  slots?: Menu2RootSlots | undefined;
  slotProps?: Menu2RootSlotProps<State> | undefined;
  sx?: SxProps<Theme> | undefined;
}

/**
 * @ignore - internal component.
 */
export default function Menu2RootSlot<State extends object>(
  props: Menu2RootSlotComponentProps<State>,
) {
  const { baseProps, elementType, ownerState, render, renderState, slots, slotProps, sx } = props;
  const rootSlotProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), { sx });
  const [RootSlot, rootProps] = useSlot('root', {
    elementType,
    externalForwardedProps: { slots, slotProps: { root: rootSlotProps } },
    ownerState,
    className: undefined,
    ref: null,
    getSlotProps: (handlers): HTMLProps => mergeProps(baseProps, handlers),
    // Replacing the root also replaces the styled render adapter.
    internalForwardedProps: render
      ? { as: Menu2RenderRoot, internalRender: render, internalRenderState: renderState }
      : undefined,
  });

  return getMenu2RootRender(RootSlot, ownerState, rootProps);
}
