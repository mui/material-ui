import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import {
  LocalizationProvider as MuiPickersLocalizationProvider,
  TimePicker,
  DesktopDatePicker,
  MobileDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersLocalizationProvider dateAdapter={DateFnsAdapter}>
      <Grid container justifyContent="space-around">
        <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          label="Date picker desktop"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(props) => (
            <TextField id="date-picker-desktop" margin="normal" {...props} />
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
          renderInput={(props) => (
            <TextField id="date-picker-mobile" margin="normal" {...props} />
          )}
          OpenPickerButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <TimePicker
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(props) => <TextField margin="normal" {...props} />}
          OpenPickerButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersLocalizationProvider>
  );
}
