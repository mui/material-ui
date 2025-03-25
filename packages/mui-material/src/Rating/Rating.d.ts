import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '..';
import { RatingClasses } from './ratingClasses';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface IconContainerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
}

export interface RatingPropsSizeOverrides {}

export interface RatingRootSlotPropsOverrides {}
export interface RatingLabelSlotPropsOverrides {}
export interface RatingIconSlotPropsOverrides {}
export interface RatingDecimalSlotPropsOverrides {}

export interface RatingSlots {
  /**
   * The component used for the root slot.
   * @default 'span'
   */
  root: React.ElementType;
  /**
   * The component used for the label slot.
   * @default 'label'
   */
  label: React.ElementType;
  /**
   * The component used for the icon slot.
   * @default 'span'
   */
  icon: React.ElementType;
  /**
   * The component used fo r the decimal slot.
   * @default 'span'
   */
  decimal: React.ElementType;
}

export type RatingSlotsAndSlotProps = CreateSlotsAndSlotProps<
  RatingSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the span element.
     */
    root: SlotProps<'span', RatingRootSlotPropsOverrides, RatingOwnerState>;
    /**
     * Props forwarded to the label slot.
     * By default, the avaible props are based on the label element.
     */
    label: SlotProps<'label', RatingLabelSlotPropsOverrides, RatingOwnerState>;
    /**
     * Props forwarded to the icon slot.
     * By default, the avaible props are based on the span element.
     */
    icon: SlotProps<'span', RatingIconSlotPropsOverrides, RatingOwnerState>;
    /**
     * Props forwarded to the decimal slot.
     * By default, the avaible props are based on the span element.
     */
    decimal: SlotProps<'span', RatingDecimalSlotPropsOverrides, RatingOwnerState>;
  }
>;

export interface RatingOwnProps extends RatingSlotsAndSlotProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<RatingClasses>;
  /**
   * The default value. Use when the component is not controlled.
   * @default null
   */
  defaultValue?: number;
  /**
   * If `true`, the component is disabled.
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
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @param {number} value The rating label's value to format.
   * @returns {string}
   * @default function defaultLabelText(value) {
   *   return `${value || '0'} Star${value !== 1 ? 's' : ''}`;
   * }
   */
  getLabelText?: (value: number) => string;
  /**
   * If `true`, only the selected icon will be highlighted.
   * @default false
   */
  highlightSelectedOnly?: boolean;
  /**
   * The icon to display.
   * @default <Star fontSize="inherit" />
   */
  icon?: React.ReactNode;
  /**
   * The component containing the icon.
   * @deprecated Use `slotProps.icon.component` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
   * Being unique within a form is insufficient since the `name` is used to generate IDs.
   */
  name?: string;
  /**
   * Callback fired when the value changes.
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {number|null} value The new value.
   */
  onChange?: (event: React.SyntheticEvent, value: number | null) => void;
  /**
   * Callback function that is fired when the hover state changes.
   * @param {React.SyntheticEvent} event The event source of the callback.
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
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', RatingPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The rating value.
   */
  value?: number | null;
}

export interface RatingOwnerState extends Omit<RatingProps, 'slots' | 'slotProps'> {}

export type RatingTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'span',
> = {
  props: AdditionalProps & RatingOwnProps;
  defaultComponent: RootComponent;
};

/**
 *
 * Demos:
 *
 * - [Rating](https://mui.com/material-ui/react-rating/)
 *
 * API:
 *
 * - [Rating API](https://mui.com/material-ui/api/rating/)
 */
declare const Rating: OverridableComponent<RatingTypeMap>;

export type RatingProps<
  RootComponent extends React.ElementType = RatingTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<RatingTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Rating;
