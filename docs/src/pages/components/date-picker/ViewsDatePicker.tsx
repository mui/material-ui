import React from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default function ViewsDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizaitonProvider dateAdapter={DateFnsAdapter}>
      <div style={{ width: 300 }}>
        <DatePicker
          views={['year']}
          label="Year only"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" helperText={null} />
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
            <TextField {...params} margin="normal" helperText={null} />
          )}
        />
        <DatePicker
          openTo="year"
          views={['year', 'month', 'date']}
          label="Year, month and date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" helperText={null} />
          )}
        />
        <DatePicker
          views={['date', 'month', 'year']}
          label="Invert the order of views"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" helperText={null} />
          )}
        />
        <DatePicker
          views={['date']}
          label="Just date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" helperText={null} />
          )}
        />
      </div>
    </LocalizaitonProvider>
  );
}
