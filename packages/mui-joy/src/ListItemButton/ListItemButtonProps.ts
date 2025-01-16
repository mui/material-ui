import * as React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ListItemButtonSlot = 'root';

export interface ListItemButtonSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type ListItemButtonSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ListItemButtonSlots,
  {
    root: SlotProps<'div', {}, ListItemButtonOwnerState>;
  }
>;

export interface ListItemButtonPropsVariantOverrides {}
export interface ListItemButtonPropsColorOverrides {}

export interface ListItemButtonTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * A ref for imperative actions. It currently only supports `focusVisible()` action.
     */
    action?: React.Ref<{
      focusVisible(): void;
    }>;
    /**
     * If `true`, the list item is focused during the first mount.
     * Focus will also be triggered if the value changes from false to true.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListItemButtonPropsColorOverrides>;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * This prop can help identify which element has keyboard focus.
     * The class name will be applied when the element gains the focus through keyboard interaction.
     * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
     * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
     * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
     * if needed.
     */
    focusVisibleClassName?: string;
    /**
     * The content direction flow.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * If `true`, the component is selected.
     * @default false
     */
    selected?: boolean;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ListItemButtonPropsVariantOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * @default 0
     */
    tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
  } & ListItemButtonSlotsAndSlotProps;
  defaultComponent: D;
}

export interface ExtendListItemButtonTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & ListItemButtonTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type ListItemButtonProps<
  D extends React.ElementType = ListItemButtonTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemButtonTypeMap<P, D>, D>;

export interface ListItemButtonOwnerState extends ApplyColorInversion<ListItemButtonProps> {
  /**
   * If `true`, the element's focus is visible.
   */
  focusVisible?: boolean;
  /**
   * If `true`, the element is rendered in a horizontal list.
   * @internal
   */
  row?: boolean;
  /**
   * @internal
   * The internal prop for controlling CSS margin of the element.
   */
  'data-first-child'?: boolean;
}

export type ExtendListItemButton<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendListItemButtonTypeMap<M>, 'a'>,
) => React.JSX.Element) &
  OverridableComponent<ExtendListItemButtonTypeMap<M>>;
