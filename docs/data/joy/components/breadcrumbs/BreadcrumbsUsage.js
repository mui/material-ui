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
      ]}
      renderDemo={(props) => (
        <Breadcrumbs {...props}>
          <Link underline="hover" color="neutral" href="/" fontSize="inherit">
            MUI
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="/joy-ui/getting-started/installation/"
            fontSize="inherit"
          >
            Joy
          </Link>
          <Typography fontSize="inherit">Breadcrumbs</Typography>
        </Breadcrumbs>
      )}
    />
  );
}
