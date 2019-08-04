import React, { useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

const StaticTimePicker = () => {
  const [date, changeDate] = useState(new Date());

  // prettier-ignore
  return (
    <>
      <TimePicker
        autoOk
        variant="static"
        openTo="hours"
        value={date}
        onChange={changeDate}
      />

      <TimePicker
        autoOk
        ampm={false}
        variant="static"
        orientation="landscape"
        openTo="minutes"
        value={date}
        onChange={changeDate}
      />
    </>
  );
};

export default StaticTimePicker;
