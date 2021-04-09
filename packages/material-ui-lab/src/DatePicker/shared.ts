import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { DayPickerView } from '../DayPicker';

export const isYearOnlyView = (views: readonly DayPickerView[]): views is ReadonlyArray<'year'> =>
  views.length === 1 && views[0] === 'year';

export const isYearAndMonthViews = (
  views: readonly DayPickerView[],
): views is ReadonlyArray<'month' | 'year'> =>
  views.length === 2 && views.indexOf('month') !== -1 && views.indexOf('year') !== -1;

export const getFormatAndMaskByViews = (
  views: readonly DayPickerView[],
  utils: MuiPickersAdapter,
) => {
  if (isYearOnlyView(views)) {
    return {
      mask: '____',
      inputFormat: utils.formats.year,
    };
  }

  if (isYearAndMonthViews(views)) {
    return {
      disableMaskedInput: true,
      inputFormat: utils.formats.monthAndYear,
    };
  }

  return {
    mask: '__/__/____',
    inputFormat: utils.formats.keyboardDate,
  };
};
