import React, { Fragment, useState } from 'react';
import { DatePicker } from '@material-ui/pickers';

function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DatePicker
        label="Basic example"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DatePicker
        autoOk
        label="Clearable"
        clearable
        disableFuture
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DatePicker
        disableFuture
        openTo="year"
        format={props.__willBeReplacedGetFormatString({
          moment: 'DD/MM/YYYY',
          dateFns: 'dd/MM/yyyy',
        })}
        label="Date of birth"
        views={['year', 'month', 'date']}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default BasicDatePicker;
