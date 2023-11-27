import * as React from 'react';
import Badge from '@mui/material-next/Badge';
import MailIcon from '@mui/icons-material/Mail';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';

export default function BadgeMaterialYouPlayground() {
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
          options: [
            'error',
            'info',
            'warning',
            'success',
            'primary',
            'secondary',
            'tertiary',
          ],
          defaultValue: 'error',
        },
        {
          propName: 'size',
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
