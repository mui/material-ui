import { utilsToUse } from '../test-utils';
import { findClosestEnabledDate } from '../../src/_helpers/date-utils';

describe('findClosestEnabledDate', () => {
  it('Should return now if its enabled and passed disablePast | disableFuture', () => {
    const today = utilsToUse.format(utilsToUse.date(), 'YYYY-MM-DD');
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: '2100-01-01',
      maxDate: '2100-01-01',
      utils: utilsToUse,
      shouldDisableDate: () => false,
      disableFuture: true,
      disablePast: true,
    });

    expect(utilsToUse.format(result, 'YYYY-MM-DD')).toBe(today);
  });

  it('Should return min date if its closest to now', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: '2010-01-01',
      maxDate: '2100-01-01',
      utils: utilsToUse,
      shouldDisableDate: () => false,
      disableFuture: false,
      disablePast: false,
    });

    expect(result).toEqual(utilsToUse.date('2010-01-01'));
  });

  it('Should return max date if its closest to now', () => {
    const result = findClosestEnabledDate({
      date: utilsToUse.date('2000-01-01'),
      minDate: '1900-01-01',
      maxDate: '2010-01-01',
      utils: utilsToUse,
      shouldDisableDate: () => false,
      disableFuture: false,
      disablePast: false,
    });

    expect(result).toEqual(utilsToUse.date('2010-01-01'));
  });
});

