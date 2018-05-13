/* eslint-disable import/prefer-default-export */
export const findClosestEnabledDate = ({
  date,
  utils,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  shouldDisableDate,
}) => {
  const now = utils.date();

  if ((disableFuture || disablePast) && !shouldDisableDate(now)) {
    return now;
  }

  const diffFromMaxDate = Math.abs(utils.getDiff(date, maxDate));
  const diffFromMinDate = Math.abs(utils.getDiff(date, minDate));

  return diffFromMaxDate < diffFromMinDate
    ? utils.date(maxDate)
    : utils.date(minDate);
};

