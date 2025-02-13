export interface SliderValueLabelProps {
  children?: React.ReactElement<{ className?: string; children?: React.ReactNode }>;
  className?: string;
  style?: React.CSSProperties;
  /**
   * If `true`, the value label is visible.
   */
  open: boolean;
  /**
   * The value of the slider.
   */
  value: React.ReactNode;
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
