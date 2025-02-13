import * as React from 'react';
import { VariantProp } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';

export default function ToggleGroupVariants() {
  const [value, setValue] = React.useState<VariantProp | null>('plain');
  return (
    <ToggleButtonGroup
      variant={value || undefined}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <Button value="plain">plain</Button>
      <Button value="outlined">outlined</Button>
      <Button value="soft">soft</Button>
      <Button value="solid">solid</Button>
    </ToggleButtonGroup>
  );
}
