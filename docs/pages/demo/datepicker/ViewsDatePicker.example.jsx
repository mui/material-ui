import React, { Fragment, useState } from 'react';
import { DatePicker } from '@material-ui/pickers';

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

      <DatePicker
        views={['year', 'month']}
        label="Year and Month"
        helperText="With min and max"
        minDate={new Date('2018-03-01')}
        maxDate={new Date('2018-06-01')}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DatePicker
        variant="inline"
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
