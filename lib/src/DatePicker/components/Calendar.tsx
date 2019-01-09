import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import EventListener from 'react-event-listener';

import { Theme } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { findClosestEnabledDate } from '../../_helpers/date-utils';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';
import { DateType, DomainPropTypes } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import CalendarHeader from './CalendarHeader';
import Day from './Day';
import DayWrapper from './DayWrapper';
import SlideTransition, { SlideDirection } from './SlideTransition';

export type RenderDay = (
  day: MaterialUiPickersDate,
  selectedDate: MaterialUiPickersDate,
  dayInCurrentMonth: boolean,
  dayComponent: React.ReactElement<IconButtonProps>
) => JSX.Element;

export interface CalendarProps extends WithUtilsProps, WithStyles<typeof styles, true> {
  date: MaterialUiPickersDate;
  minDate: DateType;
  maxDate: DateType;
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
  leftArrowIcon?: React.ReactNode;
  rightArrowIcon?: React.ReactNode;
  renderDay?: RenderDay;
  allowKeyboardControl?: boolean;
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

export interface CalendarState {
  slideDirection: SlideDirection;
  currentMonth: MaterialUiPickersDate;
  lastDate?: MaterialUiPickersDate;
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
  public static propTypes: any = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    renderDay: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    utils: PropTypes.object.isRequired,
    allowKeyboardControl: PropTypes.bool,
    innerRef: PropTypes.any,
  };

  public static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disablePast: false,
    disableFuture: false,
    allowKeyboardControl: true,
  };

  public static getDerivedStateFromProps(nextProps: CalendarProps, state: CalendarState) {
    if (!nextProps.utils.isEqual(nextProps.date, state.lastDate)) {
      return {
        lastDate: nextProps.date,
        currentMonth: nextProps.utils.getStartOfMonth(nextProps.date),
      };
    }

    return null;
  }

  public state: CalendarState = {
    slideDirection: 'left',
    currentMonth: this.props.utils.getStartOfMonth(this.props.date),
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
    this.setState({ currentMonth: newMonth, slideDirection });
  };

  public validateMinMaxDate = (day: MaterialUiPickersDate) => {
    const { minDate, maxDate, utils } = this.props;

    return (
      (minDate && utils.isBeforeDay(day, utils.date(minDate))) ||
      (maxDate && utils.isAfterDay(day, utils.date(maxDate)))
    );
  };

  public shouldDisablePrevMonth = () => {
    const { utils, disablePast, minDate } = this.props;
    const now = utils.date();
    return !utils.isBefore(
      utils.getStartOfMonth(disablePast && utils.isAfter(now, minDate) ? now : utils.date(minDate)),
      this.state.currentMonth
    );
  };

  public shouldDisableNextMonth = () => {
    const { utils, disableFuture, maxDate } = this.props;
    const now = utils.date();
    return !utils.isAfter(
      utils.getStartOfMonth(
        disableFuture && utils.isBefore(now, maxDate) ? now : utils.date(maxDate)
      ),
      this.state.currentMonth
    );
  };

  public shouldDisableDate = (day: MaterialUiPickersDate) => {
    const { disablePast, disableFuture, shouldDisableDate, utils } = this.props;

    return Boolean(
      (disableFuture && utils.isAfterDay(day, utils.date())) ||
        (disablePast && utils.isBeforeDay(day, utils.date())) ||
        this.validateMinMaxDate(day) ||
        (shouldDisableDate && shouldDisableDate(day))
    );
  };

  public moveToDay = (day: MaterialUiPickersDate) => {
    if (day && !this.shouldDisableDate(day)) {
      this.onDateSelect(day, false);
    }
  };

  public handleKeyDown = (event: KeyboardEvent) => {
    const { theme, date, utils } = this.props;

    switch (keycode(event)) {
      case 'up':
        this.moveToDay(utils.addDays(date, -7));
        break;
      case 'down':
        this.moveToDay(utils.addDays(date, 7));
        break;
      case 'left':
        theme.direction === 'ltr'
          ? this.moveToDay(utils.addDays(date, -1))
          : this.moveToDay(utils.addDays(date, 1));
        break;
      case 'right':
        theme.direction === 'ltr'
          ? this.moveToDay(utils.addDays(date, 1))
          : this.moveToDay(utils.addDays(date, -1));
        break;
      default:
        // if keycode is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects (e.g. page scroll)
    event.preventDefault();
  };

  public renderWeeks = () => {
    const { utils } = this.props;
    const { currentMonth } = this.state;
    const weeks = utils.getWeekArray(currentMonth);

    return weeks.map(week => (
      <div key={`week-${week[0].toString()}`} className={this.props.classes.week}>
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
      const dayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

      let dayComponent = (
        <Day
          disabled={disabled}
          current={utils.isSameDay(day, now)}
          hidden={!dayInCurrentMonth}
          selected={utils.isSameDay(selectedDate, day)}
        >
          {utils.getDayText(day)}
        </Day>
      );

      if (renderDay) {
        dayComponent = renderDay(day, selectedDate, dayInCurrentMonth, dayComponent);
      }

      return (
        <DayWrapper
          value={day}
          key={day.toString()}
          disabled={disabled}
          dayInCurrentMonth={dayInCurrentMonth}
          onSelect={this.onDateSelect}
        >
          {dayComponent}
        </DayWrapper>
      );
    });
  };

  public render() {
    const { currentMonth, slideDirection } = this.state;
    const { classes, allowKeyboardControl } = this.props;

    return (
      <React.Fragment>
        {allowKeyboardControl && <EventListener target="window" onKeyDown={this.handleKeyDown} />}

        <CalendarHeader
          slideDirection={slideDirection}
          currentMonth={currentMonth}
          onMonthChange={this.handleChangeMonth}
          leftArrowIcon={this.props.leftArrowIcon}
          rightArrowIcon={this.props.rightArrowIcon}
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
    marginTop: theme.spacing.unit * 1.5,
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
