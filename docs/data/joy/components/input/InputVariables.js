import * as React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import MailIcon from '@mui/icons-material/Mail';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function InputVariables() {
  return (
    <JoyVariablesDemo
      componentName="Input"
      renderCode={(formattedSx) => `<Input
  startDecorator={<MailIcon />}
  endDecorator={<Button>Message</Button>}${formattedSx ? `${formattedSx}>` : '\n>'}`}
      data={[
        {
          var: '--Input-radius',
          defaultValue: '8px',
        },
        {
          var: '--Input-gap',
          defaultValue: '8px',
        },
        {
          var: '--Input-placeholderOpacity',
          defaultValue: 0.5,
          inputAttributes: {
            min: 0.1,
            max: 1,
            step: 0.1,
          },
        },
        {
          var: '--Input-focusedThickness',
          defaultValue: '2px',
        },
        {
          var: '--Input-minHeight',
          defaultValue: '40px',
        },
        {
          var: '--Input-paddingInline',
          defaultValue: '12px',
        },
        {
          var: '--Input-decoratorChildHeight',
          defaultValue: '32px',
        },
      ]}
      renderDemo={(sx) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Input
            startDecorator={<MailIcon />}
            endDecorator={<Button>Message</Button>}
            placeholder="Type in here…"
            sx={sx}
          />
        </Box>
      )}
    />
  );
}
