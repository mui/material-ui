import React, { Fragment, useState } from 'react';
import { DatePicker, MobileDatePicker } from '@material-ui/pickers';

function YearMonthPicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DatePicker
        views={['year']}
        label="Year only"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <MobileDatePicker
        views={['year', 'month']}
        label="Year and Month"
        helperText="With min and max"
        minDate={new Date('2012-03-01')}
        maxDate={new Date('2023-06-01')}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DatePicker
        openTo="year"
        views={['year', 'month']}
        label="Year and Month"
        helperText="Start from year selection"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default YearMonthPicker;
