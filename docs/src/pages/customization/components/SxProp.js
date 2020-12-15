import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { alpha } from '@material-ui/core/styles';

export default function SxProp() {
  return (
    <Slider
      defaultValue={30}
      sx={{
        width: 300,
        color: 'success.main',
        '& .MuiSlider-thumb': {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: (theme) =>
              `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
          },
          '&.Mui-active': {
            boxShadow: (theme) =>
              `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
          },
        },
      }}
    />
  );
}
