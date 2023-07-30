import * as React from 'react';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';

export default function ToggleGroupSizes() {
  const [value, setValue] = React.useState('md');
  return (
    <ToggleButtonGroup
      size={value || undefined}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <Button value="sm">Small</Button>
      <Button value="md">Medium</Button>
      <Button value="lg">Large</Button>
    </ToggleButtonGroup>
  );
}
