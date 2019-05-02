import { DatePickerProps } from '..';
import { Omit } from '@material-ui/core';
import { IUtils } from '@date-io/core/IUtils';
import { ParsableDate } from '../constants/prop-types';
import { BasePickerProps } from '../typings/BasePicker';

export const getDisplayDate = (
  value: ParsableDate,
  format: string,
  utils: IUtils<any>,
  isEmpty: boolean,
  { invalidLabel, emptyLabel, labelFunc }: Omit<BasePickerProps, 'value' | 'onChange'>
) => {
  const date = utils.date(value);
  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel!);
  }

  if (isEmpty) {
    return emptyLabel || '';
  }

  return utils.isValid(date) ? utils.format(date, format) : invalidLabel!;
};

export interface BaseValidationProps {
  /**
   * Message, appearing when date cannot be parsed
   * @default 'Invalid Date Format'
   */
  invalidDateMessage?: React.ReactNode;
}

export interface DateValidationProps extends BaseValidationProps {
  /**
   * Error message, shown if date is less then minimal date
   * @default 'Date should not be before minimal date'
   */
  minDateMessage?: React.ReactNode;
  /**
   * Error message, shown if date is more then maximal date
   * @default 'Date should not be after maximal date'
   */
  maxDateMessage?: React.ReactNode;
}

export const validate = (
  value: ParsableDate,
  utils: IUtils<any>,
  {
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
  }: Omit<DatePickerProps, 'views' | 'openTo'> // DateTimePicker doesn't support
): React.ReactNode => {
  const parsedValue = utils.date(value);

  // if null - do not show error
  if (value === null) {
    return '';
  }

  if (!utils.isValid(value)) {
    return invalidDateMessage;
  }

  if (
    (maxDate && utils.isAfter(parsedValue, utils.endOfDay(utils.date(maxDate)))) ||
    (disableFuture && utils.isAfter(parsedValue, utils.endOfDay(utils.date())))
  ) {
    return maxDateMessage;
  }

  if (
    (minDate && utils.isBefore(parsedValue, utils.startOfDay(utils.date(minDate)))) ||
    (disablePast && utils.isBefore(parsedValue, utils.startOfDay(utils.date())))
  ) {
    return minDateMessage;
  }

  return '';
};

export function pick12hOr24hFormat(
  userFormat: string | undefined,
  ampm: boolean | undefined = true,
  formats: { '12h': string; '24h': string }
) {
  if (userFormat) {
    return userFormat;
  }

  return ampm ? formats['12h'] : formats['24h'];
}

export function makeMaskFromFormat(format: string, numberMaskChar: string) {
  return format.replace(/[a-z]/gi, numberMaskChar);
}

export const maskedDateFormatter = (mask: string, numberMaskChar: string, refuse: RegExp) => (
  value: string
) => {
  if (value === '') {
    return value;
  }

  let result = '';
  const parsed = value.replace(refuse, '');

  let i = 0;
  let n = 0;
  while (i < mask.length) {
    const maskChar = mask[i];
    if (maskChar === numberMaskChar && n < parsed.length) {
      const parsedChar = parsed[n];
      result += parsedChar;
      n += 1;
    } else {
      result += maskChar;
    }
    i += 1;
  }

  return result;
};
