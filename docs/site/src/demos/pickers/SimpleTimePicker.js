// @flow weak

import React from 'react';
import TimePicker from 'material-ui/TimePicker/TimePicker';
import Clock from 'material-ui/TimePicker/Clock';

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
      <div>
        <TimePicker landscape hintText="12hr Format landscape" />
      </div>
      <div style={{ width: '300px', height: '300px' }}>
        <Clock
          mode="hour"
          format="24hr"
          onChange={(value, finish) => { console.log(value, finish); }}
          onSetMode={(value) => { console.log('on set mode', value); }}
        />
      </div>
    </div>);
}
