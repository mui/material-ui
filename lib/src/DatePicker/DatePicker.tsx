import * as PropTypes from 'prop-types';
import * as React from 'react';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { withUtils, WithUtilsProps } from '../_shared/WithUtils';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import Calendar, { RenderDay } from './components/Calendar';
import YearSelection from './components/YearSelection';

export interface BaseDatePickerProps {
  /** Min selectable date */
  minDate?: DateType;
  /** Max selectable date */
  maxDate?: DateType;
  /** Disable past dates */
  disablePast?: boolean;
  /** Disable future dates */
  disableFuture?: boolean;
  /** To animate scrolling to current year (with scrollIntoView) */
  animateYearScrolling?: boolean;
  /** Open datepicker from year selection */
  openToYearSelection?: boolean;
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Custom renderer for day */
  renderDay?: RenderDay;
  /** Enables keyboard listener for moving between days in calendar */
  allowKeyboardControl?: boolean;
  /** Disable specific date */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
  initialFocusedDate?: DateType;
}

export interface DatePickerProps extends BaseDatePickerProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

export class DatePicker extends React.PureComponent<DatePickerProps & WithUtilsProps> {
  public static propTypes = {
    openToYearSelection: PropTypes.bool,
  };

  public static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    openToYearSelection: false,
  };

  public state = {
    showYearSelection: Boolean(this.props.openToYearSelection),
  };

  get date() {
    return this.props.date;
  }

  get minDate() {
    return this.props.utils.date(this.props.minDate);
  }

  get maxDate() {
    return this.props.utils.date(this.props.maxDate);
  }

  public handleYearSelect = (date: MaterialUiPickersDate) => {
    this.props.onChange(date, false);
    this.openCalendar();
  };

  public openYearSelection = () => {
    this.setState({ showYearSelection: true });
  };

  public openCalendar = () => {
    this.setState({ showYearSelection: false });
  };

  public render() {
    const { showYearSelection } = this.state;
    const {
      disablePast,
      disableFuture,
      onChange,
      animateYearScrolling,
      leftArrowIcon,
      rightArrowIcon,
      renderDay,
      utils,
      shouldDisableDate,
      allowKeyboardControl,
    } = this.props;

    return (
      <>
        <PickerToolbar>
          <ToolbarButton
            variant="subtitle1"
            onClick={this.openYearSelection}
            selected={showYearSelection}
            label={utils.getYearText(this.date)}
          />

          <ToolbarButton
            variant="h4"
            onClick={this.openCalendar}
            selected={!showYearSelection}
            label={utils.getDatePickerHeaderText(this.date)}
          />
        </PickerToolbar>

        {this.props.children}

        {showYearSelection ? (
          <YearSelection
            date={this.date}
            onChange={this.handleYearSelect}
            minDate={this.minDate}
            maxDate={this.maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
            animateYearScrolling={animateYearScrolling}
          />
        ) : (
          <Calendar
            date={this.date}
            onChange={onChange}
            disablePast={disablePast}
            disableFuture={disableFuture}
            minDate={this.minDate}
            maxDate={this.maxDate}
            leftArrowIcon={leftArrowIcon}
            rightArrowIcon={rightArrowIcon}
            renderDay={renderDay}
            shouldDisableDate={shouldDisableDate}
            allowKeyboardControl={allowKeyboardControl}
          />
        )}
      </>
    );
  }
}

export default withUtils()(DatePicker);
