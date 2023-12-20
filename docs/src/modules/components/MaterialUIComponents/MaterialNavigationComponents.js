import * as React from 'react';
import Grid from '@mui/material/Grid';
import ComponentShowcaseCard from 'docs/src/components/action/ComponentShowcaseCard';

const navigationComponents = [
  {
    name: 'Bottom Navigation',
    srcLight: '/static/material-ui/react-components/bottomnav-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Breadcrumbs',
    srcLight: '/static/material-ui/react-components/breadcrumbs-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Drawer',
    srcLight: '/static/material-ui/react-components/drawer-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Link',
    srcLight: '/static/material-ui/react-components/link-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Menu',
    srcLight: '/static/material-ui/react-components/menu-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Pagination',
    srcLight: '/static/material-ui/react-components/pagination-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Speed Dial',
    srcLight: '/static/material-ui/react-components/speed-dial-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Stepper',
    srcLight: '/static/material-ui/react-components/stepper-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'Tabs',
    srcLight: '/static/material-ui/react-components/tabs-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
];

export default function MaterialNavigationComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {navigationComponents.map(({ name, link, srcLight, srcDark }) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={name}>
          <ComponentShowcaseCard link={link} name={name} srcLight={srcLight} srcDark={srcDark} />
        </Grid>
      ))}
    </Grid>
  );
}
