import * as React from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';

/**
 * Generates marks for the slider based on min, max, and step values
 */
function generateMarks(min, max, step, customMarks) {
  if (customMarks && customMarks.length > 0) {
    return customMarks;
  }

  // Auto-generate marks at regular intervals
  const marks = [];
  const markStep = step * 5; // Show marks every 5 steps for better readability

  for (let i = min; i <= max; i += markStep) {
    marks.push({
      value: i,
      label: i.toString(),
    });
  }

  // Always include the max value if not already included
  if (marks.length === 0 || marks[marks.length - 1].value !== max) {
    marks.push({
      value: max,
      label: max.toString(),
    });
  }

  return marks;
}

/**
 * Formats the value label for tooltips
 */
function formatValueLabelFn(value, index, formatFunction, rangeLabels) {
  if (formatFunction) {
    return formatFunction(value, index);
  }

  // For range sliders, add descriptive labels
  if (Array.isArray(value) && rangeLabels) {
    if (index === 0 && rangeLabels.min) {
      return `${rangeLabels.min}: ${value[index]}`;
    }
    if (index === 1 && rangeLabels.max) {
      return `${rangeLabels.max}: ${value[index]}`;
    }
  }

  return Array.isArray(value) ? `${value[0]} - ${value[1]}` : value.toString();
}

/**
 * Enhanced Slider Component
 *
 * Builds on Material-UI's Slider with:
 * - Custom marks with auto-generation
 * - Enhanced tooltips with custom formatting
 * - Range selection with descriptive labels
 * - Better default UX for common use cases
 */
const EnhancedSlider = React.forwardRef(function EnhancedSlider(props, ref) {
  const {
    range = false,
    customMarks,
    showMarks = true,
    showTooltips = true,
    min = 0,
    max = 100,
    step = 1,
    valueLabelFormat,
    formatValueLabel, // alias for backward compatibility
    rangeLabels,
    // Extract value and defaultValue to handle them specially
    value: valueProp,
    defaultValue: defaultValueProp,
    ...other
  } = props;

  // Set sensible defaults based on range mode
  const defaultValue = range
    ? [Math.round(min + (max - min) * 0.25), Math.round(min + (max - min) * 0.75)]
    : Math.round(min + (max - min) / 2);

  const value = valueProp ?? defaultValueProp ?? defaultValue;

  // Generate marks if enabled
  const marks = showMarks ? generateMarks(min, max, step, customMarks) : false;

  // Configure tooltip display
  const valueLabelDisplay = showTooltips ? 'auto' : 'off';

  // Enhanced aria labels for accessibility
  const getAriaValueText = React.useCallback(
    (sliderValue, index) => {
      return formatValueLabelFn(
        sliderValue,
        index,
        valueLabelFormat || formatValueLabel || null,
        rangeLabels,
      );
    },
    [valueLabelFormat, formatValueLabel, rangeLabels],
  );

  // Configure slot props for custom value label formatting
  const slotProps = React.useMemo(
    () => ({
      ...other.slotProps,
      valueLabel: {
        ...other.slotProps?.valueLabel,
        children: (sliderValue, index) =>
          formatValueLabelFn(
            sliderValue,
            index,
            valueLabelFormat || formatValueLabel || null,
            rangeLabels,
          ),
      },
    }),
    [other.slotProps, valueLabelFormat, formatValueLabel, rangeLabels],
  );

  return (
    <Slider
      ref={ref}
      {...other}
      min={min}
      max={max}
      step={step}
      value={value}
      marks={marks}
      valueLabelDisplay={valueLabelDisplay}
      getAriaValueText={getAriaValueText}
      slotProps={slotProps}
    />
  );
});

EnhancedSlider.propTypes = {
  /**
   * If `true`, the slider will support range selection with two thumbs.
   * @default false
   */
  range: PropTypes.bool,
  /**
   * Custom marks to display on the slider. If not provided, marks will be auto-generated.
   */
  customMarks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.node,
    }),
  ),
  /**
   * If `true`, marks will be displayed on the slider.
   * @default true
   */
  showMarks: PropTypes.bool,
  /**
   * If `true`, tooltips will be displayed when hovering over the thumbs.
   * @default true
   */
  showTooltips: PropTypes.bool,
  /**
   * The minimum allowed value of the slider.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * The maximum allowed value of the slider.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The granularity with which the slider can step through values.
   * @default 1
   */
  step: PropTypes.number,
  /**
   * A function to format the value displayed in tooltips and aria labels.
   * @param {number} value The value to format
   * @param {number} index The index of the thumb (for range sliders)
   * @returns {string}
   */
  valueLabelFormat: PropTypes.func,
  /**
   * Alias for valueLabelFormat for backward compatibility.
   * @param {number} value The value to format
   * @param {number} index The index of the thumb (for range sliders)
   * @returns {string}
   */
  formatValueLabel: PropTypes.func,
  /**
   * Labels for range slider thumbs.
   */
  rangeLabels: PropTypes.shape({
    min: PropTypes.string,
    max: PropTypes.string,
  }),
  /**
   * The value of the slider. For range sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
};

export default EnhancedSlider;
