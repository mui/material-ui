import React from 'react';
import Switch from '@material-ui/core/Switch';
import { styled } from '@material-ui/core/styles';
import SwitchThumb from '@material-ui/core/SwitchThumb';

const SwitchThumbSquare = styled(SwitchThumb)({
  borderRadius: 2,
  width: 20,
  height: 20,
});

export default function CustomizedSwitchThumbs() {
  return (
    <div>
      <Switch icon={<SwitchThumbSquare />} checkedIcon={<SwitchThumbSquare />} />
    </div>
  );
}
