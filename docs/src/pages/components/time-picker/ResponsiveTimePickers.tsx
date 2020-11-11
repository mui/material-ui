import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
import DesktopTimePicker from '@material-ui/lab/DesktopTimePicker';

export default function ResponsiveTimePickers() {
  const [value, setValue] = React.useState<Date | null>(
    new Date('2018-01-01T00:00:00.000Z'),
  );

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <div style={{ width: 300 }}>
        <MobileTimePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} margin="normal" />}
        />
        <DesktopTimePicker
          label="For desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} margin="normal" />}
        />
        <TimePicker
          value={value}
          onChange={setValue}
          renderInput={(params) => <TextField {...params} margin="normal" />}
        />
      </div>
    </LocalizationProvider>
  );
}
