import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function TextareaUsage() {
  return (
    <JoyUsageDemo
      componentName="Textarea"
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
          propName: 'placeholder',
          knob: 'input',
          defaultValue: 'Type something…',
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'minRows',
          defaultValue: 2,
          codeBlockDisplay: true,
        },
      ]}
      renderDemo={(props) => <Textarea {...props} />}
    />
  );
}
