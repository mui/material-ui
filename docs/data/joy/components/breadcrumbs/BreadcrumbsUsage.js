import * as React from 'react';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function BreadcrumbsUsage() {
  return (
    <JoyUsageDemo
      componentName="Breadcrumbs"
      data={[
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'separator',
          knob: 'input',
          defaultValue: '/',
        },
        {
          propName: 'children',
          defaultValue: '<Link />\n  ...',
        },
      ]}
      renderDemo={(props) => (
        <Breadcrumbs {...props} aria-label="breadcrumbs">
          <Link
            // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
            onClick={(event) => event.preventDefault()}
            color="neutral"
            href="/"
          >
            MUI
          </Link>
          <Link
            // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
            onClick={(event) => event.preventDefault()}
            color="neutral"
            href="/joy-ui/getting-started/installation/"
          >
            Joy
          </Link>
          <Typography>Breadcrumbs</Typography>
        </Breadcrumbs>
      )}
    />
  );
}
