import React, { Fragment, useState } from 'react';
import { TextField } from '@material-ui/core';
import { MobileDatePicker, DesktopDatePicker, DatePicker } from '@material-ui/pickers';

function DatePickersVariants(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <MobileDatePicker
        renderInput={props => <TextField {...props} />}
        clearable
        label="For mobile"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        inputFormat={props.__willBeReplacedGetFormatString({
          moment: 'MM/DD/YYYY',
          dateFns: 'MM/dd/yyyy',
        })}
      />

      <DesktopDatePicker
        autoOk
        label="For desktop"
        renderInput={props => <TextField {...props} />}
        minDate={new Date('2017-01-01')}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DatePicker
        disableFuture
        renderInput={props => <TextField {...props} />}
        label="Responsive"
        openTo="year"
        views={['year', 'month', 'date']}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default DatePickersVariants;
