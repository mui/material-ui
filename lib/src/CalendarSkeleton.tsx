import * as React from 'react';
import clsx from 'clsx';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core';
import { DAY_SIZE, DAY_MARGIN } from './constants/dimensions';
import { withDefaultProps } from './_shared/withDefaultProps';
import { useStyles as useCalendarStyles } from './views/Calendar/Calendar';

export interface CalendarSkeletonProps extends React.HTMLProps<HTMLDivElement> {}

const muiComponentConfig = {
  name: 'MuiPickersCalendarSkeleton',
};

export const useStyles = makeStyles(
  {
    root: {
      alignSelf: 'start',
    },
    daySkeleton: {
      margin: `0 ${DAY_MARGIN}px`,
    },
    hidden: {
      visibility: 'hidden',
    },
  },
  muiComponentConfig
);

const monthMap = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0],
];

export const CalendarSkeleton: React.FC<CalendarSkeletonProps> = withDefaultProps(
  muiComponentConfig,
  ({ className, ...other }) => {
    const classes = useStyles();
    const calendarClasses = useCalendarStyles();

    return (
      <div className={clsx(classes.root, className)} {...other}>
        {monthMap.map((week, i) => (
          <div key={i} className={calendarClasses.week}>
            {week.map((day, i) => (
              <Skeleton
                key={i}
                variant="circle"
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
  }
);

export default CalendarSkeleton;
