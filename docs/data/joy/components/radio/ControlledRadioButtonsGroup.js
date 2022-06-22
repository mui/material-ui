import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';

export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <Typography
        id="demo-controlled-radio-buttons-group"
        level="body2"
        fontWeight="lg"
        mb={1.5}
      >
        Gender
      </Typography>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        defaultValue="female"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <Radio value="female" label="Female" />
        <Radio value="male" label="Male" />
        <Radio value="other" label="Other" />
      </RadioGroup>
    </Box>
  );
}
