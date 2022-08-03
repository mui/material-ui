import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import CloseRounded from '@mui/icons-material/CloseRounded';

export default function SelectUsage() {
  const [value, setValue] = React.useState(null);
  const action = React.useRef(null);
  return (
    <JoyUsageDemo
      componentName="Select"
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
          propName: 'placeholder',
          knob: 'input',
          defaultValue: 'Choose one...',
          codeBlockDisplay: true,
        },
        {
          propName: 'disabled',
          knob: 'switch',
        },
        {
          propName: 'children',
          defaultValue: `<Option>...</Option>`,
        },
      ]}
      renderDemo={(props) => (
        <Select
          {...props}
          action={action}
          value={value}
          onChange={setValue}
          {...(value && {
            endDecorator: (
              <IconButton
                size="sm"
                variant={props.variant}
                color="neutral"
                disabled={props.disabled}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  setValue(null);
                  action.current?.focusVisible();
                }}
              >
                <CloseRounded />
              </IconButton>
            ),
            indicator: null,
          })}
          sx={{ minWidth: 160, mb: 20 }}
        >
          <Option value="react">React</Option>
          <Option value="vue">Vue</Option>
          <Option value="svelte">Svelte</Option>
          <Option value="angular">Angular</Option>
        </Select>
      )}
    />
  );
}
