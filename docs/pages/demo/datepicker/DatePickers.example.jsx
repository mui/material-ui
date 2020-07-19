import React from 'react';
import TextField from '@material-ui/core/TextField';
import { MobileDatePicker, DesktopDatePicker, DatePicker } from '@material-ui/pickers';

export default function DatePickersVariants(props) {
  const [selectedDate, handleDateChange] = React.useState(new Date());

  return (
    <React.Fragment>
      <MobileDatePicker
        clearable
        label="For mobile"
        inputFormat={props.__willBeReplacedGetFormatString({
          moment: 'MM/DD/YYYY',
          dateFns: 'MM/dd/yyyy',
        })}
        toolbarPlaceholder="Enter Date"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />

      <DesktopDatePicker
        label="For desktop"
        minDate={new Date('2017-01-01')}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />

      <DatePicker
        disableFuture
        label="Responsive"
        openTo="year"
        views={['year', 'month', 'date']}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />
    </React.Fragment>
  );
}
