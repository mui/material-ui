import * as React from 'react';
import { expectType } from '@mui/types';
import { FormControlLabel, Checkbox, TypographyProps } from '@mui/material';

const typographyProps: TypographyProps<'span'> = {
  component: 'span',
  onClick: (event) => {
    expectType<React.MouseEvent<HTMLSpanElement, MouseEvent>, typeof event>(event);
  },
};

function Test() {
  return (
    <React.Fragment>
      <FormControlLabel control={<Checkbox />} label="Test" />
      <FormControlLabel
        control={<Checkbox />}
        label="Test"
        slotProps={{ typography: typographyProps }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Test"
        slotProps={{
          typography: {
            variant: 'h6',
            noWrap: true,
          },
        }}
      />
    </React.Fragment>
  );
}
