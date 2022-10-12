import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ResponsiveStyleValue } from '@mui/system';
import { SxProps } from '../styles/types';

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
     * The system prop, which allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<StackTypeMap<P, D>, D>;
