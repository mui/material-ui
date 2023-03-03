import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ResponsiveStyleValue } from '@mui/system';
import { SxProps, SystemProps } from '../styles/types';

export type StackSlot = 'root';

export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Defines the `flex-direction` style property.
     * It is applied for all screen sizes.
     * @default 'column'
     */
    direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
    /**
     * Defines the space between immediate children.
     * @default 0
     */
    spacing?: ResponsiveStyleValue<number | string>;
    /**
     * Add an element between each child.
     */
    divider?: React.ReactNode;
    /**
     * If `true`, the CSS flex `gap` is used instead of the pseudo selector approach.
     * To enable this flag globally, follow the theme's default props configuration.
     *
     * ⚠️ Warning: CSS flex `gap` is not fully supported in some browsers, we recommend to check https://caniuse.com/?search=flex%20gap before using this flag.
     * @default false
     */
    useFlexGap?: boolean;
    /**
     * The system prop, which allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & SystemProps;
  defaultComponent: D;
}

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<StackTypeMap<P, D>, D>;
