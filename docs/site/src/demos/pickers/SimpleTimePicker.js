// @flow weak

import React from 'react';
import TimePicker from 'material-ui/TimePicker/TimePicker';

export default function BasicTimePicker() {
  return (
    <div>
      <div>
        <TimePicker hintText="12hr Format" />
      </div>
      <div>
        <TimePicker format="24hr" hintText="24hr Format" />
      </div>
      <div>
        <TimePicker autoOk format="24hr" hintText="24hr Format with autoOk" />
      </div>
    </div>);
}
