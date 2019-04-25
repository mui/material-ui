import * as React from 'react';
import * as PropTypes from 'prop-types';
import View from './components/DateTimePickerView';
import Calendar from '../DatePicker/components/Calendar';
import DateTimePickerTabs from './components/DateTimePickerTabs';
import YearSelection from '../DatePicker/components/YearSelection';
import TimePickerView from '../TimePicker/components/TimePickerView';
import DatetimePickerHeader from './components/DateTimePickerHeader';
import { Omit } from '@material-ui/core';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { convertToMeridiem } from '../_helpers/time-utils';
import { BaseDatePickerProps } from '../DatePicker/DatePickerRoot';
import { BaseTimePickerProps, useMeridiemMode } from '../TimePicker/TimePickerRoot';

export type DateTimePickerViewType = 'year' | 'date' | 'hours' | 'minutes';

export type BaseDateTimePickerProps = Omit<BaseTimePickerProps, 'seconds'> &
  Omit<BaseDatePickerProps, 'onlyCalendar' | 'views' | 'openTo'> & {
    autoSubmit?: boolean;
    /** Show or hide date/time tabs (hidden automatically on small screens) */
    showTabs?: boolean;
    /** Initial view to show when datetime picker is open */
    openTo?: 'year' | 'date' | 'hours' | 'minutes';
    /** Date tab icon */
    dateRangeIcon?: React.ReactNode;
    /** Time tab icon */
    timeIcon?: React.ReactNode;
    /**
     * View container that wraps DateTimePicker views
     * @type {React.Component}
     */
    ViewContainerComponent?:
      | string
      | React.ComponentType<{} | { openView: DateTimePickerViewType; onChange: () => void }>;
  };

export interface DateTimePickerProps extends BaseDateTimePickerProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

const DateTimePickerRoot: React.FC<DateTimePickerProps> = ({
  date,
  minDate,
  maxDate,
  showTabs,
  disablePast,
  disableFuture,
  leftArrowIcon,
  leftArrowButtonProps,
  rightArrowIcon,
  rightArrowButtonProps,
  dateRangeIcon,
  timeIcon,
  renderDay,
  ampm,
  minutesStep,
  shouldDisableDate,
  animateYearScrolling,
  allowKeyboardControl,
  ViewContainerComponent,
  onChange,
  onMonthChange,
  onYearChange,
}) => {
  const utils = useUtils();
  const [openView, setOpenView] = React.useState<DateTimePickerViewType>('date');
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange);

  const handleChangeAndOpenNext = React.useCallback(
    (nextView: DateTimePickerViewType | null) => {
      return (time: MaterialUiPickersDate, isFinish?: boolean) => {
        const timeWithMeridiem = convertToMeridiem(time, meridiemMode, Boolean(ampm), utils);

        if (isFinish && nextView) {
          // do not close picker if needs to show next view
          onChange(timeWithMeridiem, false);
          setOpenView(nextView);

          return;
        }

        onChange(timeWithMeridiem, Boolean(isFinish));
      };
    },
    [ampm, meridiemMode, onChange, utils]
  );

  const Container = ViewContainerComponent!;
  const ViewContainerComponentProps =
    typeof ViewContainerComponent === 'string' ? {} : { openView, onChange };

  return (
    <>
      <DatetimePickerHeader
        date={date}
        openView={openView}
        meridiemMode={meridiemMode}
        setMeridiemMode={handleMeridiemChange}
        onOpenViewChange={setOpenView}
        ampm={ampm}
      />

      {showTabs && (
        <DateTimePickerTabs
          view={openView}
          onChange={setOpenView}
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
        />
      )}

      <Container {...ViewContainerComponentProps}>
        <View selected={openView === 'year'}>
          <YearSelection
            date={date}
            minDate={utils.date(minDate)!}
            maxDate={utils.date(maxDate)!}
            onYearChange={onYearChange}
            onChange={handleChangeAndOpenNext('date')}
            disablePast={disablePast}
            disableFuture={disableFuture}
            animateYearScrolling={animateYearScrolling}
          />
        </View>

        <View selected={openView === 'date'}>
          <Calendar
            allowKeyboardControl={allowKeyboardControl}
            date={date}
            minDate={utils.date(minDate)}
            maxDate={utils.date(maxDate)}
            onChange={handleChangeAndOpenNext('hours')}
            disablePast={disablePast}
            disableFuture={disableFuture}
            leftArrowIcon={leftArrowIcon}
            leftArrowButtonProps={leftArrowButtonProps}
            rightArrowIcon={rightArrowIcon}
            rightArrowButtonProps={rightArrowButtonProps}
            renderDay={renderDay}
            shouldDisableDate={shouldDisableDate}
            onMonthChange={onMonthChange}
          />
        </View>

        <View selected={openView === 'hours' || openView === 'minutes'}>
          <TimePickerView
            date={date}
            ampm={ampm}
            type={openView as any} // here type is actually the same but 2 enums not equal
            onHourChange={handleChangeAndOpenNext('minutes')}
            onMinutesChange={handleChangeAndOpenNext(null)}
            onSecondsChange={() => {}}
            minutesStep={minutesStep}
          />
        </View>
      </Container>
    </>
  );
};

DateTimePickerRoot.propTypes = {
  autoSubmit: PropTypes.bool,
  openTo: PropTypes.oneOf(['year', 'date', 'hours', 'minutes'] as DateTimePickerViewType[]),
  showTabs: PropTypes.bool,
  ViewContainerComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  minutesStep: PropTypes.number,
} as any;

DateTimePickerRoot.defaultProps = {
  autoSubmit: true,
  showTabs: true,
  ampm: true,
  minutesStep: 1,
  minDate: new Date('1900-01-01'),
  maxDate: new Date('2100-01-01'),
  openTo: 'date' as DateTimePickerViewType,
  ViewContainerComponent: 'div',
};

export default DateTimePickerRoot;
