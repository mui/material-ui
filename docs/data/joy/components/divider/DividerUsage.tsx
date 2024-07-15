import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function DividerUsage() {
  return (
    <JoyUsageDemo
      componentName="Divider"
      data={[
        {
          propName: 'orientation',
          knob: 'radio',
          defaultValue: 'horizontal',
          options: ['horizontal', 'vertical'],
        },
        {
          propName: 'children',
          knob: 'input',
          defaultValue: '',
        },
      ]}
      renderDemo={(props) => (
        <Sheet sx={{ my: 2, bgcolor: 'transparent' }}>
          <Sheet
            sx={{
              height: 12,
              width: 80,
              borderRadius: 'lg',
              mb: 1,
              bgcolor: 'background.level3',
            }}
          />
          <Stack
            direction={props.orientation === 'vertical' ? 'row' : 'column'}
            spacing={2}
            sx={{ width: 300, pb: 3 }}
          >
            <Sheet
              sx={[
                {
                  flexGrow: 1,
                  borderRadius: 'xs',
                  bgcolor: 'background.level3',
                },
                props.orientation === 'vertical' ? { height: 120 } : { height: 40 },
              ]}
            />
            <Divider {...props} />
            <Sheet
              sx={[
                {
                  flexGrow: 1,
                  borderRadius: 'xs',
                  bgcolor: 'background.level3',
                },
                props.orientation === 'vertical' ? { height: 120 } : { height: 40 },
              ]}
            />
          </Stack>
        </Sheet>
      )}
    />
  );
}
