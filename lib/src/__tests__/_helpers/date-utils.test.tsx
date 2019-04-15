import { utilsToUse } from '../test-utils';
import { findClosestEnabledDate } from '../../_helpers/date-utils';

describe('findClosestEnabledDate', () => {
  const day18thText = utilsToUse.getDayText(utilsToUse.date('2018-08-18'));
  const only18th = (date: any) => utilsToUse.getDayText(date) !== day18thText;

  it('Should return null if all dates are disabled', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: '1999-01-01', // Use close-by min/max dates to reduce the test runtime.
      maxDate: '2001-01-01',
      utils: utilsToUse,
      shouldDisableDate: () => true,
      disableFuture: false,
      disablePast: false,
    });

    expect(result).toBe(null);
  });

  it('Should return given date if it is enabled', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: new Date('1900-01-01'),
      maxDate: new Date('2100-01-01'),
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
      minDate: new Date('1900-01-01'),
      maxDate: new Date('2100-01-01'),
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
      minDate: new Date('1900-01-01'),
      maxDate: new Date('2100-01-01'),
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
      minDate: new Date('1900-01-01'),
      maxDate: new Date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: true,
    });

    expect(utilsToUse.getDayText(result)).toBe(day18thText);
    expect(utilsToUse.isBefore(result, today)).toBe(false);
    expect(utilsToUse.isBefore(result, utilsToUse.addDays(today, 31))).toBe(true);
  });

  it('Should return past Saturday if disableFuture', () => {
    const today = utilsToUse.startOfDay(utilsToUse.date());
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2099-01-01'),
      minDate: new Date('1900-01-01'),
      maxDate: new Date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: true,
      disablePast: false,
    });

    expect(utilsToUse.getDayText(result)).toBe(day18thText);
    expect(utilsToUse.isBefore(result, today)).toBe(true);
    expect(utilsToUse.isBefore(result, utilsToUse.addDays(today, -31))).toBe(false);
  });

  it('Should return now if disablePast+disableFuture and now is valid', () => {
    const today = utilsToUse.startOfDay(utilsToUse.date());
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: new Date('1900-01-01'),
      maxDate: new Date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: () => false,
      disableFuture: true,
      disablePast: true,
    });

    expect(utilsToUse.isSameDay(result, today)).toBe(true);
  });

  it('Should return null if disablePast+disableFuture and now is invalid', () => {
    const today = utilsToUse.date();
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: new Date('1900-01-01'),
      maxDate: new Date('2100-01-01'),
      utils: utilsToUse,
      shouldDisableDate: date => utilsToUse.isSameDay(date, today),
      disableFuture: true,
      disablePast: true,
    });

    expect(result).toBeNull();
  });

  it('Should return minDate if it is after the date and valid', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: '2018-08-18',
      maxDate: new Date('2100-01-01'),
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
      minDate: '2018-08-01',
      maxDate: new Date('2100-01-01'),
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
      minDate: new Date('1900-01-01'),
      maxDate: '2018-07-18',
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
      minDate: new Date('1900-01-01'),
      maxDate: '2018-08-17',
      utils: utilsToUse,
      shouldDisableDate: only18th,
      disableFuture: false,
      disablePast: false,
    });

    expect(utilsToUse.isSameDay(result, utilsToUse.date('2018-07-18'))).toBe(true);
  });

  it('Should return null if minDate is after maxDate', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: '2000-01-01',
      maxDate: '1999-01-01',
      utils: utilsToUse,
      shouldDisableDate: () => false,
      disableFuture: false,
      disablePast: false,
    });

    expect(result).toBeNull();
  });
});
