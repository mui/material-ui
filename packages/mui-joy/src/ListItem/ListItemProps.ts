import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';
import { ListItemClasses } from './listItemClasses';

export type ListItemSlot = 'root' | 'startAction' | 'endAction';

export interface ListItemPropsVariantOverrides {}

export interface ListItemPropsColorOverrides {}

export interface ListItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListItemPropsColorOverrides>;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListItemClasses>;
    /**
     * The element to display at the start of ListItem.
     */
    startAction?: React.ReactNode;
    /**
     * The element to display at the end of ListItem.
     */
    endAction?: React.ReactNode;
    /**
     * If `true`, the component can contain NestedList.
     * @default false
     */
    nested?: boolean;
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky?: boolean;
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ListItemPropsVariantOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListItemProps<
  D extends React.ElementType = ListItemTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemTypeMap<P, D>, D>;
