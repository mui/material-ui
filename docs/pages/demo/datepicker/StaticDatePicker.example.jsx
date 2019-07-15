import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';

const StaticDatePicker = () => {
  const [date, changeDate] = useState(new Date());

  // prettier-ignore
  return (
    <>
      <DatePicker
        autoOk
        variant="static"
        openTo="year"
        value={date}
        onChange={changeDate}
      />

      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
      />
    </>
  );
};

export default StaticDatePicker;
