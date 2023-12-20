import * as React from 'react';
import Grid from '@mui/material/Grid';
import ComponentShowcaseCard from 'docs/src/components/action/ComponentShowcaseCard';

const layoutComponents = [
  {
    name: 'Box',
    srcLight: '/static/material-ui/react-components/box-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Container',
    srcLight: '/static/material-ui/react-components/container-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Grid',
    srcLight: '/static/material-ui/react-components/grid-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Grid v2',
    srcLight: '/static/material-ui/react-components/grid-v2-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Stack',
    srcLight: '/static/material-ui/react-components/stack-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Image List',
    srcLight: '/static/material-ui/react-components/image-list-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Hidden',
    srcLight: '/static/material-ui/react-components/link-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
];

export default function MaterialLayoutComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {layoutComponents.map(({ name, link, srcLight, srcDark }) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={name}>
          <ComponentShowcaseCard link={link} name={name} srcLight={srcLight} srcDark={srcDark} />
        </Grid>
      ))}
    </Grid>
  );
}
