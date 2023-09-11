import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function ToggleGroupUsage() {
  const [value, setValue] = React.useState('bold');
  const [values, setValues] = React.useState([value]);
  return (
    <JoyUsageDemo
      componentName="ToggleButtonGroup"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'children',
          defaultValue: `<Button />
  <IconButton />
  <IconButton />`,
        },
      ]}
      renderDemo={(props) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ToggleButtonGroup
            value={props.exclusive ? value : values}
            onChange={(event, newValue) => {
              if (Array.isArray(newValue)) {
                setValues(newValue);
              } else {
                setValue(newValue);
              }
            }}
            {...props}
          >
            <Button value="bold">Bold</Button>
            <IconButton value="italic">
              <FormatItalicIcon />
            </IconButton>
            <IconButton value="underlined">
              <FormatUnderlinedIcon />
            </IconButton>
          </ToggleButtonGroup>
        </Box>
      )}
    />
  );
}
