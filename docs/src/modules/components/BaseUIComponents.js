import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

function components() {
  return [
    {
      title: 'Autocomplete',
      srcLight: '/static/images/base-ui-components/autocomplete-light.png',
      srcDark: '/static/images/base-ui-components/autocomplete-dark.png',
      href: '/base/react-autocomplete/',
    },
    {
      title: 'Badge',
      srcLight: '/static/images/base-ui-components/badge-light.png',
      srcDark: '/static/images/base-ui-components/badge-dark.png',
      href: '/base/react-badge/',
    },
    {
      title: 'Button',
      srcLight: '/static/images/base-ui-components/button-light.png',
      srcDark: '/static/images/base-ui-components/button-dark.png',
      href: '/base/react-button/',
    },
    {
      title: 'Click-Away Listener',
      srcLight: '/static/images/base-ui-components/click-away-light.png',
      srcDark: '/static/images/base-ui-components/click-away-dark.png',
      href: '/base/react-click-away-listener/',
    },
    {
      title: 'Focus Trap',
      srcLight: '/static/images/base-ui-components/focus-trap-light.png',
      srcDark: '/static/images/base-ui-components/focus-trap-dark.png',
      href: '/base/react-focus-trap/',
    },
    {
      title: 'Form Control',
      srcLight: '/static/images/base-ui-components/form-control-light.png',
      srcDark: '/static/images/base-ui-components/form-control-dark.png',
      href: '/base/react-form-control/',
    },
    {
      title: 'Input',
      srcLight: '/static/images/base-ui-components/input-light.png',
      srcDark: '/static/images/base-ui-components/input-dark.png',
      href: '/base/react-input/',
    },
    {
      title: 'Menu',
      srcLight: '/static/images/base-ui-components/menu-light.png',
      srcDark: '/static/images/base-ui-components/menu-dark.png',
      href: '/base/react-menu/',
    },
    {
      title: 'Modal',
      srcLight: '/static/images/base-ui-components/modal-light.png',
      srcDark: '/static/images/base-ui-components/modal-dark.png',
      href: '/base/react-modal/',
    },
    {
      title: 'No-SSR',
      srcLight: '/static/images/base-ui-components/no-ssr-light.png',
      srcDark: '/static/images/base-ui-components/no-ssr-dark.png',
      href: '/base/react-no-ssr/',
    },
    {
      title: 'Popper',
      srcLight: '/static/images/base-ui-components/popper-light.png',
      srcDark: '/static/images/base-ui-components/popper-dark.png',
      href: '/base/react-popper/',
    },
    {
      title: 'Portal',
      srcLight: '/static/images/base-ui-components/portal-light.png',
      srcDark: '/static/images/base-ui-components/portal-dark.png',
      href: '/base/react-portal/',
    },
    {
      title: 'Select',
      srcLight: '/static/images/base-ui-components/select-light.png',
      srcDark: '/static/images/base-ui-components/select-dark.png',
      href: '/base/react-select/',
    },
    {
      title: 'Slider',
      srcLight: '/static/images/base-ui-components/slider-light.png',
      srcDark: '/static/images/base-ui-components/slider-dark.png',
      href: '/base/react-slider/',
    },
    {
      title: 'Snackbar',
      srcLight: '/static/images/base-ui-components/snackbar-light.png',
      srcDark: '/static/images/base-ui-components/snackbar-dark.png',
      href: '/base/react-snackbar/',
    },
    {
      title: 'Switch',
      srcLight: '/static/images/base-ui-components/switch-light.png',
      srcDark: '/static/images/base-ui-components/switch-dark.png',
      href: '/base/react-switch/',
    },
    {
      title: 'Table Pagination',
      srcLight: '/static/images/base-ui-components/pagination-light.png',
      srcDark: '/static/images/base-ui-components/pagination-dark.png',
      href: '/base/react-table-pagination/',
    },
    {
      title: 'Tabs',
      srcLight: '/static/images/base-ui-components/tabs-light.png',
      srcDark: '/static/images/base-ui-components/tabs-dark.png',
      href: '/base/react-tabs/',
    },
    {
      title: 'Textarea Autosize',
      srcLight: '/static/images/base-ui-components/textarea-light.png',
      srcDark: '/static/images/base-ui-components/textarea-dark.png',
      href: '/base/react-textarea-autosize/',
    },
  ];
}

function BaseUIComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
      {components().map((component) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={component.title}>
          <Card
            component="a"
            variant="outlined"
            rel="nofollow"
            target="_blank"
            href={component.href}
            sx={(theme) => ({
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 1,
              borderColor: 'divider',
              ...theme.applyDarkStyles({
                backgroundColor: `${alpha(theme.palette.primaryDark[700], 0.3)}`,
                borderColor: 'divider',
              }),
            })}
          >
            <CardMedia
              component="img"
              alt={component.title}
              image={component.srcLight}
              sx={(theme) => ({
                aspectRatio: '1125 / 645', // based on the image size
                background: `linear-gradient(180deg, ${alpha(
                  theme.palette.grey[50],
                  0.5,
                )} 20%, #FFF 100%)`,
                borderBottom: '1px solid',
                borderColor: 'divider',
                ...theme.applyDarkStyles({
                  content: `url(${component.srcDark})`,
                  background: `linear-gradient(180deg, ${alpha(
                    theme.palette.primaryDark[800],
                    0.5,
                  )} 20%, ${theme.palette.primaryDark[900]} 100%)`,
                  borderColor: 'divider',
                }),
              })}
            />
            <Typography component="h2" variant="body2" fontWeight={600} sx={{ px: 2, py: 1.5 }}>
              {component.title}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BaseUIComponents;
