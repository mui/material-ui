import { IUtils } from '@date-io/core/IUtils';
import { DatePickerViewType } from '../constants/DatePickerView';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';

interface FindClosestDateParams {
  date: MaterialUiPickersDate;
  utils: IUtils<MaterialUiPickersDate>;
  minDate: DateType;
  maxDate: DateType;
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

  minDate = minDate && utils.date(minDate);
  maxDate = maxDate && utils.date(maxDate);

  if (disablePast && utils.isBefore(minDate, today)) {
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

  return null;
};

export const isYearOnlyView = (views: DatePickerViewType[]) =>
  views.length === 1 && views[0] === 'year';

export const isYearAndMonthViews = (views: DatePickerViewType[]) =>
  views.length === 2 && views.includes('month') && views.includes('year');

export const getFormatByViews = (
  views: DatePickerViewType[],
  utils: IUtils<MaterialUiPickersDate>
) => {
  if (isYearOnlyView(views)) {
    return utils.yearFormat;
  }

  if (isYearAndMonthViews(views)) {
    return utils.yearMonthFormat;
  }

  return utils.dateFormat;
};
