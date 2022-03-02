import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function RadioIconSizeSmall() {
  return (
    <div>
      <Radio size="small" />
      <Radio size="small" icon={<RadioButtonUncheckedIcon />} />
    </div>
  );
}
