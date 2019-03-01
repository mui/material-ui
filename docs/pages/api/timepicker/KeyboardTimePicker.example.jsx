import React, { useState } from 'react';
import { TimePicker } from 'material-ui-pickers';

function KeyboardTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className="picker">
      <TimePicker
        keyboard
        label="Masked timepicker"
        mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
        placeholder="08:00 AM"
        value={selectedDate}
        onChange={handleDateChange}
        disableOpenOnEnter
      />
    </div>
  );
}

export default KeyboardTimePicker;
