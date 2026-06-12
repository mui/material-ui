'use client';
import * as React from 'react';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { CSSInterpolation, SxProps } from '@mui/system';
import { Theme } from '../styles';
import { StateClassName, mergeStateClassName } from './menuPreviewUtils';

export interface MenuPreviewItemOwnerState {
  checked?: boolean | undefined;
  dense: boolean;
  disabled: boolean;
  divider: boolean;
  disableGutters: boolean;
  selected: boolean;
}

export interface MenuPreviewItemVisualProps<Classes> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Classes> | undefined;
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

export interface MenuPreviewItemBaseProps {
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
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default true
   */
  closeOnClick?: boolean | undefined;
}

export interface MenuPreviewLinkItemBaseProps {
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

export interface MenuPreviewSubmenuTriggerBaseProps {
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

export interface MenuPreviewBaseItemState {
  disabled?: boolean;
  highlighted?: boolean;
}

export function menuPreviewItemOverridesResolver(
  props: { ownerState: MenuPreviewItemOwnerState },
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

export function getMenuPreviewItemOwnerState(
  props: MenuPreviewItemVisualProps<unknown> & {
    checked?: boolean | undefined;
    disabled?: boolean | undefined;
  },
): MenuPreviewItemOwnerState {
  return {
    checked: props.checked,
    dense: props.dense ?? false,
    disabled: props.disabled ?? false,
    divider: props.divider ?? false,
    disableGutters: props.disableGutters ?? false,
    selected: props.selected ?? false,
  };
}

export function useMenuPreviewItemUtilityClasses<Classes extends object>(
  ownerState: MenuPreviewItemOwnerState & {
    classes?: Partial<Classes>;
    checked?: boolean;
    open?: boolean;
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

export function getMenuPreviewItemClassName<State extends MenuPreviewBaseItemState>(
  classes: Partial<Record<'root' | 'highlighted' | 'disabled', string>>,
  ownerState: MenuPreviewItemOwnerState,
  state: State,
) {
  return clsx(
    classes.root,
    state.highlighted && classes.highlighted,
    state.disabled && !ownerState.disabled && classes.disabled,
  );
}

export function mergeMenuPreviewItemClassName<State extends MenuPreviewBaseItemState>(
  className: StateClassName<State>,
  classes: Partial<Record<'root' | 'highlighted' | 'disabled', string>>,
  ownerState: MenuPreviewItemOwnerState,
) {
  return mergeStateClassName(className, (state) =>
    getMenuPreviewItemClassName(classes, ownerState, state),
  );
}
