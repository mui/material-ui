import * as React from 'react';
import * as PropTypes from 'prop-types';

import Calendar, { RenderDay } from './components/Calendar';
import YearSelection from './components/YearSelection';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import DomainPropTypes, { DateType } from '../constants/prop-types';
import withUtils, { WithUtilsProps } from '../_shared/WithUtils';
import { MaterialUiPickersDate } from '../typings/date';

export interface BaseDatePickerProps {
  minDate?: DateType;
  maxDate?: DateType;
  initialFocusedDate?: DateType;
  disablePast?: boolean;
  disableFuture?: boolean;
  animateYearScrolling?: boolean;
  openToYearSelection?: boolean;
  leftArrowIcon?: React.ReactNode;
  rightArrowIcon?: React.ReactNode;
  renderDay?: RenderDay;
  allowKeyboardControl?: boolean;
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

export interface DatePickerProps extends BaseDatePickerProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

export class DatePicker extends React.PureComponent<DatePickerProps & WithUtilsProps> {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    openToYearSelection: PropTypes.bool,
    children: PropTypes.node,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    utils: PropTypes.object.isRequired,
    shouldDisableDate: PropTypes.func,
    allowKeyboardControl: PropTypes.bool,
    initialFocusedDate: DomainPropTypes.date
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disablePast: false,
    disableFuture: false,
    allowKeyboardControl: false,
    animateYearScrolling: undefined,
    openToYearSelection: false,
    children: null,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    shouldDisableDate: undefined,
  }

  state = {
    showYearSelection: Boolean(this.props.openToYearSelection),
  }

  get date() {
    return this.props.utils.startOfDay(this.props.date);
  }

  get minDate() {
    return this.props.utils.date(this.props.minDate);
  }

  get maxDate() {
    return this.props.utils.date(this.props.maxDate);
  }

  handleYearSelect = (date: MaterialUiPickersDate) => {
    this.props.onChange(date, false);
    this.openCalendar();
  }

  openYearSelection = () => {
    this.setState({ showYearSelection: true });
  }

  openCalendar = () => {
    this.setState({ showYearSelection: false });
  }

  render() {
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
            variant="subheading"
            onClick={this.openYearSelection}
            selected={showYearSelection}
            label={utils.getYearText(this.date)}
          />

          <ToolbarButton
            variant="display1"
            onClick={this.openCalendar}
            selected={!showYearSelection}
            label={utils.getDatePickerHeaderText(this.date)}
          />
        </PickerToolbar>

        { this.props.children }

        {
          showYearSelection
            ? (
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
            )
        }
      </>
    );
  }
}

export default withUtils()(DatePicker as React.ComponentType<DatePickerProps & WithUtilsProps>);
