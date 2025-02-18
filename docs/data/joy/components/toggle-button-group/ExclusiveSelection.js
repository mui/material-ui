import * as React from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

export default function ExclusiveSelection() {
  const [value, setValue] = React.useState('default');
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <Button value="default">Default</Button>
      <IconButton value="bold">
        <FormatBoldIcon />
      </IconButton>
      <IconButton value="italic">
        <FormatItalicIcon />
      </IconButton>
      <IconButton value="underlined">
        <FormatUnderlinedIcon />
      </IconButton>
    </ToggleButtonGroup>
  );
}
