import * as React from 'react';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Done from '@mui/icons-material/Done';

export default function HoverCheckbox() {
  return (
    <Checkbox
      uncheckedIcon={<Done />}
      label="Label"
      sx={{
        [`&:not(.${checkboxClasses.checked})`]: {
          '& svg': { opacity: 0 },
          [`&:hover svg, &.${checkboxClasses.focusVisible} svg`]: { opacity: 1 },
        },
      }}
    />
  );
}
