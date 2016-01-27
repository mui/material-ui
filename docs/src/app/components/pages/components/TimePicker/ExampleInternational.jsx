import React from 'react';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

const TimePickerInternational = () => (
  <div>
    <TimePicker
      hintText="Custom Wordings"
      wordings={{ok: '确定', cancel: '取消'}}
    />
  </div>
);

export default TimePickerInternational;
