import * as React from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TextField from '@mui/material/TextField';
import ClockIcon from '@mui/icons-material/AccessTime';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Stack from '@mui/material/Stack';

export default function CustomDateTimePicker() {
  const [clearedDate, setClearedDate] = React.useState(null);
  const [value, setValue] = React.useState(new Date('2019-01-01T18:54'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          disableFuture
          hideTabs
          showTodayButton
          todayText="now"
          openTo="hours"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDate={new Date('2018-01-01')}
          components={{
            LeftArrowIcon: AlarmIcon,
            RightArrowIcon: SnoozeIcon,
            OpenPickerIcon: ClockIcon,
          }}
          leftArrowButtonText="Open previous month"
          rightArrowButtonText="Open next month"
          minTime={new Date(0, 0, 0, 9)}
          maxTime={new Date(0, 0, 0, 20)}
          renderInput={(params) => (
            <TextField {...params} helperText="Hardcoded helper text" />
          )}
        />
        <MobileDateTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          label="With error handler"
          onError={console.log}
          minDate={new Date('2018-01-01T00:00')}
          inputFormat="yyyy/MM/dd hh:mm a"
          mask="___/__/__ __:__ _M"
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          clearable
          value={clearedDate}
          onChange={(newValue) => setClearedDate(newValue)}
          renderInput={(params) => (
            <TextField {...params} helperText="Clear Initial State" />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
