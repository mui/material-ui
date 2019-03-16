import { IUtils } from '@date-io/core/IUtils';
import { Omit } from '@material-ui/core';
import { DatePickerProps } from '..';
import { BasePickerProps } from '../_shared/BasePicker';
import { DateTextFieldProps } from '../_shared/DateTextField';
import { DateType } from '../constants/prop-types';
import { BaseDatePickerProps } from '../DatePicker/DatePickerRoot';
import { MaterialUiPickersDate } from '../typings/date';

export const getDisplayDate = ({
  utils,
  format,
  value,
  invalidLabel,
  emptyLabel,
  labelFunc,
}: DateTextFieldProps) => {
  const isEmpty = value === null;
  const date = utils.date(value);

  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel!);
  }

  if (isEmpty) {
    return emptyLabel;
  }

  return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
};

export const getDisplayDate2 = (
  value: DateType,
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

export interface DateValidationProps {
  /** Error message, shown if date is less then minimal date */
  minDateMessage?: React.ReactNode;
  /** Error message, shown if date is more then maximal date */
  maxDateMessage?: React.ReactNode;
  /** Message, appearing when date cannot be parsed */
  invalidDateMessage?: React.ReactNode;
}

export const getError = (
  value: MaterialUiPickersDate,
  utils: IUtils<any>,
  {
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
  }: DatePickerProps
): React.ReactNode => {
  // if null - do not show error
  if (utils.isNull(value)) {
    return '';
  }

  if (!utils.isValid(value)) {
    return invalidDateMessage;
  }

  if (
    (maxDate && utils.isAfter(value, utils.endOfDay(utils.date(maxDate)))) ||
    (disableFuture && utils.isAfter(value, utils.endOfDay(utils.date())))
  ) {
    return maxDateMessage;
  }

  if (
    (minDate && utils.isBefore(value, utils.startOfDay(utils.date(minDate)))) ||
    (disablePast && utils.isBefore(value, utils.startOfDay(utils.date())))
  ) {
    return minDateMessage;
  }

  return '';
};

export function makeMaskFromFormat(format: string, numberMaskChar: string) {
  return format.replace(/[a-z]/gi, numberMaskChar);
}

export const maskedDateFormatter = (mask: string, numberMaskChar: string, refuse: RegExp) => (
  value: string
) => {
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
