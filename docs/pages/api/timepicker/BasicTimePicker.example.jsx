import React, { Fragment, useState } from 'react';
import { TimePicker } from 'material-ui-pickers';

function BasicTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <div className="picker">
        <TimePicker autoOk label="12 hours" value={selectedDate} onChange={handleDateChange} />
      </div>

      <div className="picker">
        <TimePicker
          clearable
          ampm={false}
          label="24 hours"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="picker">
        <TimePicker
          showTodayButton
          todayLabel="now"
          label="Step = 5"
          value={selectedDate}
          minutesStep={5}
          onChange={handleDateChange}
        />
      </div>
    </Fragment>
  );
}

export default BasicTimePicker;
