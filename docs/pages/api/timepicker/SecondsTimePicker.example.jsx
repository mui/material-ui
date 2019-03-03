import React, { Fragment, useState } from 'react';
import { TimePicker } from 'material-ui-pickers';

function SecondsTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <div className="picker">
        <TimePicker
          seconds
          format="hh:mm:ss a"
          label="With seconds"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="picker">
        <TimePicker
          seconds
          ampm={false}
          format="HH:mm:ss"
          label="24 hours"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
    </Fragment>
  );
}

export default SecondsTimePicker;
