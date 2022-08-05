import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function BreadcrumbsVariables() {
  return (
    <JoyVariablesDemo
      componentName="Breadcrumbs"
      renderCode={(formattedSx) =>
        `<Breadcrumbs ${formattedSx ? `${formattedSx}>` : '\n>'}`
      }
      data={[
        {
          var: '--Breadcrumbs-gap',
          defaultValue: '0.25rem',
        },
      ]}
      renderDemo={(sx) => (
        <Breadcrumbs sx={sx}>
          {['Breadcrumb 1', 'Breadcrumb 2', 'Breadcrumb 3'].map((item: string) => (
            <Link
              // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
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
          <Typography fontSize="inherit">Breadcrumb 4</Typography>
        </Breadcrumbs>
      )}
    />
  );
}
