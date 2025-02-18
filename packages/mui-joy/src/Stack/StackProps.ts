import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ResponsiveStyleValue } from '@mui/system';
import { SxProps, SystemProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type StackSlot = 'root';

export interface StackSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type StackSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StackSlots,
  {
    root: SlotProps<'div', {}, StackOwnerState>;
  }
>;

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
     * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
     *
     * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
     * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
     *
     * To enable this flag globally, follow the [theme's default props](https://mui.com/joy-ui/customization/themed-components/#default-props) configuration.
     * @default false
     */
    useFlexGap?: boolean;
    /**
     * The system prop, which allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & StackSlotsAndSlotProps &
    SystemProps;
  defaultComponent: D;
}

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<StackTypeMap<P, D>, D>;

export interface StackOwnerState extends StackProps {}
