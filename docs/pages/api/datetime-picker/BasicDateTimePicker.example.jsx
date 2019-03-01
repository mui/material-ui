import React, { Fragment, useState } from 'react';
import { DateTimePicker } from 'material-ui-pickers';

function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <div className="picker">
        <DateTimePicker value={selectedDate} onChange={handleDateChange} label="DateTimePicker" />
      </div>

      <div className="picker">
        <DateTimePicker
          autoOk
          ampm={false}
          disableFuture
          value={selectedDate}
          onChange={handleDateChange}
          label="24h clock"
        />
      </div>

      <div className="picker">
        <DateTimePicker
          value={selectedDate}
          disablePast
          onChange={handleDateChange}
          label="With Today Button"
          showTodayButton
        />
      </div>
    </Fragment>
  );
}

export default BasicDateTimePicker;
