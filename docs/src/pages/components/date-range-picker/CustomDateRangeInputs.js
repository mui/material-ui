import * as React from 'react';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePicker from '@material-ui/lab/DateRangePicker';

export default function CustomDateRangeInputs() {
  const [selectedDate, handleDateChange] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <DateRangePicker
        label="Advanced keyboard"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <input ref={startProps.inputRef} {...startProps.inputProps} />
            <input ref={endProps.inputRef} {...endProps.inputProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
