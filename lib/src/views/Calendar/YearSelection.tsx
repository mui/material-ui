import * as React from 'react';
import Year from './Year';
import { MaterialUiPickersDate } from '../../typings/date';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';
import { useGlobalKeyDown, keycode as keys } from '../../_shared/hooks/useKeyDown';

export interface ExportedYearSelectionProps {
  /** Callback firing on year change @DateIOType */
  onYearChange?: (date: MaterialUiPickersDate) => void;
  /** Disable specific years dynamically. Works like `shouldDisableDate` but for year selection view. @DateIOType */
  shouldDisableYear?: (day: MaterialUiPickersDate) => boolean;
}

export interface YearSelectionProps extends ExportedYearSelectionProps {
  date: MaterialUiPickersDate;
  minDate: MaterialUiPickersDate;
  maxDate: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinish: boolean) => void;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
  allowKeyboardControl?: boolean;
  isDateDisabled: (day: MaterialUiPickersDate) => boolean;
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
  date,
  onChange,
  onYearChange,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  isDateDisabled,
  shouldDisableYear,
  allowKeyboardControl,
}) => {
  const now = useNow();
  const theme = useTheme();
  const utils = useUtils();
  const classes = useStyles();
  const currentYear = utils.getYear(date);
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
      const newDate = utils.setYear(date, year);
      if (isDateDisabled(newDate)) {
        return;
      }

      if (onYearChange) {
        onYearChange(newDate);
      }

      onChange(newDate, isFinish);
    },
    [date, isDateDisabled, onChange, onYearChange, utils]
  );

  const focusYear = React.useCallback(
    (year: number) => {
      if (!isDateDisabled(utils.setYear(date, year))) {
        setFocusedYear(year);
      }
    },
    [date, isDateDisabled, utils]
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
              disabled={Boolean(
                (disablePast && utils.isBeforeYear(year, now)) ||
                  (disableFuture && utils.isAfterYear(year, now)) ||
                  (shouldDisableYear && shouldDisableYear(year))
              )}
            >
              {utils.format(year, 'year')}
            </Year>
          );
        })}
      </div>
    </div>
  );
};
