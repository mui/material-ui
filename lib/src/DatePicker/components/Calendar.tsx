import * as React from 'react';
import * as PropTypes from 'prop-types';
import Day from './Day';
import DayWrapper from './DayWrapper';
import CalendarHeader from './CalendarHeader';
import EventListener from 'react-event-listener';
import SlideTransition, { SlideDirection } from './SlideTransition';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core';
import { DateType } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { findClosestEnabledDate } from '../../_helpers/date-utils';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';

export type RenderDay = (
  day: MaterialUiPickersDate,
  selectedDate: MaterialUiPickersDate,
  dayInCurrentMonth: boolean,
  dayComponent: React.ReactElement<IconButtonProps>
) => JSX.Element;

export interface OutterCalendarProps {
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Custom renderer for day */
  renderDay?: RenderDay;
  /** Show only calendar, without toolbar */
  onlyCalendar?: boolean;
  /** Enables keyboard listener for moving between days in calendar */
  allowKeyboardControl?: boolean;
  /** Props to pass to left arrow button */
  leftArrowButtonProps?: Partial<IconButtonProps>;
  /** Props to pass to right arrow button */
  rightArrowButtonProps?: Partial<IconButtonProps>;
  /** Disable specific date */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
  /** Callback firing on month change */
  onMonthChange?: (date: MaterialUiPickersDate) => void;
}

export interface CalendarProps
  extends OutterCalendarProps,
    WithUtilsProps,
    WithStyles<typeof styles, true> {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  minDate: DateType;
  maxDate: DateType;
  disablePast?: boolean;
  disableFuture?: boolean;
}

export interface CalendarState {
  slideDirection: SlideDirection;
  currentMonth: MaterialUiPickersDate;
  lastDate?: MaterialUiPickersDate;
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
  public static propTypes: any = {
    renderDay: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    allowKeyboardControl: PropTypes.bool,
  };

  public static defaultProps = {
    minDate: new Date('1900-01-01'),
    maxDate: new Date('2100-01-01'),
    disablePast: false,
    disableFuture: false,
    allowKeyboardControl: true,
  };

  public static getDerivedStateFromProps(nextProps: CalendarProps, state: CalendarState) {
    const { utils, date: nextDate } = nextProps;

    if (!utils.isEqual(nextDate, state.lastDate)) {
      const nextMonth = utils.getMonth(nextDate);
      const lastMonth = utils.getMonth(state.lastDate || nextDate);

      return {
        lastDate: nextDate,
        currentMonth: nextProps.utils.startOfMonth(nextDate),
        // prettier-ignore
        slideDirection: nextMonth === lastMonth
          ? state.slideDirection
          : nextMonth > lastMonth
            ? 'left'
            : 'right'
      };
    }

    return null;
  }

  public state: CalendarState = {
    slideDirection: 'left',
    currentMonth: this.props.utils.startOfMonth(this.props.date),
  };

  public componentDidMount() {
    const { date, minDate, maxDate, utils, disablePast, disableFuture } = this.props;

    if (this.shouldDisableDate(date)) {
      const closestEnabledDate = findClosestEnabledDate({
        date,
        utils,
        minDate,
        maxDate,
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: this.shouldDisableDate,
      });

      this.onDateSelect(closestEnabledDate || minDate, false);
    }
  }

  public onDateSelect = (day: MaterialUiPickersDate, isFinish = true) => {
    const { date, utils } = this.props;

    this.props.onChange(utils.mergeDateAndTime(day, date), isFinish);
  };

