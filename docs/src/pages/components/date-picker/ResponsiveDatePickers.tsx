import React from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

export default function ResponsiveDatePickers() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <div style={{ width: 300 }}>
        <MobileDatePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" variant="standard" />
          )}
        />
        <DesktopDatePicker
          label="For desktop"
          value={value}
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" variant="standard" />
          )}
        />
        <DatePicker
          disableFuture
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'date']}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" variant="standard" />
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
