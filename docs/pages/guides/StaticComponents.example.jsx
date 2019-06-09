import React, { useState } from 'react';
import { Paper } from '@material-ui/core/';
import { usePickerState, TimePickerView, Calendar } from '@material-ui/pickers';

function StaticPickers() {
  const [value, handleDateChange] = useState(new Date());
  // eslint-disable-next-line
  const { pickerProps, wrapperProps, inputProps } = usePickerState(
    { value, onChange: handleDateChange },
    {
      getDefaultFormat: () => 'MM/dd/yyyy',
    }
  );

  return (
    <div>
      <Paper style={{ overflow: 'hidden' }}>
        <Calendar {...pickerProps} />
      </Paper>

      <TimePickerView // or just directly use components
        type="hours"
        date={value}
        ampm={false}
        onMinutesChange={() => {}}
        onSecondsChange={() => {}}
        onHourChange={handleDateChange}
      />
    </div>
  );
}

export default StaticPickers;
