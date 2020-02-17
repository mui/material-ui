import * as React from 'react';
import Year from './Year';
import { DateType } from '@date-io/type';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';
import { useGlobalKeyDown, keycode as keys } from '../../_shared/hooks/useKeyDown';

export interface YearSelectionProps {
  date: MaterialUiPickersDate;
  minDate: DateType;
  maxDate: DateType;
  onChange: (date: MaterialUiPickersDate, isFinish: boolean) => void;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
  allowKeyboardControl?: boolean;
  isDateDisabled: (day: MaterialUiPickersDate) => boolean;
  onYearChange?: (date: MaterialUiPickersDate) => void;
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
  allowKeyboardControl,
}) => {
  const theme = useTheme();
  const utils = useUtils();
  const classes = useStyles();
  const currentYear = utils.getYear(date);
  const [focusedYear, setFocused] = React.useState<number | null>(currentYear);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const selectedYearRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (selectedYearRef.current && selectedYearRef.current.scrollIntoView) {
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

  const yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;
  const nowFocusedYear = focusedYear || currentYear;
  useGlobalKeyDown(Boolean(allowKeyboardControl), {
    [keys.ArrowUp]: () => setFocused(nowFocusedYear - yearsInRow),
    [keys.ArrowDown]: () => setFocused(nowFocusedYear + yearsInRow),
    [keys.ArrowLeft]: () => setFocused(nowFocusedYear + (theme.direction === 'ltr' ? -1 : 1)),
    [keys.ArrowRight]: () => setFocused(nowFocusedYear + (theme.direction === 'ltr' ? 1 : -1)),
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
                (disablePast && utils.isBeforeYear(year, utils.date())) ||
                  (disableFuture && utils.isAfterYear(year, utils.date()))
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
