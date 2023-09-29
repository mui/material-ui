import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ComponentShowcaseCard from 'docs/src/components/action/ComponentShowcaseCard';

const surfaceComponents = [
  {
    name: 'Accordion',
    srcLight: '/static/material-ui/react-components/accordion-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-accordion/',
  },
  {
    name: 'App Bar',
    srcLight: '/static/material-ui/react-components/appbar-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-app-bar/',
  },
  {
    name: 'Card',
    srcLight: '/static/material-ui/react-components/card-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-card/',
  },
  {
    name: 'Paper',
    srcLight: '/static/material-ui/react-components/paper-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-paper/',
  },
];

export default function MaterialSurfaceComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {surfaceComponents.map(({ name, link, srcLight, srcDark }) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={name}>
          <ComponentShowcaseCard link={link} name={name} srcLight={srcLight} srcDark={srcDark} />
        </Grid>
      ))}
    </Grid>
  );
}
