import { arrayIncludes } from './utils';
import { IUtils } from '@date-io/core/IUtils';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { BasePickerProps } from '../typings/BasePicker';
import { DatePickerView } from '../DatePicker/DatePicker';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';
import { DateRange, RangeInput } from '../DateRangePicker/RangeTypes';

interface FindClosestDateParams {
  date: MaterialUiPickersDate;
  utils: IUtils<MaterialUiPickersDate>;
  minDate: MaterialUiPickersDate;
  maxDate: MaterialUiPickersDate;
  disableFuture: boolean;
  disablePast: boolean;
  shouldDisableDate: (date: MaterialUiPickersDate) => boolean;
}

export const findClosestEnabledDate = ({
  date,
  utils,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  shouldDisableDate,
}: FindClosestDateParams) => {
  const today = utils.startOfDay(utils.date());

  if (disablePast && utils.isBefore(minDate!, today)) {
    minDate = today;
  }

  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }

  let forward = date;
  let backward = date;
  if (utils.isBefore(date, minDate)) {
    forward = utils.date(minDate);
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = utils.date(maxDate);
    }

    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }
    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }

    if (forward) {
      if (!shouldDisableDate(forward)) {
        return forward;
      }
      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!shouldDisableDate(backward)) {
        return backward;
      }
      backward = utils.addDays(backward, -1);
    }
  }

  // fallback to today if no enabled days
  return utils.date();
};

export const isYearOnlyView = (views: readonly DatePickerView[]) =>
  views.length === 1 && views[0] === 'year';

export const isYearAndMonthViews = (views: readonly DatePickerView[]) =>
  views.length === 2 && arrayIncludes(views, 'month') && arrayIncludes(views, 'year');

export const getFormatByViews = (
  views: readonly DatePickerView[],
  utils: IUtils<MaterialUiPickersDate>
) => {
  if (isYearOnlyView(views)) {
    return utils.formats.year;
  }

  if (isYearAndMonthViews(views)) {
    return utils.formats.monthAndYear;
  }

  return utils.formats.keyboardDate;
};

export function parsePickerInputValue(
  utils: MuiPickersAdapter,
  { value }: BasePickerProps
): MaterialUiPickersDate | null {
  const parsedValue = utils.date(value);

  return utils.isValid(parsedValue) ? parsedValue : null;
}

export function parseRangeInputValue(
  utils: MuiPickersAdapter,
  { value = [null, null] }: BasePickerProps<RangeInput, DateRange>
) {
  return value.map(date =>
    !utils.isValid(date) || date === null ? null : utils.startOfDay(utils.date(date))
  ) as DateRange;
}

export const isRangeValid = (
  utils: MuiPickersAdapter,
  range: DateRange | null
): range is DateRange => {
  return Boolean(range && range[0] && range[1] && utils.isBefore(range[0], range[1]));
};

export const isWithinRange = (
  utils: MuiPickersAdapter,
  day: MaterialUiPickersDate,
  range: DateRange | null
) => {
  return isRangeValid(utils, range) && utils.isWithinRange(day, range);
};

export const isStartOfRange = (
  utils: MuiPickersAdapter,
  day: MaterialUiPickersDate,
  range: DateRange | null
) => {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[0]);
};

export const isEndOfRange = (
  utils: MuiPickersAdapter,
  day: MaterialUiPickersDate,
  range: DateRange | null
) => {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[1]);
};

export interface DateValidationProps {
  /**
   * Min selectable date.
   * @default Date(1900-01-01)
   */
  minDate?: MaterialUiPickersDate;
  /**
   * Max selectable date.
   * @default Date(2099-31-12)
   */
  maxDate?: MaterialUiPickersDate;
  /**
   * Disable specific date @DateIOType.
   */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
  /**
   * Disable past dates.
   * @default false
   */
  disablePast?: boolean;
  /**
   * Disable future dates.
   * @default false
   */
  disableFuture?: boolean;
}

export const validateDate = (
  utils: MuiPickersAdapter,
  value: MaterialUiPickersDate | ParsableDate,
  { minDate, maxDate, disableFuture, shouldDisableDate, disablePast }: DateValidationProps
) => {
  const now = utils.date();
  const date = utils.date(value);

  if (value === null) {
    return null;
  }

  switch (true) {
    case !utils.isValid(value):
      return 'invalidDate';

    case Boolean(shouldDisableDate && shouldDisableDate(date)):
      return 'shouldDisableDate';

    case Boolean(disableFuture && utils.isAfterDay(date, now)):
      return 'disableFuture';

    case Boolean(disablePast && utils.isBeforeDay(date, now)):
      return 'disablePast';

    case Boolean(minDate && utils.isBeforeDay(date, minDate)):
      return 'minDate';

    case Boolean(maxDate && utils.isAfterDay(date, maxDate)):
      return 'maxDate';

    default:
      return null;
  }
};

export type DateValidationError = ReturnType<typeof validateDate>;

type DateRangeValidationErrorValue = DateValidationError | 'invalidRange' | null;

export type DateRangeValidationError = [
  DateRangeValidationErrorValue,
  DateRangeValidationErrorValue
];

export const validateDateRange = (
  utils: MuiPickersAdapter,
  value: RangeInput,
  dateValidationProps: DateValidationProps
): [DateRangeValidationErrorValue, DateRangeValidationErrorValue] => {
  const [start, end] = value;

  // for partial input
  if (start === null || end === null) {
    return [null, null];
  }

  const dateValidations = [
    validateDate(utils, start, dateValidationProps),
    validateDate(utils, end, dateValidationProps),
  ] as [DateRangeValidationErrorValue, DateRangeValidationErrorValue];

  if (dateValidations[0] || dateValidations[1]) {
    return dateValidations;
  }

  if (!isRangeValid(utils, [utils.date(start), utils.date(end)])) {
    return ['invalidRange', 'invalidRange'];
  }

  return [null, null];
};
