import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Skeleton from '@material-ui/core/Skeleton';
import { WithStyles, withStyles, MuiStyles, StyleRules } from '@material-ui/core/styles';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { styles as calendarStyles, PickersCalendarClassKey } from '../DayPicker/PickersCalendar';

export interface PickersCalendarSkeletonProps extends React.HTMLProps<HTMLDivElement> {}

export type PickersCalendarSkeletonClassKey =
  | PickersCalendarClassKey
  | 'root'
  | 'daySkeleton'
  | 'hidden';
export const styles: MuiStyles<PickersCalendarSkeletonClassKey> = (
  theme,
): StyleRules<PickersCalendarSkeletonClassKey> => ({
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

const PickersCalendarSkeleton: React.FC<
  PickersCalendarSkeletonProps & WithStyles<typeof styles>
> = (props) => {
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

PickersCalendarSkeleton.propTypes /* remove-proptypes */ = {
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
 * - [PickersCalendarSkeleton API](https://material-ui.com/api/pickers-calendar-skeleton/)
 */
export default withStyles(styles, { name: 'MuiCalendarSkeleton' })(PickersCalendarSkeleton);
