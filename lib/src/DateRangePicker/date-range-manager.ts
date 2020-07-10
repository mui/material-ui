import { DateRange } from './RangeTypes';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';

interface CalculateRangeChangeOptions {
  utils: MuiPickersAdapter;
  range: DateRange;
  newDate: unknown;
  currentlySelectingRangeEnd: 'start' | 'end';
}

export function calculateRangeChange({
  utils,
  range,
  newDate: selectedDate,
  currentlySelectingRangeEnd,
}: CalculateRangeChangeOptions): { nextSelection: 'start' | 'end'; newRange: DateRange } {
  const [start, end] = range;

  if (currentlySelectingRangeEnd === 'start') {
    return Boolean(end) && utils.isAfter(selectedDate, end)
      ? { nextSelection: 'end', newRange: [selectedDate, null] }
      : { nextSelection: 'end', newRange: [selectedDate, end] };
  } else {
    return Boolean(start) && utils.isBefore(selectedDate, start)
      ? { nextSelection: 'end', newRange: [selectedDate, null] }
      : { nextSelection: 'start', newRange: [start, selectedDate] };
  }
}

export function calculateRangePreview(options: CalculateRangeChangeOptions): DateRange {
  if (!options.newDate) {
    return [null, null];
  }

  const [start, end] = options.range;
  const { newRange } = calculateRangeChange(options);

  if (!start || !end) {
    return newRange;
  }

  const [previewStart, previewEnd] = newRange;
  return options.currentlySelectingRangeEnd === 'end' ? [end, previewEnd] : [previewStart, start];
}
