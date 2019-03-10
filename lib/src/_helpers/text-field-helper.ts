import { IUtils } from '@date-io/core/IUtils';
import { Omit } from '@material-ui/core';
import { BasePickerProps } from '../_shared/BasePicker';
import { DateTextFieldProps } from '../_shared/DateTextField';
import { DateType } from '../constants/prop-types';
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

  return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
};

export const getError = (
  value: MaterialUiPickersDate,
  props: DateTextFieldProps
): React.ReactNode => {
  const {
    utils,
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
  } = props;

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
