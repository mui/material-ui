import React, { Fragment, useState } from 'react';
import { InlineTimePicker } from 'material-ui-pickers';

function InlineTimePickerDemo() {
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  return (
    <Fragment>
      <div className="picker">
        <InlineTimePicker label="Inline mode" value={selectedDate} onChange={handleDateChange} />
      </div>

      <div className="picker">
        <InlineTimePicker
          keyboard
          label="With keyboard"
          value={selectedDate}
          onChange={handleDateChange}
          mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
        />
      </div>
    </Fragment>
  );
}

export default InlineTimePickerDemo;
