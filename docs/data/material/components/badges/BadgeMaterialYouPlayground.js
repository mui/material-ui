import * as React from 'react';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';
import Badge from '@mui/material-next/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function BadgeUsage() {
  return (
    <MaterialYouUsageDemo
      componentName="Badge"
      data={[
        {
          propName: 'badgeContent',
          defaultValue: 4,
        },
        {
          propName: 'color',
          knob: 'select',
          options: ['error', 'primary', 'secondary', 'tertiary'],
          defaultValue: 'error',
        },
        {
          propName: 'variant',
          knob: 'select',
          options: ['small', 'large'],
          defaultValue: 'large',
        },
        {
          propName: 'invisible',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={({ vertical, ...rest }) => (
        <Badge {...rest}>
          <MailIcon color="action" />
        </Badge>
      )}
    />
  );
}
