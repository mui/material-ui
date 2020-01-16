import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';

function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <DatePicker
      label="Basic example"
      value={selectedDate}
      // DialogProps={{ 'aria-activedescendant': '12' }}
      onChange={date => handleDateChange(date)}
    />
  );
}

export default BasicDatePicker;
