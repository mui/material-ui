// @flow weak

import React from 'react';
import TimeDisplay from 'material-ui/TimePicker/TimeDisplay';
import TimePicker from 'material-ui/TimePicker/TimePicker';

export default function BasicTimePicker() {
  return (
    <div>
      <div>
        <TimePicker autoOk format="24hr" hintText="24hr Format" />
      </div>
    </div>);
}
