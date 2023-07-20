import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function SelectUsage() {
  const [value, setValue] = React.useState(null);
  const action = React.useRef(null);
  return (
    <JoyUsageDemo
      componentName="Select"
      data={[
        {
          formLabel: 'Select variant',
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          formLabel: 'Select color',
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          formLabel: 'Option variant',
          propName: 'optionVariant',
          knob: 'radio',
          defaultValue: 'plain',
          options: ['plain', 'outlined', 'soft', 'solid'],
          codeBlockDisplay: false,
        },
        {
          formLabel: 'Option color',
          propName: 'optionColor',
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
          defaultValue: 'Choose one…',
          codeBlockDisplay: true,
        },
        {
          propName: 'disabled',
          knob: 'switch',
        },
        {
          propName: 'children',
          defaultValue: '$children',
        },
      ]}
      getCodeBlock={(code, props) =>
        code.replace(
          '$children',
          `<Option${props.optionVariant ? ` variant="${props.optionVariant}"` : ''}${
            props.optionColor ? ` color="${props.optionColor}"` : ''
          }>...</Option$>`,
        )
      }
      renderDemo={({ optionVariant, optionColor, ...props }) => (
        <Select
          {...props}
          defaultListboxOpen
          action={action}
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ minWidth: 160, mb: 20 }}
        >
          <Option variant={optionVariant} color={optionColor} value="react">
            React
          </Option>
          <Option variant={optionVariant} color={optionColor} value="vue">
            Vue
          </Option>
          <Option variant={optionVariant} color={optionColor} value="svelte">
            Svelte
          </Option>
          <Option variant={optionVariant} color={optionColor} value="angular">
            Angular
          </Option>
        </Select>
      )}
    />
  );
}
