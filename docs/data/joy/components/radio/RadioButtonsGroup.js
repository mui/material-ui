import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';

export default function RadioButtonsGroup() {
  return (
    <Box>
      <Typography
        id="demo-radio-buttons-group-label"
        level="body2"
        fontWeight="lg"
        mb={1.5}
      >
        Gender
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <Radio value="female" label="Female" />
        <Radio value="male" label="Male" />
        <Radio value="other" label="Other" />
      </RadioGroup>
    </Box>
  );
}
