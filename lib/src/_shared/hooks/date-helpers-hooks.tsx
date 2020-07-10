import * as React from 'react';
import { useUtils } from './useUtils';

export function useParsedDate(possiblyUnparsedValue: any): unknown | undefined {
  const utils = useUtils();
  return React.useMemo(
    () =>
      typeof possiblyUnparsedValue === 'undefined' ? undefined : utils.date(possiblyUnparsedValue)!,
    [possiblyUnparsedValue, utils]
  );
}

interface MonthValidationOptions {
  disablePast?: boolean;
  disableFuture?: boolean;
  minDate: unknown;
  maxDate: unknown;
}

export function useNextMonthDisabled(
  month: unknown,
  { disableFuture, maxDate }: Pick<MonthValidationOptions, 'disableFuture' | 'maxDate'>
) {
  const utils = useUtils();
  return React.useMemo(() => {
    const now = utils.date();
    const lastEnabledMonth = utils.startOfMonth(
      disableFuture && utils.isBefore(now, maxDate) ? now : maxDate
    );
    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils]);
}

export function usePreviousMonthDisabled(
  month: unknown,
  { disablePast, minDate }: Pick<MonthValidationOptions, 'disablePast' | 'minDate'>
) {
  const utils = useUtils();

  return React.useMemo(() => {
    const now = utils.date();
    const firstEnabledMonth = utils.startOfMonth(
      disablePast && utils.isAfter(now, minDate) ? now : minDate
    );
    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);
}
