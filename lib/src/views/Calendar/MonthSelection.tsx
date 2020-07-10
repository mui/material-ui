import * as React from 'react';
import Month from './Month';
import { makeStyles } from '@material-ui/core/styles';
import { useUtils } from '../../_shared/hooks/useUtils';
import { ParsableDate } from '../../constants/prop-types';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';

export interface MonthSelectionProps {
  date: unknown;
  minDate?: ParsableDate;
  maxDate?: ParsableDate;
  onChange: PickerOnChangeFn;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
  onMonthChange?: (date: unknown) => void | Promise<void>;
}

export const useStyles = makeStyles(
  {
    container: {
      width: 310,
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'stretch',
    },
  },
  { name: 'MuiPickersMonthSelection' }
);

export const MonthSelection: React.FC<MonthSelectionProps> = ({
  date,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
  onChange,
  onMonthChange,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const currentMonth = utils.getMonth(date);

  const shouldDisableMonth = (month: unknown) => {
    const now = utils.date();
    const utilMinDate = utils.date(minDate);
    const utilMaxDate = utils.date(maxDate);

    const firstEnabledMonth = utils.startOfMonth(
      disablePast && utils.isAfter(now, utilMinDate) ? now : utilMinDate
    );

    const lastEnabledMonth = utils.startOfMonth(
      disableFuture && utils.isBefore(now, utilMaxDate) ? now : utilMaxDate
    );

    const isBeforeFirstEnabled = utils.isBefore(month, firstEnabledMonth);
    const isAfterLastEnabled = utils.isAfter(month, lastEnabledMonth);

    return isBeforeFirstEnabled || isAfterLastEnabled;
  };

  const onMonthSelect = React.useCallback(
    (month: number) => {
      const newDate = utils.setMonth(date, month);

      onChange(newDate, 'finish');
      if (onMonthChange) {
        onMonthChange(newDate);
      }
    },
    [date, onChange, onMonthChange, utils]
  );

  return (
    <div className={classes.container}>
      {utils.getMonthArray(date).map(month => {
        const monthNumber = utils.getMonth(month);
        const monthText = utils.format(month, 'monthShort');

        return (
          <Month
            key={monthText}
            value={monthNumber}
            selected={monthNumber === currentMonth}
            onSelect={onMonthSelect}
            disabled={shouldDisableMonth(month)}
          >
            {monthText}
          </Month>
        );
      })}
    </div>
  );
};
