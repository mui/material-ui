import * as React from 'react';

export interface ValueLabelUnstyledProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * The components used for each slot inside the ValueLabel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value?: number | number[];
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay?: 'on' | 'auto' | 'off';
}

export default function ValueLabel(props: ValueLabelUnstyledProps): JSX.Element;
