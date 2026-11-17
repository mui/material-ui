import type * as React from 'react';
import type { Meter as BaseMeter } from '@base-ui/react/meter';
import type { useRender } from '@base-ui/react/use-render';
import type { SlotComponentProps } from '@mui/utils/types';
import type { OverridableStringUnion } from '@mui/types';
import type { SxProps } from '@mui/system';
import type { Theme } from '../styles';
import type { MeterClasses } from './meterClasses';

export interface MeterPropsColorOverrides {}

export interface MeterSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
  /**
   * The component that renders the label.
   * @default 'span'
   */
  label?: React.ElementType | undefined;
  /**
   * The component that renders the formatted value.
   * @default 'span'
   */
  value?: React.ElementType | undefined;
  /**
   * The component that renders the track.
   * @default 'div'
   */
  track?: React.ElementType | undefined;
  /**
   * The component that renders the indicator.
   * @default 'div'
   */
  indicator?: React.ElementType | undefined;
}

type MeterSlotSxProps = { sx?: SxProps<Theme> | undefined };

type MeterSlotRenderProps = {
  /**
   * Replaces the rendered element while keeping the slot styles.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render?: useRender.RenderProp<BaseMeter.Root.State & Record<string, unknown>> | undefined;
};

export interface MeterSlotProps {
  root?: SlotComponentProps<'div', MeterSlotSxProps, MeterOwnerState> | undefined;
  label?:
    | SlotComponentProps<'span', MeterSlotSxProps & MeterSlotRenderProps, MeterOwnerState>
    | undefined;
  value?:
    | SlotComponentProps<'span', MeterSlotSxProps & MeterSlotRenderProps, MeterOwnerState>
    | undefined;
  track?:
    SlotComponentProps<'div', MeterSlotSxProps & MeterSlotRenderProps, MeterOwnerState> | undefined;
  indicator?:
    SlotComponentProps<'div', MeterSlotSxProps & MeterSlotRenderProps, MeterOwnerState> | undefined;
}

export interface MeterProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'>,
    Pick<BaseMeter.Root.Props, 'format' | 'getAriaValueText' | 'locale' | 'max' | 'min'> {
  /**
   * The current value.
   */
  value: BaseMeter.Root.Props['value'];
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MeterClasses> | undefined;
  /**
   * @ignore
   */
  className?: string | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
        MeterPropsColorOverrides
      >
    | undefined;
  /**
   * The label of the meter. Screen readers announce it as the meter's name.
   */
  label?: React.ReactNode;
  /**
   * Replaces the rendered root element while keeping the meter styles.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render?: BaseMeter.Root.Props['render'] | undefined;
  /**
   * Renders the visible value. Receives the formatted value and the raw value.
   * Setting it also shows the value.
   */
  renderValue?: ((formattedValue: string, value: number) => React.ReactNode) | undefined;
  /**
   * If `true`, the formatted value is displayed next to the label.
   * @default false
   */
  showValue?: boolean | undefined;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: MeterSlots | undefined;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: MeterSlotProps | undefined;
  /**
   * @ignore
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface MeterOwnerState extends MeterProps {}
