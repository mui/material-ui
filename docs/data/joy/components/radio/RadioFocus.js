import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';

export default function RadioFocus() {
  return (
    <Box>
      <Typography
        id="demo-radio-buttons-group-focus"
        level="body2"
        fontWeight="lg"
        mb={1.5}
      >
        Focus
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-focus"
        aria-describedby="demo-radio-buttons-group-focus-description"
        name="radio-buttons-group-focus"
      >
        <Radio value="default" label="Default" />
        <Radio
          value="relative"
          label="Position relative"
          sx={{ [`& .${radioClasses.radio}`]: { position: 'relative' } }}
        />
      </RadioGroup>
      <Typography
        level="body3"
        mt={2}
        id="demo-radio-buttons-group-focus-description"
      >
        Select an option and use keyboard ↑↓ to see the focus outline
      </Typography>
    </Box>
  );
}
