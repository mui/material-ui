import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';

export default function MaterialUIPickers() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container justifyContent="space-around">
        <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          label="Date picker desktop"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              id="date-picker-desktop"
              margin="normal"
              {...params}
              variant="standard"
            />
          )}
          OpenPickerButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <MobileDatePicker
          label="Date picker mobile"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              id="date-picker-mobile"
              margin="normal"
              {...params}
              variant="standard"
            />
          )}
          OpenPickerButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <TimePicker
          label="Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField margin="normal" {...params} variant="standard" />
          )}
          OpenPickerButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </LocalizationProvider>
  );
}
