import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';

export default function DividerUsages() {
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
        <Sheet>
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
              variant="soft"
              sx={{
                height: props.orientation === 'vertical' ? 120 : 40,
                flexGrow: 1,
                borderRadius: 'xs',
              }}
            />
            <Divider {...props} />
            <Sheet
              variant="soft"
              sx={{
                height: props.orientation === 'vertical' ? 120 : 40,
                flexGrow: 1,
                borderRadius: 'xs',
              }}
            />
          </Stack>
        </Sheet>
      )}
    />
  );
}
