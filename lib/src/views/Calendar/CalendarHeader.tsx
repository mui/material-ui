import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { CalendarProps } from './Calendar';
import { DatePickerView } from '../../DatePicker';
import { SlideDirection } from './SlideTransition';
import { Fade, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { ArrowDropDownIcon } from '../../_shared/icons/ArrowDropDownIcon';
import { ArrowSwitcher, ExportedArrowSwitcherProps } from '../../_shared/ArrowSwitcher';

export interface CalendarHeaderProps
  extends ExportedArrowSwitcherProps,
    Pick<CalendarProps, 'minDate' | 'maxDate' | 'disablePast' | 'disableFuture'> {
  view: DatePickerView;
  views: DatePickerView[];
  month: MaterialUiPickersDate;

  /** Get aria-label text for switching between views button */
  getViewSwitchingButtonText?: (currentView: DatePickerView) => string;
  reduceAnimations: boolean;
  changeView: (view: DatePickerView) => void;
  minDate: MaterialUiPickersDate;
  maxDate: MaterialUiPickersDate;
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

function getSwitchingViewAriaText(view: DatePickerView) {
  return view === 'year'
    ? 'year view is open, switch to calendar view'
    : 'calendar view is open, switch to year view';
}

export const CalendarHeader: React.SFC<CalendarHeaderProps> = ({
  view,
  views,
  month,
  changeView,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  onMonthChange,
  reduceAnimations,
  leftArrowButtonProps,
  rightArrowButtonProps,
  leftArrowIcon,
  rightArrowIcon,
  leftArrowButtonText = 'previous month',
  rightArrowButtonText = 'next month',
  getViewSwitchingButtonText = getSwitchingViewAriaText,
}) => {
  const utils = useUtils();
  const classes = useStyles();

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isPreviousMonthDisabled = React.useMemo(() => {
    const now = utils.date();
    const firstEnabledMonth = utils.startOfMonth(
      disablePast && utils.isAfter(now, minDate) ? now : minDate
    );

    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);

  const isNextMonthDisabled = React.useMemo(() => {
    const now = utils.date();
    const lastEnabledMonth = utils.startOfMonth(
      disableFuture && utils.isBefore(now, maxDate) ? now : maxDate
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
            transKey={utils.format(month, 'month')}
          >
            <Typography
              aria-live="polite"
              data-mui-test="calendar-month-text"
              align="center"
              variant="subtitle1"
              className={classes.monthText}
              children={utils.format(month, 'month')}
            />
          </FadeTransitionGroup>
          <FadeTransitionGroup
            reduceAnimations={reduceAnimations}
            transKey={utils.format(month, 'year')}
          >
            <Typography
              aria-live="polite"
              data-mui-test="calendar-year-text"
              align="center"
              variant="subtitle1"
              children={utils.format(month, 'year')}
            />
          </FadeTransitionGroup>

          <IconButton
            size="small"
            data-mui-test="calendar-view-switcher"
            onClick={toggleView}
            className={classes.yearSelectionSwitcher}
            aria-label={getViewSwitchingButtonText(view)}
          >
            <ArrowDropDownIcon
              className={clsx(classes.switchViewDropdown, {
                [classes.switchViewDropdownDown]: view === 'year',
              })}
            />
          </IconButton>
        </div>

        <Fade in={view === 'date'}>
          <ArrowSwitcher
            leftArrowButtonProps={leftArrowButtonProps}
            rightArrowButtonProps={rightArrowButtonProps}
            leftArrowButtonText={leftArrowButtonText}
            rightArrowButtonText={rightArrowButtonText}
            leftArrowIcon={leftArrowIcon}
            rightArrowIcon={rightArrowIcon}
            onLeftClick={selectPreviousMonth}
            onRightClick={selectNextMonth}
            isLeftDisabled={isPreviousMonthDisabled}
            isRightDisabled={isNextMonthDisabled}
          />
        </Fade>
      </div>
    </>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  leftArrowButtonText: PropTypes.string,
  rightArrowButtonText: PropTypes.string,
};

export default CalendarHeader;
