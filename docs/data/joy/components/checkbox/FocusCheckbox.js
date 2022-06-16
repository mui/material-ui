import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';

export default function FocusCheckbox() {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Checkbox
        label="Label"
        defaultChecked
        // to demonstrate the focus outline
        componentsProps={{ action: { className: checkboxClasses.focusVisible } }}
      />
      <Checkbox
        label="Label"
        defaultChecked
        sx={{ [`& > .${checkboxClasses.checkbox}`]: { position: 'relative' } }}
        // to demonstrate the focus outline
        componentsProps={{ action: { className: checkboxClasses.focusVisible } }}
      />
    </Box>
  );
}
