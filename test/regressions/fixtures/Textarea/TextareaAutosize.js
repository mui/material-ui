import * as React from 'react';
import Input from '@mui/material/Input';

export default function TextareaAutosize() {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Input
      style={{ width: 200 }}
      multiline
      minRows={4}
      onChange={handleChange}
      value={value}
      slotProps={{
        input: {
          'data-testid': 'input',
        },
      }}
    />
  );
}
