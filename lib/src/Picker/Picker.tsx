import * as React from 'react';
import clsx from 'clsx';
import { useViews } from '../_shared/hooks/useViews';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePickerView } from '../DateTimePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { CalendarView } from '../views/Calendar/CalendarView';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { useIsLandscape } from '../_shared/hooks/useIsLandscape';
import { datePickerDefaultProps } from '../constants/prop-types';
import { DIALOG_WIDTH, VIEW_HEIGHT } from '../constants/dimensions';
import { ClockView, BaseClockProps } from '../views/Clock/ClockView';

export type PickerView = DateTimePickerView;

export type ToolbarComponentProps = BaseDatePickerProps &
  BaseClockProps & {
    views: PickerView[];
    openView: PickerView;
    date: MaterialUiPickersDate;
    setOpenView: (view: PickerView) => void;
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    title?: string;
    // TODO move out, cause it is DateTimePickerOnly
    hideTabs?: boolean;
    dateRangeIcon?: React.ReactNode;
    timeIcon?: React.ReactNode;
    isLandscape: boolean;
    ampmInClock?: boolean;
  };

export interface PickerViewProps extends BaseDatePickerProps, BaseClockProps {
  views: PickerView[];
  openTo: PickerView;
  title?: string;
  disableToolbar?: boolean;
  ToolbarComponent: React.ComponentType<ToolbarComponentProps>;
  // TODO move out, cause it is DateTimePickerOnly
  hideTabs?: boolean;
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
}

interface PickerProps extends PickerViewProps {
  date: MaterialUiPickersDate;
  orientation?: BasePickerProps['orientation'];
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

export const useStyles = makeStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    containerLandscape: {
      flexDirection: 'row',
    },
    pickerView: {
      overflowX: 'hidden',
      height: VIEW_HEIGHT,
      width: DIALOG_WIDTH,
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
    },
    pickerViewLandscape: {
      padding: '0 8px',
    },
  },
  { name: 'MuiPickersBasePicker' }
);

export const Picker: React.FunctionComponent<PickerProps> = ({
  date,
  views,
  title,
  disableToolbar,
  onChange,
  openTo,
  ToolbarComponent,
  orientation,
  ...other
}) => {
  const classes = useStyles();
  const isLandscape = useIsLandscape(views, orientation);
  const { openView, setOpenView, handleChangeAndOpenNext } = useViews(views, openTo, onChange);

  return (
    <div
      className={clsx(classes.container, {
        [classes.containerLandscape]: isLandscape,
      })}
    >
      {!disableToolbar && (
        <ToolbarComponent
          {...other}
          views={views}
          isLandscape={isLandscape}
          date={date}
          onChange={onChange}
          setOpenView={setOpenView}
          openView={openView}
          title={title}
          ampmInClock={other.ampmInClock}
        />
      )}

      <div className={clsx(classes.pickerView, { [classes.pickerViewLandscape]: isLandscape })}>
        {(openView === 'year' || openView === 'month' || openView === 'date') && (
          <CalendarView
            date={date}
            changeView={setOpenView}
            // @ts-ignore
            views={views}
            onChange={handleChangeAndOpenNext}
            view={openView}
            {...other}
          />
        )}

        {(openView === 'hours' || openView === 'minutes' || openView === 'seconds') && (
          <ClockView
            {...other}
            date={date}
            type={openView}
            onDateChange={onChange}
            onHourChange={handleChangeAndOpenNext}
            onMinutesChange={handleChangeAndOpenNext}
            onSecondsChange={handleChangeAndOpenNext}
          />
        )}
      </div>
    </div>
  );
};

Picker.defaultProps = {
  ...datePickerDefaultProps,
};
