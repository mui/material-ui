import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { experimentalStyled } from '@material-ui/core/styles';
import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';
import PickersMonth from './PickersMonth';
import { useUtils, useNow } from '../internal/pickers/hooks/useUtils';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';

export function getMonthPickerUtilityClass(slot: string) {
  return generateUtilityClass('MuiMonthPicker', slot);
}

export const monthPickerClasses = generateUtilityClasses('MuiMonthPicker', ['root']);

export interface MonthPickerProps<TDate> {
  className?: string;
  /** Date value for the MonthPicker */
  date: TDate | null;
  /** If `true` past days are disabled. */
  disablePast?: boolean | null;
  /** If `true` future days are disabled. */
  disableFuture?: boolean | null;
  /** Minimal selectable date. */
  minDate: TDate;
  /** Maximal selectable date. */
  maxDate: TDate;
  /** Callback fired on date change. */
  onChange: PickerOnChangeFn<TDate>;
  onMonthChange?: (date: TDate) => void | Promise<void>;
}

export type MonthPickerClassKey = 'root';

const MonthPickerRoot = experimentalStyled(
  'div',
  {},
  { skipSx: true },
)({
  width: 310,
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'stretch',
});

const MonthPicker = React.forwardRef(function MonthPicker<TDate>(
  props: MonthPickerProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    date,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    onMonthChange,
  } = props;

  const utils = useUtils<TDate>();
  const now = useNow<TDate>();
  const currentMonth = utils.getMonth(date || now);

  const shouldDisableMonth = (month: TDate) => {
    const firstEnabledMonth = utils.startOfMonth(
      disablePast && utils.isAfter(now, minDate) ? now : minDate,
    );

    const lastEnabledMonth = utils.startOfMonth(
      disableFuture && utils.isBefore(now, maxDate) ? now : maxDate,
    );

    const isBeforeFirstEnabled = utils.isBefore(month, firstEnabledMonth);
    const isAfterLastEnabled = utils.isAfter(month, lastEnabledMonth);

    return isBeforeFirstEnabled || isAfterLastEnabled;
  };

  const onMonthSelect = (month: number) => {
    const newDate = utils.setMonth(date || now, month);

    onChange(newDate, 'finish');
    if (onMonthChange) {
      onMonthChange(newDate);
    }
  };

  return (
    <MonthPickerRoot ref={ref} className={clsx(monthPickerClasses.root, className)}>
      {utils.getMonthArray(date || now).map((month) => {
        const monthNumber = utils.getMonth(month);
        const monthText = utils.format(month, 'monthShort');

        return (
          <PickersMonth
            key={monthText}
            value={monthNumber}
            selected={monthNumber === currentMonth}
            onSelect={onMonthSelect}
            disabled={shouldDisableMonth(month)}
          >
            {monthText}
          </PickersMonth>
        );
      })}
    </MonthPickerRoot>
  );
});

MonthPicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Date value for the MonthPicker
   */
  date: PropTypes.any,
  /**
   * If `true` future days are disabled.
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true` past days are disabled.
   */
  disablePast: PropTypes.bool,
  /**
   * Maximal selectable date.
   */
  maxDate: PropTypes.any.isRequired,
  /**
   * Minimal selectable date.
   */
  minDate: PropTypes.any.isRequired,
  /**
   * Callback fired on date change.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  onMonthChange: PropTypes.func,
} as any;

/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [MonthPicker API](https://material-ui.com/api/month-picker/)
 */
export default MonthPicker as <TDate>(
  props: MonthPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
