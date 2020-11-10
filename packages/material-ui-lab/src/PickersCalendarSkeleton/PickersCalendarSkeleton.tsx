import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Skeleton from '@material-ui/core/Skeleton';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core/styles';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { styles as calendarStyles } from '../DayPicker/PickersCalendar';

export interface PickersCalendarSkeletonProps extends React.HTMLProps<HTMLDivElement> {}

export const styles = (theme: Theme) =>
  createStyles({
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

export type PickersCalendarSkeletonClassKey = keyof WithStyles<typeof styles>['classes'];

const monthMap = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0],
];

/**
 * @ignore - do not document.
 */
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

(PickersCalendarSkeleton as any).propTypes = {
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
};

export default withStyles(styles, { name: 'MuiCalendarSkeleton' })(PickersCalendarSkeleton);
