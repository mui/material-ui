import * as React from 'react';
import Calendar from '../DatePicker/components/Calendar';
import YearSelection from '../DatePicker/components/YearSelection';
import MonthSelection from '../DatePicker/components/MonthSelection';
import { MaterialUiPickersDate } from '..';
import { useViews } from '../_shared/hooks/useViews';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { datePickerDefaultProps } from '../constants/prop-types';
import { TimePickerView } from '../TimePicker/components/TimePickerView';

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
            onChange={handleChangeAndOpenNext('month')}
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
            onChange={handleChangeAndOpenNext('date')}
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
            onChange={handleChangeAndOpenNext('hours')}
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
          />
        )}

        {(openView === 'hours' || openView === 'minutes' || openView === 'seconds') && (
          <TimePickerView
            date={date}
            ampm={ampm}
            type={openView}
            minutesStep={minutesStep}
            onHourChange={handleChangeAndOpenNext('minutes')}
            onMinutesChange={handleChangeAndOpenNext('seconds')}
            onSecondsChange={handleChangeAndOpenNext(null)}
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
