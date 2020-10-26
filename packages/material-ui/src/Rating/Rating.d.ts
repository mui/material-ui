import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface IconContainerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
}

export interface RatingProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'onChange'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall?: string;
    /** Styles applied to the root element if `size="large"`. */
    sizeLarge?: string;
    /** Styles applied to the root element if `readOnly={true}`. */
    readOnly?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Pseudo-class applied to the root element if keyboard focused. */
    focusVisible?: string;
    /** Visually hide an element. */
    visuallyHidden?: string;
    /** Styles applied to the label elements. */
    label?: string;
    /** Styles applied to the label of the "no value" input when it is active. */
    labelEmptyValueActive?: string;
    /** Styles applied to the icon wrapping elements. */
    icon?: string;
    /** Styles applied to the icon wrapping elements when empty. */
    iconEmpty?: string;
    /** Styles applied to the icon wrapping elements when filled. */
    iconFilled?: string;
    /** Styles applied to the icon wrapping elements when hover. */
    iconHover?: string;
    /** Styles applied to the icon wrapping elements when focus. */
    iconFocus?: string;
    /** Styles applied to the icon wrapping elements when active. */
    iconActive?: string;
    /** Styles applied to the icon wrapping elements when decimals are necessary. */
    decimal?: string;
  };
  /**
   * The default value. Use when the component is not controlled.
   * @default null
   */
  defaultValue?: number;
  /**
   * If `true`, the rating will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The icon to display when empty.
   * @default <StarBorder fontSize="inherit" />
   */
  emptyIcon?: React.ReactNode;
  /**
   * The label read when the rating input is empty.
   * @default 'Empty'
   */
  emptyLabelText?: React.ReactNode;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {number} value The rating label's value to format.
   * @returns {string}
   *
   * @default function defaultLabelText(value) {
   *   return `${value} Star${value !== 1 ? 's' : ''}`;
   * }
   */
  getLabelText?: (value: number) => string;
  /**
   * The icon to display.
   * @default <Star fontSize="inherit" />
   */
  icon?: React.ReactNode;
  /**
   * The component containing the icon.
   * @default function IconContainer(props) {
   *   const { value, ...other } = props;
   *   return <span {...other} />;
   * }
   */
  IconContainerComponent?: React.ElementType<IconContainerProps>;
  /**
   * Maximum rating.
   * @default 5
   */
  max?: number;
  /**
   * The name attribute of the radio `input` elements.
   * This input `name` should be unique within the page.
   * Being unique within a form is insufficient since the `name` is used to generated IDs.
   */
  name?: string;
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChange?: (event: React.SyntheticEvent, value: number | null) => void;
  /**
   * Callback function that is fired when the hover state changes.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive?: (event: React.SyntheticEvent, value: number) => void;
  /**
   * The minimum increment value change allowed.
   * @default 1
   */
  precision?: number;
  /**
   * Removes all hover effects and pointer events.
   * @default false
   */
  readOnly?: boolean;
  /**
   * The size of the rating.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The rating value.
   */
  value?: number | null;
}

export type RatingClassKey = keyof NonNullable<RatingProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Rating](https://material-ui.com/components/rating/)
 *
 * API:
 *
 * - [Rating API](https://material-ui.com/api/rating/)
 */
export default function Rating(props: RatingProps): JSX.Element;
