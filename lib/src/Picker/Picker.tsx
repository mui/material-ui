import * as React from 'react';
import clsx from 'clsx';
import Calendar from '../views/Calendar/Calendar';
import { useUtils } from '../_shared/hooks/useUtils';
import { useViews } from '../_shared/hooks/useViews';
import { ClockView } from '../views/Clock/ClockView';
import { makeStyles } from '@material-ui/core/styles';
import { YearSelection } from '../views/Year/YearView';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { MonthSelection } from '../views/Month/MonthView';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { useIsLandscape } from '../_shared/hooks/useIsLandscape';
import { datePickerDefaultProps } from '../constants/prop-types';
import { DIALOG_WIDTH_WIDER, DIALOG_WIDTH, VIEW_HEIGHT } from '../constants/dimensions';

const viewsMap = {
  year: YearSelection,
  month: MonthSelection,
  date: Calendar,
  hours: ClockView,
  minutes: ClockView,
  seconds: ClockView,
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
    isLandscape: boolean;
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
  orientation?: BasePickerProps['orientation'];
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

const useStyles = makeStyles(
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
      minHeight: VIEW_HEIGHT,
      minWidth: DIALOG_WIDTH,
      maxWidth: DIALOG_WIDTH_WIDER,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
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
  disableToolbar,
  onChange,
  openTo,
  minDate: unparsedMinDate,
  maxDate: unparsedMaxDate,
  ToolbarComponent,
  orientation,
  ...rest
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const isLandscape = useIsLandscape(orientation);
  const { openView, setOpenView, handleChangeAndOpenNext } = useViews(views, openTo, onChange);

  const minDate = React.useMemo(() => utils.date(unparsedMinDate)!, [unparsedMinDate, utils]);
  const maxDate = React.useMemo(() => utils.date(unparsedMaxDate)!, [unparsedMaxDate, utils]);

  return (
    <div
      className={clsx(classes.container, {
        [classes.containerLandscape]: isLandscape,
      })}
    >
      {!disableToolbar && (
        <ToolbarComponent
          {...rest}
          views={views}
          isLandscape={isLandscape}
          date={date}
          onChange={onChange}
          setOpenView={setOpenView}
          openView={openView}
        />
      )}

      <div className={clsx(classes.pickerView, { [classes.pickerViewLandscape]: isLandscape })}>
        {openView === 'year' && (
          <YearSelection
            {...rest}
            date={date}
            onChange={handleChangeAndOpenNext}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}

        {openView === 'month' && (
          <MonthSelection
            {...rest}
            date={date}
            onChange={handleChangeAndOpenNext}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}

        {openView === 'date' && (
          <Calendar
            {...rest}
            date={date}
            onChange={handleChangeAndOpenNext}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}

        {(openView === 'hours' || openView === 'minutes' || openView === 'seconds') && (
          <ClockView
            {...rest}
            date={date}
            type={openView}
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
  views: Object.keys(viewsMap),
} as any;
