import React, { useState } from 'react';
import { DatePicker as DateRangePicker } from '@material-ui/pickers';

function BasicDateRangePicker() {
  const [selectedDate, handleDateChange] = useState([new Date(), null]);

  return <DateRangePicker value={selectedDate} onChange={date => handleDateChange(date)} />;
}

export default BasicDateRangePicker;
