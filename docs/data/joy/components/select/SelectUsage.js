import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import CloseRounded from '@mui/icons-material/CloseRounded';

export default function SelectUsage() {
  const [value, setValue] = React.useState(null);
  const [dirty, setDirty] = React.useState(false);
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
      ]}
      renderDemo={(props) => (
        <Select
          {...props}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setDirty(true);
          }}
          {...(!!dirty && {
            autoFocus: !value,
          })}
          {...(value && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  setValue(null);
                }}
              >
                <CloseRounded />
              </IconButton>
            ),
            indicator: null,
          })}
          sx={{ minWidth: 160 }}
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
