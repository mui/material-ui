import * as React from 'react';
import Year from './Year';
import { MaterialUiPickersDate } from '../../typings/date';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';
import { useGlobalKeyDown, keycode as keys } from '../../_shared/hooks/useKeyDown';

export interface ExportedYearSelectionProps {
  /**
   * Callback firing on year change @DateIOType.
   */
  onYearChange?: (date: MaterialUiPickersDate) => void;
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view. @DateIOType.
   */
  shouldDisableYear?: (day: MaterialUiPickersDate) => boolean;
}

export interface YearSelectionProps extends ExportedYearSelectionProps {
  allowKeyboardControl?: boolean;
  changeFocusedDay: (day: MaterialUiPickersDate) => void;
  date: MaterialUiPickersDate;
  disableFuture?: boolean | null | undefined;
  disablePast?: boolean | null | undefined;
  isDateDisabled: (day: MaterialUiPickersDate) => boolean;
  maxDate: MaterialUiPickersDate;
  minDate: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinish: boolean) => void;
}

export const useStyles = makeStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflowY: 'auto',
      height: '100%',
    },
  },
  { name: 'MuiPickersYearSelection' }
);

export const YearSelection: React.FC<YearSelectionProps> = ({
  allowKeyboardControl,
  changeFocusedDay,
  date: __dateOrNull,
  isDateDisabled,
  maxDate,
  minDate,
  onChange,
  onYearChange,
  shouldDisableYear,
}) => {
  const now = useNow();
  const theme = useTheme();
  const utils = useUtils();
  const classes = useStyles();

  const selectedDate = __dateOrNull || now;
  const currentYear = utils.getYear(selectedDate);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const selectedYearRef = React.useRef<HTMLButtonElement>(null);
  const [focusedYear, setFocusedYear] = React.useState<number | null>(currentYear);

  React.useEffect(() => {
    if (allowKeyboardControl && selectedYearRef.current && selectedYearRef.current.scrollIntoView) {
      try {
        selectedYearRef.current.scrollIntoView({
          block: wrapperVariant === 'static' ? 'nearest' : 'center',
        });
      } catch (e) {
        // call without arguments in case when scrollIntoView works improperly (e.g. Firefox 52-57)
        selectedYearRef.current.scrollIntoView();
      }
    }
  }, []); // eslint-disable-line

  const handleYearSelection = React.useCallback(
    (year: number, isFinish = true) => {
      const newDate = utils.setYear(selectedDate, year);
      if (isDateDisabled(newDate)) {
        return;
      }

      if (onYearChange) {
        onYearChange(newDate);
      }

      onChange(newDate, isFinish);
      changeFocusedDay(newDate);
    },
    [changeFocusedDay, selectedDate, isDateDisabled, onChange, onYearChange, utils]
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
    <div>
      <div className={classes.container}>
        {utils.getYearRange(minDate, maxDate).map(year => {
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
                // Make sure that final date (with month and day included) will be enabled
                isDateDisabled(utils.setYear(selectedDate, yearNumber)) ||
                (shouldDisableYear && shouldDisableYear(year))
              }
            >
              {utils.format(year, 'year')}
            </Year>
          );
        })}
      </div>
    </div>
  );
};
