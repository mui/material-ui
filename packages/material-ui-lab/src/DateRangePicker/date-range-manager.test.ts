import { expect } from 'chai';
import { calculateRangeChange, calculateRangePreview } from './date-range-manager';
import { adapterToUse } from '../internal/pickers/test-utils';
import { DateRange } from './RangeTypes';

const start2018 = adapterToUse.date('2018-01-01T00:00:00.000');
const mid2018 = adapterToUse.date('2018-06-01T00:00:00.000');
const end2019 = adapterToUse.date('2019-01-01T00:00:00.000');

describe('date-range-manager', () => {
  [
    {
      range: [null, null],
      selectingEnd: 'start' as const,
      newDate: start2018,
      expectedRange: [start2018, null],
      expectedNextSelection: 'end' as const,
    },
    {
      range: [start2018, null],
      selectingEnd: 'start' as const,
      newDate: end2019,
      expectedRange: [end2019, null],
      expectedNextSelection: 'end' as const,
    },
    {
      range: [null, end2019],
      selectingEnd: 'start' as const,
      newDate: mid2018,
      expectedRange: [mid2018, end2019],
      expectedNextSelection: 'end' as const,
    },
    {
      range: [null, end2019],
      selectingEnd: 'end' as const,
      newDate: mid2018,
      expectedRange: [null, mid2018],
      expectedNextSelection: 'start' as const,
    },
    {
      range: [mid2018, null],
      selectingEnd: 'start' as const,
      newDate: start2018,
      expectedRange: [start2018, null],
      expectedNextSelection: 'end' as const,
    },
    {
      range: [start2018, end2019],
      selectingEnd: 'start' as const,
      newDate: mid2018,
      expectedRange: [mid2018, end2019],
      expectedNextSelection: 'end' as const,
    },
    {
      range: [start2018, end2019],
      selectingEnd: 'end' as const,
      newDate: mid2018,
      expectedRange: [start2018, mid2018],
      expectedNextSelection: 'start' as const,
    },
    {
      range: [mid2018, end2019],
      selectingEnd: 'start' as const,
      newDate: start2018,
      expectedRange: [start2018, end2019],
      expectedNextSelection: 'end' as const,
    },
    {
      range: [start2018, mid2018],
      selectingEnd: 'end' as const,
      newDate: mid2018,
      expectedRange: [start2018, mid2018],
      expectedNextSelection: 'start' as const,
    },
  ].forEach(({ range, selectingEnd, newDate, expectedRange, expectedNextSelection }) => {
    it(`calculateRangeChange should return ${expectedRange} when selecting ${selectingEnd} of ${range} with user input ${newDate}`, () => {
      expect(
        calculateRangeChange({
          utils: adapterToUse,
          range: range as DateRange<Date>,
          newDate,
          currentlySelectingRangeEnd: selectingEnd,
        }),
      ).to.deep.equal({
        nextSelection: expectedNextSelection,
        newRange: expectedRange,
      });
    });
  });

  [
    {
      range: [start2018, end2019],
      selectingEnd: 'start' as const,
      newDate: null,
      expectedRangePreview: [null, null],
    },
    {
      range: [null, null],
      selectingEnd: 'start' as const,
      newDate: start2018,
      expectedRangePreview: [start2018, null],
    },
    {
      range: [start2018, null],
      selectingEnd: 'start' as const,
      newDate: end2019,
      expectedRangePreview: [end2019, null],
    },
    {
      range: [null, end2019],
      selectingEnd: 'start' as const,
      newDate: mid2018,
      expectedRangePreview: [mid2018, end2019],
    },
    {
      range: [null, end2019],
      selectingEnd: 'end' as const,
      newDate: mid2018,
      expectedRangePreview: [null, mid2018],
    },
    {
      range: [mid2018, null],
      selectingEnd: 'start' as const,
      newDate: start2018,
      expectedRangePreview: [start2018, null],
    },
    {
      range: [mid2018, end2019],
      selectingEnd: 'start' as const,
      newDate: start2018,
      expectedRangePreview: [start2018, mid2018],
    },
    {
      range: [start2018, mid2018],
      selectingEnd: 'end' as const,
      newDate: end2019,
      expectedRangePreview: [mid2018, end2019],
    },
  ].forEach(({ range, selectingEnd, newDate, expectedRangePreview }) => {
    it(`calculateRangePreview should return ${expectedRangePreview} when selecting ${selectingEnd} of $range when user hover ${newDate}`, () => {
      expect(
        calculateRangePreview({
          utils: adapterToUse,
          range: range as DateRange<Date>,
          newDate,
          currentlySelectingRangeEnd: selectingEnd,
        }),
      ).to.deep.equal(expectedRangePreview);
    });
  });
});
