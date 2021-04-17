import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Skeleton from '@material-ui/core/Skeleton';
import { WithStyles, withStyles, MuiStyles, StyleRules } from '@material-ui/core/styles';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import {
  styles as calendarStyles,
  PickersCalendarClassKey,
} from '../CalendarPicker/PickersCalendar';

export interface CalendarPickerSkeletonProps extends React.HTMLProps<HTMLDivElement> {}

export type CalendarPickerSkeletonClassKey =
  | PickersCalendarClassKey
  | 'root'
  | 'daySkeleton'
  | 'hidden';
export const styles: MuiStyles<CalendarPickerSkeletonClassKey> = (
  theme,
): StyleRules<CalendarPickerSkeletonClassKey> => ({
  ...calendarStyles(theme),
  root: {
    alignSelf: 'start',
  },
  daySkeleton: {
    margin: `0 ${DAY_MARGIN}px`,
  },
  hidden: {
    visibility: 'hidden',
  },
});

const monthMap = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0],
];

const CalendarPickerSkeleton: React.FC<CalendarPickerSkeletonProps & WithStyles<typeof styles>> = (
  props,
) => {
  const { className, classes, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      {monthMap.map((week, index) => (
        <div key={index} className={classes.week}>
          {week.map((day, index2) => (
            <Skeleton
              key={index2}
              variant="circular"
              width={DAY_SIZE}
              height={DAY_SIZE}
              className={clsx(classes.daySkeleton, {
                [classes.hidden]: day === 0,
              })}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

CalendarPickerSkeleton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
} as any;

/**
 *
 * API:
 *
 * - [CalendarPickerSkeleton API](https://material-ui.com/api/calendar-picker-skeleton/)
 */
export default withStyles(styles, { name: 'MuiCalendarPickerSkeleton' })(CalendarPickerSkeleton);
