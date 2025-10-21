import * as React from 'react';
import { SliderProps } from './Slider';

export interface EnhancedSliderProps extends SliderProps {
  /**
   * If `true`, the slider will support range selection with two thumbs.
   * @default false
   */
  range?: boolean;
  /**
   * Custom marks to display on the slider. If not provided, marks will be auto-generated.
   */
  customMarks?: Array<{
    value: number;
    label?: React.ReactNode;
  }>;
  /**
   * If `true`, marks will be displayed on the slider.
   * @default true
   */
  showMarks?: boolean;
  /**
   * If `true`, tooltips will be displayed when hovering over the thumbs.
   * @default true
   */
  showTooltips?: boolean;
  /**
   * Custom formatter for tooltip values.
   */
  formatValueLabel?: (value: number) => string;
  /**
   * Alias for formatValueLabel for backward compatibility.
   */
  valueLabelFormat?: (value: number) => string;
}
/**
 * Enhanced Slider Component
 *
 * Builds on Material-UI's Slider with:
 *
 * * Custom marks with auto-generation
 * * Enhanced tooltips with custom formatting
 * * Range selection with descriptive labels
 * * Better default UX for common use cases
 *
 * Demos:
 *
 * - [Slider](https://mui.com/material-ui/react-slider/)
 *
 * API:
 *
 * - [EnhancedSlider API](https://mui.com/material-ui/api/enhanced-slider/)
 */
declare const EnhancedSlider: React.ForwardRefExoticComponent<
  EnhancedSliderProps & React.RefAttributes<HTMLSpanElement>
>;

export default EnhancedSlider;
