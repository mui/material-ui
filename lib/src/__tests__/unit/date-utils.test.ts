import { utilsToUse } from '../test-utils';
import { findClosestEnabledDate } from '../../_helpers/date-utils';

describe('findClosestEnabledDate', () => {
  const day18thText = utilsToUse.format(utilsToUse.date('2018-08-18'), 'dayOfMonth');
  const only18th = (date: any) => utilsToUse.format(date, 'dayOfMonth') !== day18thText;

  it('Should fallback to today if all dates are disabled', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: utilsToUse.date('1999-01-01'), // Use close-by min/max dates to reduce the test runtime.
      maxDate: utilsToUse.date('2001-01-01'),
      utils: utilsToUse,
      shouldDisableDate: () => true,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isEqual(result, utilsToUse.date()));
  });

  it('Should return given date if it is enabled', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: utilsToUse.date('1900-01-01'),
      maxDate: utilsToUse.date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: () => false,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isSameDay(result, utilsToUse.date('2000-01-01'))).toBe(true);
  });

  it('Should return next 18th going from 10th', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2018-08-10'),
      minDate: utilsToUse.date('1900-01-01'),
      maxDate: utilsToUse.date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isSameDay(result, utilsToUse.date('2018-08-18'))).toBe(true);
  });

  it('Should return previous 18th going from 1st', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2018-08-01'),
      minDate: utilsToUse.date('1900-01-01'),
      maxDate: utilsToUse.date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isSameDay(result, utilsToUse.date('2018-07-18'))).toBe(true);
  });

  it('Should return future 18th if disablePast', () => {
    const today = utilsToUse.startOfDay(utilsToUse.date());
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: utilsToUse.date('1900-01-01'),
      maxDate: utilsToUse.date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: true,
    });

    expect(utilsToUse.isBefore(result, today)).toBe(false);
    expect(utilsToUse.isBefore(result, utilsToUse.addDays(today, 31))).toBe(true);
  });

  it('Should return now if disablePast+disableFuture and now is valid', () => {
    const today = utilsToUse.startOfDay(utilsToUse.date());
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: utilsToUse.date('1900-01-01'),
      maxDate: utilsToUse.date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: () => false,
      disableFuture: true,
      disablePast: true,
    });

    expect(utilsToUse.isSameDay(result, today)).toBe(true);
  });

  it('Should fallback to today if disablePast+disableFuture and now is invalid', () => {
    const today = utilsToUse.date();
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: utilsToUse.date('1900-01-01'),
      maxDate: utilsToUse.date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: date => utilsToUse.isSameDay(date, today),
      disableFuture: true,
      disablePast: true,
    });

    expect(utilsToUse.isEqual(result, utilsToUse.date()));
  });

  it('Should return minDate if it is after the date and valid', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: utilsToUse.date('2018-08-18'),
      maxDate: utilsToUse.date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isSameDay(result, utilsToUse.date('2018-08-18'))).toBe(true);
  });

  it('Should return next 18th after minDate', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: utilsToUse.date('2018-08-01'),
      maxDate: utilsToUse.date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isSameDay(result, utilsToUse.date('2018-08-18'))).toBe(true);
  });

  it('Should return maxDate if it is before the date and valid', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2050-01-01'),
      minDate: utilsToUse.date('1900-01-01'),
      maxDate: utilsToUse.date('2018-07-18'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isSameDay(result, utilsToUse.date('2018-07-18'))).toBe(true);
  });

  it('Should return previous 18th before maxDate', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2050-01-01'),
      minDate: utilsToUse.date('1900-01-01'),
      maxDate: utilsToUse.date('2018-08-17'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isSameDay(result, utilsToUse.date('2018-07-18'))).toBe(true);
  });

  it('Should fallback to today if minDate is after maxDate', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: utilsToUse.date('2000-01-01'),
      maxDate: utilsToUse.date('1999-01-01'),
      utils: utilsToUse,
      shouldDisableDate: () => false,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isEqual(result, utilsToUse.date()));
  });
});
