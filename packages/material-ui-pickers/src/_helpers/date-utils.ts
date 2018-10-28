import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';

interface FindClosestDateParams {
  date: MaterialUiPickersDate;
  utils: Utils<MaterialUiPickersDate>;
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

  let forward = utils.date(date);
  let backward = utils.date(date);
  if (utils.isBefore(date, minDate)) {
    forward = minDate;
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = maxDate;
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
