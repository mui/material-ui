import * as React from 'react';
import Slider from '@material-ui/core/Slider';

function SxProp() {
  return (
    <Slider
      defaultValue={30}
      sx={{
        width: 300,
        color: (theme) => theme.palette.success.main,
      }}
    />
  );
}

export default SxProp;
