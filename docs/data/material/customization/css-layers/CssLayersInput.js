import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

export default function CssLayersInput() {
  return (
    <FormControl variant="outlined">
      <InputLabel
        htmlFor="css-layers-input"
        sx={{
          transform: 'none',
          position: 'relative',
          mb: 0.25,
          fontWeight: 'medium',
          color: 'text.primary',
          pointerEvents: 'auto',
        }}
      >
        Label
      </InputLabel>
      <OutlinedInput
        id="css-layers-input"
        placeholder=""
        slotProps={{
          input: {
            sx: { py: 1.5 },
          },
        }}
      />
      <FormHelperText
        sx={{
          marginLeft: 0,
        }}
      >
        Helper text goes here
      </FormHelperText>
    </FormControl>
  );
}
