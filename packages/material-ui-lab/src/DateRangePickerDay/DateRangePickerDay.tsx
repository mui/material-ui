import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, WithStyles, alpha, createStyles, Theme } from '@material-ui/core/styles';
import { DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import PickersDay, { PickersDayProps, areDayPropsEqual } from '../PickersDay/PickersDay';

export interface DateRangePickerDayProps<TDate> extends PickersDayProps<TDate> {
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

const styles = (theme: Theme) =>
  createStyles({
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
      backgroundColor: alpha(theme.palette.primary.light, 0.6),
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
      color: theme.palette.getContrastText(alpha(theme.palette.primary.light, 0.6)),
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
  });

/**
 * @ignore - do not document.
 */
const DateRangePickerDay = React.forwardRef(function DateRangePickerDay<TDate>(
  props: DateRangePickerDayProps<TDate> & WithStyles<typeof styles>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const {
    classes,
    className,
    day,
    outsideCurrentMonth,
    isEndOfHighlighting,
    isEndOfPreviewing,
    isHighlighting,
    isPreviewing,
    isStartOfHighlighting,
    isStartOfPreviewing,
    selected,
    ...other
  } = props;
  const utils = useUtils<TDate>();

  const isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  const isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));

  const shouldRenderHighlight = isHighlighting && !outsideCurrentMonth;
  const shouldRenderPreview = isPreviewing && !outsideCurrentMonth;

  return (
    <div
      data-mui-test={shouldRenderHighlight ? 'DateRangeHighlight' : undefined}
      className={clsx(classes.root, className, {
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
        <PickersDay<TDate>
          {...other}
          ref={ref}
          disableMargin
          allowSameDateSelection
          allowKeyboardControl={false}
          day={day}
          selected={selected}
          outsideCurrentMonth={outsideCurrentMonth}
          data-mui-test="DateRangeDay"
          className={clsx(classes.day, {
            [classes.notSelectedDate]: !selected,
            [classes.dayOutsideRangeInterval]: !isHighlighting,
            [classes.dayInsideRangeInterval]: !selected && isHighlighting,
          })}
        />
      </div>
    </div>
  );
});

(DateRangePickerDay as any).propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
  /**
   * The date to show.
   */
  day: PropTypes.any.isRequired,
  /**
   * @ignore
   */
  isEndOfHighlighting: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  isEndOfPreviewing: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  isHighlighting: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  isPreviewing: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  isStartOfHighlighting: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  isStartOfPreviewing: PropTypes.bool.isRequired,
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,
  /**
   * If `true`, renders as selected.
   */
  selected: PropTypes.bool,
};

/**
 *
 * API:
 *
 * - [DateRangePickerDay API](https://material-ui.com/api/date-range-picker-day/)
 */
export default withStyles(styles, { name: 'MuiDateRangePickerDay' })(
  React.memo(DateRangePickerDay, (prevProps, nextProps) => {
    return (
      prevProps.isHighlighting === nextProps.isHighlighting &&
      prevProps.isEndOfHighlighting === nextProps.isEndOfHighlighting &&
      prevProps.isStartOfHighlighting === nextProps.isStartOfHighlighting &&
      prevProps.isPreviewing === nextProps.isPreviewing &&
      prevProps.isEndOfPreviewing === nextProps.isEndOfPreviewing &&
      prevProps.isStartOfPreviewing === nextProps.isStartOfPreviewing &&
      areDayPropsEqual(prevProps, nextProps)
    );
  }),
) as <TDate>(
  props: DateRangePickerDayProps<TDate> & React.RefAttributes<HTMLButtonElement>,
) => JSX.Element;
