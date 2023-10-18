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
          options: [
            'h1',
            'h2',
            'h3',
            'h4',
            'title-lg',
            'title-md',
            'title-sm',
            'body-lg',
            'body-md',
            'body-sm',
            'body-xs',
          ],
          defaultValue: 'body-md',
        },
        {
          propName: 'underline',
          knob: 'radio',
          options: ['hover', 'always', 'none'],
          defaultValue: 'hover',
        },
        {
          propName: 'variant',
          knob: 'radio',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'primary',
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
