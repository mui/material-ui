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
            <Link
              // `preventDefault` is for demo purposes
              // and is generally not needed in your app
              onClick={(event) => event.preventDefault()}
              key={item}
              underline="hover"
              color="neutral"
              fontSize="inherit"
              href="/"
            >
              {item}
            </Link>
          ))}

          <Typography fontSize="inherit">Menu 3</Typography>
        </Breadcrumbs>
      )}
    />
  );
}
