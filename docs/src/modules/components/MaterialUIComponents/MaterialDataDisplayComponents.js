import * as React from 'react';
import Grid from '@mui/material/Grid';
import ComponentShowcaseCard from 'docs/src/components/action/ComponentShowcaseCard';

const dataDisplayComponents = [
  {
    name: 'Avatar',
    srcLight: '/static/material-ui/react-components/avatar-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-avatar/',
  },
  {
    name: 'Badge',
    srcLight: '/static/material-ui/react-components/badge-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-badge/',
  },
  {
    name: 'Chip',
    srcLight: '/static/material-ui/react-components/chip-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-chip/',
  },
  {
    name: 'Divider',
    srcLight: '/static/material-ui/react-components/divider-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-divider/',
  },
  {
    name: 'Icons',
    srcLight: '/static/material-ui/react-components/icons-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/icons/',
  },
  {
    name: 'Material Icons',
    srcLight: '/static/material-ui/react-components/switch-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/material-icons/',
  },
  {
    name: 'List',
    srcLight: '/static/material-ui/react-components/list-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-list/',
  },
  {
    name: 'Table',
    srcLight: '/static/material-ui/react-components/table-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-table/',
  },
  {
    name: 'Tooltip',
    srcLight: '/static/material-ui/react-components/tooltip-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-tooltip/',
  },
  {
    name: 'Typography',
    srcLight: '/static/material-ui/react-components/typography-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-typography/',
  },
];

export default function MaterialDataDisplayComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {dataDisplayComponents.map(({ name, link, srcLight, srcDark }) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={name}>
          <ComponentShowcaseCard link={link} name={name} srcLight={srcLight} srcDark={srcDark} />
        </Grid>
      ))}
    </Grid>
  );
}
