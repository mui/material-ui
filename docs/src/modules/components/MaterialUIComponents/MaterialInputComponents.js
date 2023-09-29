import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ComponentShowcaseCard from 'docs/src/components/action/ComponentShowcaseCard';

const inputComponents = [
  {
    name: 'Autocomplete',
    srcLight: '/static/material-ui/react-components/autocomplete-light.png',
    srcDark: '/static/material-ui/react-components/autocomplete-dark.png',
    link: '/material-ui/react-autocomplete/',
  },
  {
    name: 'Button',
    srcLight: '/static/material-ui/react-components/button-light.png',
    srcDark: '/static/material-ui/react-components/badge-dark.png',
    link: '/material-ui/react-button/',
  },
  {
    name: 'Button Group',
    srcLight: '/static/material-ui/react-components/button-group-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-button-group/',
  },
  {
    name: 'Checkbox',
    srcLight: '/static/material-ui/react-components/checkbox-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-checkbox/',
  },
  {
    name: 'Floating Action Button',
    srcLight: '/static/material-ui/react-components/fab-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-floating-action-button/',
  },
  {
    name: 'Radio Group',
    srcLight: '/static/material-ui/react-components/radio-group-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-radio-group/',
  },
  {
    name: 'Rating',
    srcLight: '/static/material-ui/react-components/rating-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-rating/',
  },
  {
    name: 'Select',
    srcLight: '/static/material-ui/react-components/select-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-select/',
  },
  {
    name: 'Slider',
    srcLight: '/static/material-ui/react-components/slider-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-slider/',
  },
  {
    name: 'Switch',
    srcLight: '/static/material-ui/react-components/switch-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-switch/',
  },
  {
    name: 'Text Field',
    srcLight: '/static/material-ui/react-components/text-field-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-text-field/',
  },
  {
    name: 'Transfer List',
    srcLight: '/static/material-ui/react-components/transfer-list-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-transfer-list/',
  },
  {
    name: 'Toggle Button',
    srcLight: '/static/material-ui/react-components/toggle-button-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-toggle-button/',
  },
];

export default function MaterialInputComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {inputComponents.map(({ name, link, srcLight, srcDark }) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={name}>
          <ComponentShowcaseCard link={link} name={name} srcLight={srcLight} srcDark={srcDark} />
        </Grid>
      ))}
    </Grid>
  );
}
