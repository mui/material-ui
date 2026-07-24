'use client';
import * as React from 'react';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { CSSInterpolation, SxProps } from '@mui/system';
import { Theme } from '../styles';
import {
  Menu2RootSlotProps,
  Menu2RootSlots,
  StateClassName,
  mergeStateClassName,
} from './menu2Utils';

export interface Menu2ItemOwnerState {
  checked?: boolean | undefined;
  dense: boolean;
  disabled: boolean;
  divider: boolean;
  disableGutters: boolean;
  selected: boolean;
}

export interface Menu2ItemVisualProps<
  Classes,
  Slots = Menu2RootSlots,
  SlotProps = Menu2RootSlotProps<Menu2ItemOwnerState>,
> {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Classes> | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Slots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: SlotProps | undefined;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * @default false
   */
  dense?: boolean | undefined;
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean | undefined;
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider?: boolean | undefined;
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface Menu2ItemBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Whether the component is rendered as a native button.
   *
   * By default, this is inferred from the root slot and `component` prop.
   */
  nativeButton?: boolean | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default true
   */
  closeOnClick?: boolean | undefined;
}

export interface Menu2LinkItemBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The URL that the link item points to.
   */
  href?: string | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default false
   */
  closeOnClick?: boolean | undefined;
}

export interface Menu2SubmenuTriggerBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Whether the component is rendered as a native button.
   *
   * By default, this is inferred from the root slot and `component` prop.
   */
  nativeButton?: boolean | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * How long to wait before the submenu may be opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay?: number | undefined;
  /**
   * How long to wait before closing the submenu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay?: number | undefined;
  /**
   * Whether the submenu should also open when the trigger is hovered.
   */
  openOnHover?: boolean | undefined;
}

export interface Menu2BaseItemState {
  disabled?: boolean | undefined;
  highlighted?: boolean | undefined;
}

export function menu2ItemOverridesResolver(
  props: { ownerState: Menu2ItemOwnerState },
  styles: Record<string, CSSInterpolation>,
) {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ] as CSSInterpolation;
}

export function getMenu2ItemOwnerState(
  props: Menu2ItemVisualProps<unknown> & {
    checked?: boolean | undefined;
    disabled?: boolean | undefined;
  },
): Menu2ItemOwnerState {
  return {
    checked: props.checked,
    dense: props.dense ?? false,
    disabled: props.disabled ?? false,
    divider: props.divider ?? false,
    disableGutters: props.disableGutters ?? false,
    selected: props.selected ?? false,
  };
}

export function useMenu2ItemUtilityClasses<Classes extends object>(
  ownerState: Menu2ItemOwnerState & {
    classes?: Partial<Classes> | undefined;
    checked?: boolean | undefined;
    open?: boolean | undefined;
  },
  getUtilityClass: (slot: string) => string,
) {
  const { dense, disabled, divider, disableGutters, selected, checked, open, classes } = ownerState;
  const slots = {
    root: [
      'root',
      dense && 'dense',
      disabled && 'disabled',
      !disableGutters && 'gutters',
      divider && 'divider',
      selected && 'selected',
      checked && 'checked',
      open && 'open',
    ],
    highlighted: ['highlighted'],
    disabled: ['disabled'],
    checked: ['checked'],
    open: ['open'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getUtilityClass, classes as Record<string, string> | undefined),
  } as Classes;
}

export function getMenu2ItemClassName<State extends Menu2BaseItemState>(
  classes: Partial<Record<'root' | 'highlighted' | 'disabled', string>>,
  ownerState: Menu2ItemOwnerState,
  state: State,
) {
  return clsx(
    classes.root,
    state.highlighted && classes.highlighted,
    state.disabled && !ownerState.disabled && classes.disabled,
  );
}

export function mergeMenu2ItemClassName<State extends Menu2BaseItemState>(
  className: StateClassName<State>,
  classes: Partial<Record<'root' | 'highlighted' | 'disabled', string>>,
  ownerState: Menu2ItemOwnerState,
) {
  return mergeStateClassName(className, (state) =>
    getMenu2ItemClassName(classes, ownerState, state),
  );
}
