import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

export default function ToggleGroupUsage() {
  const [value, setValue] = React.useState('bold');
  const [values, setValues] = React.useState([value]);
  return (
    <JoyUsageDemo
      componentName="ToggleButtonGroup"
      data={[
        {
          propName: 'variant',
          knob: 'select',
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
          propName: 'exclusive',
          knob: 'switch',
          defaultValue: false,
          codeBlockDisplay: false,
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
