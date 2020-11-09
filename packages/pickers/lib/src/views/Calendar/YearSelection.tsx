import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-named-as-default
import Year from './Year';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { findClosestEnabledDate } from '../../_helpers/date-utils';
import { PickerSelectionState } from '../../_shared/hooks/usePickerState';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';
import { useGlobalKeyDown, keycode as keys } from '../../_shared/hooks/useKeyDown';

export interface ExportedYearSelectionProps<TDate> {
  /**
   * Callback firing on year change @DateIOType.
   */
  onYearChange?: (date: unknown) => void;
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view. @DateIOType.
   */
  shouldDisableYear?: (day: unknown) => boolean;
}

export interface YearSelectionProps<TDate> extends ExportedYearSelectionProps<TDate> {
  allowKeyboardControl?: boolean;
  changeFocusedDay: (day: TDate) => void;
  date: TDate;
  disableFuture?: boolean | null | undefined;
  disablePast?: boolean | null | undefined;
  isDateDisabled: (day: TDate) => boolean;
  maxDate: TDate;
  minDate: TDate;
  onChange: PickerOnChangeFn<TDate>;
}

export const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflowY: 'auto',
      height: '100%',
      margin: '0 4px',
    },
  },
  { name: 'MuiPickersYearSelection' }
);

export function YearSelection<TDate>({
  allowKeyboardControl,
  changeFocusedDay,
  date: __dateOrNull,
  isDateDisabled,
  maxDate,
  minDate,
  disableFuture,
  disablePast,
  onChange,
  onYearChange,
  shouldDisableYear,
}: YearSelectionProps<TDate>) {
  const now = useNow<TDate>();
  const theme = useTheme();
  const utils = useUtils<TDate>();
  const classes = useStyles();

  const selectedDate = __dateOrNull || now;
  const currentYear = utils.getYear(selectedDate);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const selectedYearRef = React.useRef<HTMLButtonElement>(null);
  const [focusedYear, setFocusedYear] = React.useState<number | null>(currentYear);

  const handleYearSelection = React.useCallback(
    (year: number, isFinish: PickerSelectionState = 'finish') => {
      const submitDate = (newDate: TDate | null) => {
        onChange(newDate, isFinish);
        changeFocusedDay(newDate || now);

        if (onYearChange) {
          onYearChange(newDate);
        }
      };

      const newDate = utils.setYear(selectedDate, year);
      if (isDateDisabled(newDate)) {
        const closestEnabledDate = findClosestEnabledDate({
          utils,
          date: newDate,
          minDate,
          maxDate,
          disablePast: Boolean(disablePast),
          disableFuture: Boolean(disableFuture),
          shouldDisableDate: isDateDisabled,
        });

        submitDate(closestEnabledDate);
      } else {
        submitDate(newDate);
      }
    },
    [
      utils,
      now,
      selectedDate,
      isDateDisabled,
      onChange,
      changeFocusedDay,
      onYearChange,
      minDate,
      maxDate,
      disablePast,
      disableFuture,
    ]
  );

  const focusYear = React.useCallback(
    (year: number) => {
      if (!isDateDisabled(utils.setYear(selectedDate, year))) {
        setFocusedYear(year);
      }
    },
    [selectedDate, isDateDisabled, utils]
  );

  const yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;
  const nowFocusedYear = focusedYear || currentYear;
  useGlobalKeyDown(Boolean(allowKeyboardControl), {
    [keys.ArrowUp]: () => focusYear(nowFocusedYear - yearsInRow),
    [keys.ArrowDown]: () => focusYear(nowFocusedYear + yearsInRow),
    [keys.ArrowLeft]: () => focusYear(nowFocusedYear + (theme.direction === 'ltr' ? -1 : 1)),
    [keys.ArrowRight]: () => focusYear(nowFocusedYear + (theme.direction === 'ltr' ? 1 : -1)),
  });

  return (
    <div className={classes.root}>
      {utils.getYearRange(minDate, maxDate).map((year) => {
        const yearNumber = utils.getYear(year);
        const selected = yearNumber === currentYear;

        return (
          <Year
            key={utils.format(year, 'year')}
            selected={selected}
            value={yearNumber}
            onSelect={handleYearSelection}
            allowKeyboardControl={allowKeyboardControl}
            focused={yearNumber === focusedYear}
            ref={selected ? selectedYearRef : undefined}
            disabled={
              (disablePast && utils.isBeforeYear(year, now)) ||
              (disableFuture && utils.isAfterYear(year, now)) ||
              (shouldDisableYear && shouldDisableYear(year))
            }
          >
            {utils.format(year, 'year')}
          </Year>
        );
      })}
    </div>
  );
}
