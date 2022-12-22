export interface SliderValueLabelProps {
  children?: React.ReactElement;
  className?: string;
  /**
   * If `true`, the value label is visible.
   */
  open: boolean;
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: number;
}
