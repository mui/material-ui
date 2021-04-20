import * as React from 'react';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-input.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-input.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function ColorSwitches() {
  return (
    <div>
      <Switch {...label} defaultChecked />
      <Switch {...label} defaultChecked color="primary" />
      <Switch {...label} defaultChecked color="default" />
      <GreenSwitch {...label} defaultChecked />
    </div>
  );
}
