import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default function ViewsDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizaitonProvider dateAdapter={AdapterDateFns}>
      <div style={{ width: 300 }}>
        <DatePicker
          views={['year']}
          label="Year only"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              helperText={null}
              variant="standard"
            />
          )}
        />
        <DatePicker
          views={['year', 'month']}
          label="Year and Month"
          minDate={new Date('2012-03-01')}
          maxDate={new Date('2023-06-01')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              helperText={null}
              variant="standard"
            />
          )}
        />
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label="Year, month and date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              helperText={null}
              variant="standard"
            />
          )}
        />
        <DatePicker
          views={['day', 'month', 'year']}
          label="Invert the order of views"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              helperText={null}
              variant="standard"
            />
          )}
        />
        <DatePicker
          views={['day']}
          label="Just date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              helperText={null}
              variant="standard"
            />
          )}
        />
      </div>
    </LocalizaitonProvider>
  );
}
