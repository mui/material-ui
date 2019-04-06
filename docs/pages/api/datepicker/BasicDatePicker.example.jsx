import React, { Fragment, useState } from 'react';
import { DatePicker } from 'material-ui-pickers';

function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DatePicker
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
      />

      <DatePicker
        autoOk
        label="Clearable"
        clearable
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DatePicker
        label="Date of birth"
        value={selectedDate}
        disableFuture
        openTo="year"
        views={['year', 'month', 'day']}
        onChange={handleDateChange}
        format={props.getFormatString({
          moment: 'DD/MM/YYYY',
          dateFns: 'dd/MM/yyyy',
        })}
      />
    </Fragment>
  );
}

export default BasicDatePicker;
