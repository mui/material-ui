import * as React from 'react';
import NumberField from '@mui/material/NumberField';

export default function FilledSplitScrubArea() {
  return (
    <NumberField
      variant="filled"
      label="Quantity"
      defaultValue={5}
      controlsPosition="split"
      scrubAreaPosition="end"
    />
  );
}
