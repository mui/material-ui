import * as React from 'react';
import Link from '@mui/joy/Link';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function LinkUsage() {
  return (
    <JoyUsageDemo
      componentName="Link"
      data={[
        {
          propName: 'level',
          knob: 'select',
          options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'body3'],
          defaultValue: 'body1',
        },
        {
          propName: 'underline',
          knob: 'radio',
          options: ['hover', 'always', 'none'],
          defaultValue: 'hover',
        },
        {
          propName: 'variant',
          knob: 'select',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
        },
        { propName: 'disabled', knob: 'switch' },
      ]}
      renderDemo={(props) => (
        <Link {...props} href="#usage-props">
          Anchor
        </Link>
      )}
    />
  );
}
