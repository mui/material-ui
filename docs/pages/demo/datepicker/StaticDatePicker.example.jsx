import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';

const StaticDatePicker = () => {
  const [date, handleDateChange] = useState(new Date());

  return (
    <>
      <DatePicker
        autoOk
        variant="static"
        openTo="year"
        value={date}
        onChange={date => handleDateChange(date)}
      />

      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={date => handleDateChange(date)}
      />
    </>
  );
};

export default StaticDatePicker;
