import * as React from 'react';
import Calendar from '../views/Calendar/Calendar';
import { useUtils } from '../_shared/hooks/useUtils';
import { useViews } from '../_shared/hooks/useViews';
import { makeStyles } from '@material-ui/core/styles';
import { YearSelection } from '../views/Year/YearView';
import { MaterialUiPickersDate } from '../typings/date';
import { MonthSelection } from '../views/Month/MonthView';
import { TimePickerView } from '../views/Clock/ClockView';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { datePickerDefaultProps } from '../constants/prop-types';

const viewsMap = {
  year: YearSelection,
  month: MonthSelection,
  date: Calendar,
  hours: TimePickerView,
  minutes: TimePickerView,
  seconds: TimePickerView,
};

export type PickerView = keyof typeof viewsMap;

export type ToolbarComponentProps = BaseDatePickerProps &
  BaseTimePickerProps & {
    views: PickerView[];
    openView: PickerView;
    date: MaterialUiPickersDate;
    setOpenView: (view: PickerView) => void;
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    // TODO move out, cause it is DateTimePickerOnly
    hideTabs?: boolean;
    dateRangeIcon?: React.ReactNode;
    timeIcon?: React.ReactNode;
  };

export interface PickerViewProps extends BaseDatePickerProps, BaseTimePickerProps {
  views: PickerView[];
  openTo: PickerView;
  disableToolbar?: boolean;
  ToolbarComponent: React.ComponentType<ToolbarComponentProps>;
  // TODO move out, cause it is DateTimePickerOnly
  hideTabs?: boolean;
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
}

interface PickerProps extends PickerViewProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

const useStyles = makeStyles(
  {
    pickerView: {
      minHeight: 305,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  { name: 'MuiPickersBasePicker' }
);

export const Picker: React.FunctionComponent<PickerProps> = props => {
  const {
    date,
    ampm,
    views,
    disableToolbar,
    disablePast,
    disableFuture,
    hideTabs,
    onChange,
    openTo,
    minutesStep,
    dateRangeIcon,
    timeIcon,
    minDate: unparsedMinDate,
    maxDate: unparsedMaxDate,
    animateYearScrolling,
    leftArrowIcon,
    rightArrowIcon,
    renderDay,
    shouldDisableDate,
    allowKeyboardControl,
    onMonthChange,
    onYearChange,
    leftArrowButtonProps,
    rightArrowButtonProps,
    ToolbarComponent,
    loadingIndicator,
  } = props;

  const utils = useUtils();
  const classes = useStyles();
  const { openView, setOpenView, handleChangeAndOpenNext } = useViews(views, openTo, onChange);

  const minDate = React.useMemo(() => utils.date(unparsedMinDate)!, [unparsedMinDate, utils]);
  const maxDate = React.useMemo(() => utils.date(unparsedMaxDate)!, [unparsedMaxDate, utils]);

  return (
    <>
      {!disableToolbar && (
        <ToolbarComponent
          date={date}
          onChange={onChange}
          setOpenView={setOpenView}
          openView={openView}
          hideTabs={hideTabs}
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          {...props}
        />
      )}

      <div className={classes.pickerView}>
        {openView === 'year' && (
          <YearSelection
            date={date}
            onChange={handleChangeAndOpenNext}
            minDate={minDate}
            maxDate={maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onYearChange={onYearChange}
            animateYearScrolling={animateYearScrolling}
          />
        )}

        {openView === 'month' && (
          <MonthSelection
            date={date}
            onChange={handleChangeAndOpenNext}
            minDate={minDate}
            maxDate={maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onMonthChange={onMonthChange}
          />
        )}

        {openView === 'date' && (
          <Calendar
            date={date}
            onChange={handleChangeAndOpenNext}
            onMonthChange={onMonthChange}
            disablePast={disablePast}
            disableFuture={disableFuture}
            minDate={minDate}
            maxDate={maxDate}
            leftArrowIcon={leftArrowIcon}
            leftArrowButtonProps={leftArrowButtonProps}
            rightArrowIcon={rightArrowIcon}
            rightArrowButtonProps={rightArrowButtonProps}
            renderDay={renderDay}
            shouldDisableDate={shouldDisableDate}
            allowKeyboardControl={allowKeyboardControl}
            loadingIndicator={loadingIndicator}
          />
        )}

        {(openView === 'hours' || openView === 'minutes' || openView === 'seconds') && (
          <TimePickerView
            date={date}
            ampm={ampm}
            type={openView}
            minutesStep={minutesStep}
            onHourChange={handleChangeAndOpenNext}
            onMinutesChange={handleChangeAndOpenNext}
            onSecondsChange={handleChangeAndOpenNext}
          />
        )}
      </div>
    </>
  );
};

Picker.defaultProps = {
  ...datePickerDefaultProps,
  views: Object.keys(viewsMap),
} as any;