  public handleChangeMonth = (newMonth: MaterialUiPickersDate, slideDirection: SlideDirection) => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(newMonth);
    }

    this.setState({ currentMonth: newMonth, slideDirection });
  };

  public validateMinMaxDate = (day: MaterialUiPickersDate) => {
    const { minDate, maxDate, utils, disableFuture, disablePast } = this.props;
    const now = utils.date();

    return Boolean(
      (disableFuture && utils.isAfterDay(day, now)) ||
        (disablePast && utils.isBeforeDay(day, now)) ||
        (minDate && utils.isBeforeDay(day, utils.date(minDate))) ||
        (maxDate && utils.isAfterDay(day, utils.date(maxDate)))
    );
  };

  public shouldDisablePrevMonth = () => {
    const { utils, disablePast, minDate } = this.props;

    const now = utils.date();
    const firstEnabledMonth = utils.startOfMonth(
      disablePast && utils.isAfter(now, minDate) ? now : utils.date(minDate)
    );

    return !utils.isBefore(firstEnabledMonth, this.state.currentMonth);
  };

  public shouldDisableNextMonth = () => {
    const { utils, disableFuture, maxDate } = this.props;

    const now = utils.date();
    const lastEnabledMonth = utils.startOfMonth(
      disableFuture && utils.isBefore(now, maxDate) ? now : utils.date(maxDate)
    );

    return !utils.isAfter(lastEnabledMonth, this.state.currentMonth);
  };

  public shouldDisableDate = (day: MaterialUiPickersDate) => {
    const { shouldDisableDate } = this.props;

    return this.validateMinMaxDate(day) || Boolean(shouldDisableDate && shouldDisableDate(day));
  };

  public moveToDay = (day: MaterialUiPickersDate) => {
    if (day && !this.shouldDisableDate(day)) {
      this.onDateSelect(day, false);
    }
  };

  public handleKeyDown = (event: KeyboardEvent) => {
    const { theme, date, utils } = this.props;

    switch (event.key) {
      case 'ArrowUp':
        this.moveToDay(utils.addDays(date, -7));
        break;
      case 'ArrowDown':
        this.moveToDay(utils.addDays(date, 7));
        break;
      case 'ArrowLeft':
        theme.direction === 'ltr'
          ? this.moveToDay(utils.addDays(date, -1))
          : this.moveToDay(utils.addDays(date, 1));
        break;
      case 'ArrowRight':
        theme.direction === 'ltr'
          ? this.moveToDay(utils.addDays(date, 1))
          : this.moveToDay(utils.addDays(date, -1));
        break;
      default:
        // if key is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects (e.g. page scroll)
    event.preventDefault();
  };

  public renderWeeks = () => {
    const { utils, classes } = this.props;
    const weeks = utils.getWeekArray(this.state.currentMonth);

    return weeks.map(week => (
      <div key={`week-${week[0].toString()}`} className={classes.week}>
        {this.renderDays(week)}
      </div>
    ));
  };

  public renderDays = (week: MaterialUiPickersDate[]) => {
    const { date, renderDay, utils } = this.props;

    const now = utils.date();
    const selectedDate = utils.startOfDay(date);
    const currentMonthNumber = utils.getMonth(this.state.currentMonth);

    return week.map(day => {
      const disabled = this.shouldDisableDate(day);
      const isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

      let dayComponent = (
        <Day
          disabled={disabled}
          current={utils.isSameDay(day, now)}
          hidden={!isDayInCurrentMonth}
          selected={utils.isSameDay(selectedDate, day)}
        >
          {utils.getDayText(day)}
        </Day>
      );

      if (renderDay) {
        dayComponent = renderDay(day, selectedDate, isDayInCurrentMonth, dayComponent);
      }

      return (
        <DayWrapper
          value={day}
          key={day.toString()}
          disabled={disabled}
          dayInCurrentMonth={isDayInCurrentMonth}
          onSelect={this.onDateSelect}
        >
          {dayComponent}
        </DayWrapper>
      );
    });
  };

  public render() {
    const { currentMonth, slideDirection } = this.state;
    const {
      classes,
      allowKeyboardControl,
      leftArrowButtonProps,
      leftArrowIcon,
      rightArrowButtonProps,
      rightArrowIcon,
    } = this.props;

    return (
      <React.Fragment>
        {allowKeyboardControl && <EventListener target="window" onKeyDown={this.handleKeyDown} />}

        <CalendarHeader
          currentMonth={currentMonth}
          slideDirection={slideDirection}
          onMonthChange={this.handleChangeMonth}
          leftArrowIcon={leftArrowIcon}
          leftArrowButtonProps={leftArrowButtonProps}
          rightArrowIcon={rightArrowIcon}
          rightArrowButtonProps={rightArrowButtonProps}
          disablePrevMonth={this.shouldDisablePrevMonth()}
          disableNextMonth={this.shouldDisableNextMonth()}
        />

        <SlideTransition
          slideDirection={slideDirection}
          transKey={currentMonth.toString()}
          className={classes.transitionContainer}
        >
          <div>{this.renderWeeks()}</div>
        </SlideTransition>
      </React.Fragment>
    );
  }
}

export const styles = (theme: Theme) => ({
  transitionContainer: {
    minHeight: 36 * 6,
    marginTop: theme.spacing(1.5),
  },
  week: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default withStyles(styles, {
  name: 'MuiPickersCalendar',
  withTheme: true,
})(withUtils()(Calendar));
