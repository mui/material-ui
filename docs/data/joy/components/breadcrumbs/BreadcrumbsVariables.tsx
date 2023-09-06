import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function BreadcrumbsVariables() {
  return (
    <JoyVariablesDemo
      componentName="Breadcrumbs"
      data={[
        {
          var: '--Breadcrumbs-gap',
          defaultValue: '4px',
        },
      ]}
      renderDemo={(sx) => (
        <Breadcrumbs sx={sx}>
          {['Menu 1', 'Menu 2'].map((item) => (
            <Link key={item} color="neutral" href="#css-variable-playground">
              {item}
            </Link>
          ))}

          <Typography>Menu 3</Typography>
        </Breadcrumbs>
      )}
    />
  );
}
