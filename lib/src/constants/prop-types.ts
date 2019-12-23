import * as PropTypes from 'prop-types';
import { BaseClockProps } from '../views/Clock/ClockView';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';

const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

const datePickerView = PropTypes.oneOf(['year', 'month', 'day']);

export type ParsableDate = object | string | number | Date | null | undefined;

export const DomainPropTypes = { date, datePickerView };

/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
export const timePickerDefaultProps = {
  ampm: true,
  invalidDateMessage: 'Invalid Time Format',
} as BaseClockProps;

export const datePickerDefaultProps = {
  minDate: new Date('1900-01-01'),
  maxDate: new Date('2100-01-01'),
  invalidDateMessage: 'Invalid Date Format',
  minDateMessage: 'Date should not be before minimal date',
  maxDateMessage: 'Date should not be after maximal date',
  allowKeyboardControl: true,
} as BaseDatePickerProps;

export const dateTimePickerDefaultProps = {
  ...timePickerDefaultProps,
  ...datePickerDefaultProps,
  showTabs: true,
} as BaseClockProps & BaseDatePickerProps;
