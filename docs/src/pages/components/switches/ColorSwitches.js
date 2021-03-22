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

export default function ColorSwitches() {
  return (
    <div>
      <Switch defaultChecked inputProps={{ 'aria-label': 'secondary' }} />
      <Switch
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'primary' }}
      />
      <Switch
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'default' }}
      />
      <GreenSwitch defaultChecked inputProps={{ 'aria-label': 'custom' }} />
    </div>
  );
}
