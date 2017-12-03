import React from 'react';
import SpeedDial from 'material-ui/SpeedDial';
import SpeedDialAction from 'material-ui/SpeedDial/SpeedDialAction';
import Icon from 'material-ui/Icon';

export default function SimpleSpeedDial() {
  return (
    <SpeedDial open label="mySpeedDial">
      <SpeedDialAction icon={<Icon>save</Icon>} tooltipTitle="SpeedDialAction1" />
      <SpeedDialAction icon={<Icon>print</Icon>} tooltipTitle="SpeedDialAction2" />
    </SpeedDial>
  );
}
