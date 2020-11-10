import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';

export default function MaterialUIPickers() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <Grid container justifyContent="space-around">
        <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          label="Date picker desktop"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField id="date-picker-desktop" margin="normal" {...params} />
          )}
          OpenPickerButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <MobileDatePicker
          label="Date picker mobile"
          inputFormat="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField id="date-picker-mobile" margin="normal" {...params} />
          )}
          OpenPickerButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <TimePicker
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField margin="normal" {...params} />}
          OpenPickerButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </LocalizationProvider>
  );
}
