/* eslint-disable no-underscore-dangle, no-console */
import * as React from 'react';
import AlarmIcon from '@material-ui/icons/Alarm';
import SnoozeIcon from '@material-ui/icons/Snooze';
import TextField from '@material-ui/core/TextField';
import ClockIcon from '@material-ui/icons/AccessTime';
import { DateTimePicker, MobileDateTimePicker } from '@material-ui/pickers';

export default function CustomDateTimePicker(demoProps: any) {
  const [clearedDate, setClearedDate] = React.useState<Date | null>(null);
  const [value, setValue] = React.useState<Date | null>(new Date('2019-01-01T18:54'));

  return (
    <React.Fragment>
      <DateTimePicker
        disableFuture
        hideTabs
        showTodayButton
        todayText="now"
        openTo="hours"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        minDate={new Date('2018-01-01')}
        leftArrowIcon={<AlarmIcon />}
        rightArrowIcon={<SnoozeIcon />}
        leftArrowButtonText="Open previous month"
        rightArrowButtonText="Open next month"
        openPickerIcon={<ClockIcon />}
        minTime={new Date(0, 0, 0, 9)}
        maxTime={new Date(0, 0, 0, 20)}
        renderInput={(props) => (
          <TextField {...props} variant="outlined" helperText="Hardcoded helper text" />
        )}
      />
      <MobileDateTimePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        label="With error handler"
        onError={console.log}
        minDate={new Date('2018-01-01T00:00')}
        inputFormat={demoProps.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD hh:mm A',
          dateFns: 'yyyy/MM/dd hh:mm a',
        })}
        mask="___/__/__ __:__ _M"
        renderInput={(props) => <TextField variant="outlined" {...props} />}
      />
      <DateTimePicker
        clearable
        value={clearedDate}
        onChange={(newValue) => setClearedDate(newValue)}
        renderInput={(props) => <TextField {...props} helperText="Clear Initial State" />}
      />
    </React.Fragment>
  );
}
