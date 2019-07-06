import React, { useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

const StaticTimePicker = () => {
  const [date, changeDate] = useState(new Date());

  return (
    <>
      <TimePicker autoOk variant="static" openTo="hours" value={date} onChange={changeDate} />
      <TimePicker autoOk variant="static" openTo="minutes" value={date} onChange={changeDate} />
    </>
  );
};

export default StaticTimePicker;
