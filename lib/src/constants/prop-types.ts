import * as PropTypes from 'prop-types';
import { TimePickerProps } from '../TimePicker';
import { DateTimePickerProps } from '../DateTimePicker';
import { DatePickerProps } from '../DatePicker/DatePicker';

const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

const datePickerView = PropTypes.oneOf(['year', 'month', 'day']);

export type DateType = object | string | number | Date | null | undefined;

export const DomainPropTypes = { date, datePickerView };

export const timePickerDefaultProps = {
  ampm: true,
  invalidDateMessage: 'Invalid Time Format',
} as TimePickerProps;

export const datePickerDefaultProps = {
  views: ['year', 'day'],
  invalidDateMessage: 'Invalid Date Format',
  minDateMessage: 'Date should not be before minimal date',
  maxDateMessage: 'Date should not be after maximal date',
} as DatePickerProps;

export const dateTimePickerDefaultProps = {
  ...timePickerDefaultProps,
  ...datePickerDefaultProps,
  showTabs: true,
  // @ts-ignore
  views: undefined,
} as DateTimePickerProps;
