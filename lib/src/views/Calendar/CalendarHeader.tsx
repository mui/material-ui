import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { CalendarProps } from './Calendar';
import { DatePickerView } from '../../DatePicker';
import { SlideDirection } from './SlideTransition';
import { Fade, IconButton } from '@material-ui/core';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ArrowLeftIcon } from '../../_shared/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../_shared/icons/ArrowRightIcon';
import { ArrowDropDownIcon } from '../../_shared/icons/ArrowDropDownIcon';

export interface CalendarWithHeaderProps
  extends Pick<CalendarProps, 'minDate' | 'maxDate' | 'disablePast' | 'disableFuture'> {
  view: DatePickerView;
  views: DatePickerView[];
  month: MaterialUiPickersDate;
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /**
   * Props to pass to left arrow button
   * @type {Partial<IconButtonProps>}
   */
  leftArrowButtonProps?: Partial<IconButtonProps>;
  /**
   * Props to pass to right arrow button
   * @type {Partial<IconButtonProps>}
   */
  rightArrowButtonProps?: Partial<IconButtonProps>;
  reduceAnimations: boolean;
  changeView: (view: DatePickerView) => void;
  onMonthChange: (date: MaterialUiPickersDate, slideDirection: SlideDirection) => void;
}

export const useStyles = makeStyles(
  theme => ({
    switchHeader: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      paddingLeft: 24,
      paddingRight: 12,
      // prevent jumping in safari
      maxHeight: 30,
      minHeight: 30,
    },
    yearSelectionSwitcher: {
      marginRight: 'auto',
    },
    iconButton: {
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
    },
    previousMonthButton: {
      marginRight: 24,
    },
    switchViewDropdown: {
      willChange: 'transform',
      transition: theme.transitions.create('transform'),
      transform: 'rotate(0deg)',
    },
    switchViewDropdownDown: {
      transform: 'rotate(180deg)',
    },
    monthTitleContainer: {
      flex: 1,
      display: 'flex',
      maxHeight: 30,
      overflow: 'hidden',
    },
    monthText: {
      marginRight: 4,
    },
  }),
  { name: 'MuiPickersCalendarHeader' }
);

export const CalendarHeader: React.SFC<CalendarWithHeaderProps> = ({
  view,
  views,
  month,
  leftArrowIcon,
  rightArrowIcon,
  leftArrowButtonProps,
  rightArrowButtonProps,
  changeView,
  onMonthChange,
  minDate,
  maxDate,
  reduceAnimations,
  disableFuture,
  disablePast,
}) => {
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles({ view });
  const isRtl = theme.direction === 'rtl';

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isPreviousMonthDisabled = React.useMemo(() => {
    const now = utils.date();
    const firstEnabledMonth = utils.startOfMonth(
      disablePast && utils.isAfter(now, utils.date(minDate)) ? now : utils.date(minDate)
    );

    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);

  const isNextMonthDisabled = React.useMemo(() => {
    const now = utils.date();
    const lastEnabledMonth = utils.startOfMonth(
      disableFuture && utils.isBefore(now, utils.date(maxDate)) ? now : utils.date(maxDate)
    );

    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils]);

  const toggleView = () => {
    if (views.length === 1) {
      return;
    }

    if (views.length === 2) {
      changeView(views.find(v => v !== view) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(view) !== 0 ? 0 : 1;
      changeView(views[nextIndexToOpen]);
    }
  };

  if (views.length === 1) {
    return null;
  }

  return (
    <>
      <div className={classes.switchHeader}>
        <div className={classes.monthTitleContainer}>
          <FadeTransitionGroup
            reduceAnimations={reduceAnimations}
            transKey={utils.getMonthText(month)}
          >
            <Typography
              data-mui-test="calendar-month-text"
              align="center"
              variant="subtitle1"
              className={classes.monthText}
              children={utils.getMonthText(month)}
            />
          </FadeTransitionGroup>
          <FadeTransitionGroup
            reduceAnimations={reduceAnimations}
            transKey={utils.getYearText(month)}
          >
            <Typography
              data-mui-test="calendar-year-text"
              align="center"
              variant="subtitle1"
              children={utils.getYearText(month)}
            />
          </FadeTransitionGroup>

          <IconButton
            data-mui-test="calendar-view-switcher"
            size="small"
            onClick={toggleView}
            className={classes.yearSelectionSwitcher}
          >
            <ArrowDropDownIcon
              className={clsx(classes.switchViewDropdown, {
                [classes.switchViewDropdownDown]: view === 'year',
              })}
            />
          </IconButton>
        </div>

        <Fade in={view === 'date'}>
          <div>
            <IconButton
              data-mui-test="previous-month"
              size="small"
              {...leftArrowButtonProps}
              disabled={isPreviousMonthDisabled}
              onClick={selectPreviousMonth}
              className={clsx(
                classes.iconButton,
                classes.previousMonthButton,
                leftArrowButtonProps?.className
              )}
            >
              {isRtl ? rightArrowIcon : leftArrowIcon}
            </IconButton>

            <IconButton
              size="small"
              {...rightArrowButtonProps}
              disabled={isNextMonthDisabled}
              onClick={selectNextMonth}
              className={clsx(classes.iconButton, rightArrowButtonProps?.className)}
            >
              {isRtl ? leftArrowIcon : rightArrowIcon}
            </IconButton>
          </div>
        </Fade>
      </div>
    </>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
};

CalendarHeader.defaultProps = {
  leftArrowIcon: <ArrowLeftIcon />,
  rightArrowIcon: <ArrowRightIcon />,
};

export default CalendarHeader;
