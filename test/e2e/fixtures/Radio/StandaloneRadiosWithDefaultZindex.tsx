import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';

const RadioWithDefaultZindex = styled(Radio)`
  & input.css-1m9pwf3 {
    z-index: initial;
  }
`;

export default function StandaloneRadiosWithoutZindex() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <RadioWithDefaultZindex
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
      <RadioWithDefaultZindex
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      />
    </div>
  );
}
