import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ComponentShowcaseCard from 'docs/src/components/action/ComponentShowcaseCard';

const feedbackComponents = [
  {
    name: 'Alert',
    srcLight: '/static/material-ui/react-components/alert-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-alert/',
  },
  {
    name: 'Backdrop',
    srcLight: '/static/material-ui/react-components/backdrop-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-backdrop/',
  },
  {
    name: 'Dialog',
    srcLight: '/static/material-ui/react-components/dialog-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-dialog/',
  },
  {
    name: 'Progress',
    srcLight: '/static/material-ui/react-components/progress-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-progress/',
  },
  {
    name: 'Skeleton',
    srcLight: '/static/material-ui/react-components/skeleton-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-skeleton/',
  },
  {
    name: 'Snackbar',
    srcLight: '/static/material-ui/react-components/snackbar-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-snackbar/',
  },
];

export default function MaterialFeedbackComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {feedbackComponents.map(({ name, link, srcLight, srcDark }) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={name}>
          <ComponentShowcaseCard link={link} name={name} srcLight={srcLight} srcDark={srcDark} />
        </Grid>
      ))}
    </Grid>
  );
}
