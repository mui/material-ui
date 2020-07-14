import * as React from 'react';
import clsx from 'clsx';
import { DAY_MARGIN } from '../constants/dimensions';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Day, DayProps, areDayPropsEqual } from '../views/Calendar/Day';

export interface DateRangeDayProps extends DayProps {
  isHighlighting: boolean;
  isEndOfHighlighting: boolean;
  isStartOfHighlighting: boolean;
  isPreviewing: boolean;
  isEndOfPreviewing: boolean;
  isStartOfPreviewing: boolean;
}

const endBorderStyle = {
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%',
};

const startBorderStyle = {
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%',
};

const useStyles = makeStyles(
  theme => ({
    root: {
      '&:first-child $rangeIntervalDayPreview': {
        ...startBorderStyle,
        borderLeftColor: theme.palette.divider,
      },
      '&:last-child $rangeIntervalDayPreview': {
        ...endBorderStyle,
        borderRightColor: theme.palette.divider,
      },
    },
    rangeIntervalDayHighlight: {
      borderRadius: 0,
      color: theme.palette.primary.contrastText,
      backgroundColor: fade(theme.palette.primary.light, 0.6),
      '&:first-child': startBorderStyle,
      '&:last-child': endBorderStyle,
    },
    rangeIntervalDayHighlightStart: {
      ...startBorderStyle,
      paddingLeft: 0,
      marginLeft: DAY_MARGIN / 2,
    },
    rangeIntervalDayHighlightEnd: {
      ...endBorderStyle,
      paddingRight: 0,
      marginRight: DAY_MARGIN / 2,
    },
    day: {
      // Required to overlap preview border
      transform: 'scale(1.1)',
      '& > *': {
        transform: 'scale(0.9)',
      },
    },
    dayOutsideRangeInterval: {
      '&:hover': {
        border: `1px solid ${theme.palette.grey[500]}`,
      },
    },
    dayInsideRangeInterval: {
      color: theme.palette.getContrastText(fade(theme.palette.primary.light, 0.6)),
    },
    notSelectedDate: {
      backgroundColor: 'transparent',
    },
    rangeIntervalPreview: {
      // replace default day component margin with transparent border to avoid jumping on preview
      border: '2px solid transparent',
    },
    rangeIntervalDayPreview: {
      borderRadius: 0,
      border: `2px dashed ${theme.palette.divider}`,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',

      '&$rangeIntervalDayPreviewStart': {
        borderLeftColor: theme.palette.divider,
        ...startBorderStyle,
      },
      '&$rangeIntervalDayPreviewEnd': {
        borderRightColor: theme.palette.divider,
        ...endBorderStyle,
      },
    },
    rangeIntervalDayPreviewStart: {},
    rangeIntervalDayPreviewEnd: {},
  }),
  { name: 'MuiPickersDateRangeDay' }
);

export const PureDateRangeDay = ({
  className,
  day,
  inCurrentMonth,
  isEndOfHighlighting,
  isEndOfPreviewing,
  isHighlighting,
  isPreviewing,
  isStartOfHighlighting,
  isStartOfPreviewing,
  selected,
  ...other
}: DateRangeDayProps) => {
  const utils = useUtils();
  const classes = useStyles();

  const isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  const isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));

  const shouldRenderHighlight = isHighlighting && inCurrentMonth;
  const shouldRenderPreview = isPreviewing && inCurrentMonth;

  return (
    <div
      data-mui-test={shouldRenderHighlight ? 'DateRangeHighlight' : undefined}
      className={clsx(classes.root, {
        [classes.rangeIntervalDayHighlight]: shouldRenderHighlight,
        [classes.rangeIntervalDayHighlightEnd]: isEndOfHighlighting || isEndOfMonth,
        [classes.rangeIntervalDayHighlightStart]: isStartOfHighlighting || isStartOfMonth,
      })}
    >
      <div
        data-mui-test={shouldRenderPreview ? 'DateRangePreview' : undefined}
        className={clsx(classes.rangeIntervalPreview, {
          [classes.rangeIntervalDayPreview]: shouldRenderPreview,
          [classes.rangeIntervalDayPreviewEnd]: isEndOfPreviewing || isEndOfMonth,
          [classes.rangeIntervalDayPreviewStart]: isStartOfPreviewing || isStartOfMonth,
        })}
      >
        <Day
          allowKeyboardControl={false}
          disableMargin
          {...other}
          day={day}
          selected={selected}
          inCurrentMonth={inCurrentMonth}
          data-mui-test="DateRangeDay"
          className={clsx(
            classes.day,
            {
              [classes.notSelectedDate]: !selected,
              [classes.dayOutsideRangeInterval]: !isHighlighting,
              [classes.dayInsideRangeInterval]: !selected && isHighlighting,
            },
            className
          )}
        />
      </div>
    </div>
  );
};

PureDateRangeDay.displayName = 'DateRangeDay';

export const DateRangeDay = React.memo(PureDateRangeDay, (prevProps, nextProps) => {
  return (
    prevProps.isHighlighting === nextProps.isHighlighting &&
    prevProps.isEndOfHighlighting === nextProps.isEndOfHighlighting &&
    prevProps.isStartOfHighlighting === nextProps.isStartOfHighlighting &&
    prevProps.isPreviewing === nextProps.isPreviewing &&
    prevProps.isEndOfPreviewing === nextProps.isEndOfPreviewing &&
    prevProps.isStartOfPreviewing === nextProps.isStartOfPreviewing &&
    areDayPropsEqual(prevProps, nextProps)
  );
});
