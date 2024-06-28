export interface SliderValueLabelProps {
  children?: React.ReactElement<any>;
  className?: string;
  style?: React.CSSProperties;
  /**
   * If `true`, the value label is visible.
   */
  open: boolean;
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: number;
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
