import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ListSlot = 'root';

export interface ListSlots {
  /**
   * The component that renders the root.
   * @default 'ul'
   */
  root?: React.ElementType;
}

export type ListSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ListSlots,
  {
    root: SlotProps<'ul', {}, ListOwnerState>;
  }
>;

export interface ListPropsSizeOverrides {}
export interface ListPropsVariantOverrides {}
export interface ListPropsColorOverrides {}

export interface ListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListPropsColorOverrides>;
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The marker (such as a disc, character, or custom counter style) of the list items.
     * When this prop is specified, the List Item changes the CSS display to `list-item` in order to apply the marker.
     *
     * To see all available options, check out the [MDN list-style-type page](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type).
     */
    marker?: string;
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ListPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ListPropsVariantOverrides>;
    /**
     * Only for horizontal list.
     * If `true`, the list sets the flex-wrap to "wrap" and adjust margin to have gap-like behavior (will move to `gap` in the future).
     *
     * @default false
     */
    wrap?: boolean;
  } & ListSlotsAndSlotProps;
  defaultComponent: D;
}

export type ListProps<
  D extends React.ElementType = ListTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListTypeMap<P, D>, D>;

export interface ListOwnerState extends ApplyColorInversion<ListProps> {
  /**
   * @internal
   * The explicit size specified on the element instance.
   */
  instanceSize?: ListProps['size'];
  /**
   * @internal
   * If `true`, the element is rendered in a nested list item.
   */
  nesting?: boolean | string;
}
