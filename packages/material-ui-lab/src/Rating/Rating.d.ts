import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface IconContainerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
}

export interface RatingProps
  extends StandardProps<
    React.HTMLAttributes<HTMLSpanElement>,
    RatingClassKey,
    'children' | 'onChange'
  > {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: number;
  /**
   * If `true`, the rating will be disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when empty.
   */
  emptyIcon?: React.ReactNode;
  /**
   * The label read when the rating input is empty.
   */
  emptyLabelText?: React.ReactNode;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {number} value The rating label's value to format.
   * @returns {string}
   */
  getLabelText?: (value: number) => string;
  /**
   * The icon to display.
   */
  icon?: React.ReactNode;
  /**
   * The component containing the icon.
   */
  IconContainerComponent?: React.ElementType<IconContainerProps>;
  /**
   * Maximum rating.
   */
  max?: number;
  /**
   * The name attribute of the radio `input` elements.
   * If `readOnly` is false, the prop is required,
   * this input name`should be unique within the parent form.
   */
  name?: string;
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChange?: (event: React.ChangeEvent<{}>, value: number | null) => void;
  /**
   * Callback function that is fired when the hover state changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive?: (event: React.ChangeEvent<{}>, value: number) => void;
  /**
   * The minimum increment value change allowed.
   */
  precision?: number;
  /**
   * Removes all hover effects and pointer events.
   */
  readOnly?: boolean;
  /**
   * The size of the rating.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The rating value.
   */
  value?: number | null;
}

export type RatingClassKey =
  | 'root'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'readOnly'
  | 'disabled'
  | 'focusVisible'
  | 'visuallyhidden'
  | 'pristine'
  | 'label'
  | 'icon'
  | 'iconEmpty'
  | 'iconFilled'
  | 'iconHover'
  | 'iconFocus'
  | 'iconActive'
  | 'decimal';

/**
 *
 * Demos:
 *
 * - [Rating](https://mui.com/components/rating/)
 *
 * API:
 *
 * - [Rating API](https://mui.com/api/rating/)
 */
export default function Rating(props: RatingProps): JSX.Element;
