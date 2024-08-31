import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Link } from '@mui/docs/Link';

function components() {
  return [
    {
      title: 'Autocomplete',
      srcLight: '/static/base-ui/react-components/autocomplete-light.png',
      srcDark: '/static/base-ui/react-components/autocomplete-dark.png',
      href: '/base-ui/react-autocomplete/',
    },
    {
      title: 'Badge',
      srcLight: '/static/base-ui/react-components/badge-light.png',
      srcDark: '/static/base-ui/react-components/badge-dark.png',
      href: '/base-ui/react-badge/',
    },
    {
      title: 'Button',
      srcLight: '/static/base-ui/react-components/button-light.png',
      srcDark: '/static/base-ui/react-components/button-dark.png',
      href: '/base-ui/react-button/',
    },
    {
      title: 'Click-Away Listener',
      srcLight: '/static/base-ui/react-components/click-away-light.png',
      srcDark: '/static/base-ui/react-components/click-away-dark.png',
      href: '/base-ui/react-click-away-listener/',
    },
    {
      title: 'Focus Trap',
      srcLight: '/static/base-ui/react-components/focus-trap-light.png',
      srcDark: '/static/base-ui/react-components/focus-trap-dark.png',
      href: '/base-ui/react-focus-trap/',
    },
    {
      title: 'Form Control',
      srcLight: '/static/base-ui/react-components/form-control-light.png',
      srcDark: '/static/base-ui/react-components/form-control-dark.png',
      href: '/base-ui/react-form-control/',
    },
    {
      title: 'Input',
      srcLight: '/static/base-ui/react-components/input-light.png',
      srcDark: '/static/base-ui/react-components/input-dark.png',
      href: '/base-ui/react-input/',
    },
    {
      title: 'Menu',
      srcLight: '/static/base-ui/react-components/menu-light.png',
      srcDark: '/static/base-ui/react-components/menu-dark.png',
      href: '/base-ui/react-menu/',
    },
    {
      title: 'Modal',
      srcLight: '/static/base-ui/react-components/modal-light.png',
      srcDark: '/static/base-ui/react-components/modal-dark.png',
      href: '/base-ui/react-modal/',
    },
    {
      title: 'No-SSR',
      srcLight: '/static/base-ui/react-components/no-ssr-light.png',
      srcDark: '/static/base-ui/react-components/no-ssr-dark.png',
      href: '/base-ui/react-no-ssr/',
    },
    {
      title: 'Number Input',
      srcLight: '/static/base-ui/react-components/number-input-light.png',
      srcDark: '/static/base-ui/react-components/number-input-dark.png',
      href: '/base-ui/react-number-input/',
    },
    {
      title: 'Popper',
      srcLight: '/static/base-ui/react-components/popper-light.png',
      srcDark: '/static/base-ui/react-components/popper-dark.png',
      href: '/base-ui/react-popper/',
    },
    {
      title: 'Portal',
      srcLight: '/static/base-ui/react-components/portal-light.png',
      srcDark: '/static/base-ui/react-components/portal-dark.png',
      href: '/base-ui/react-portal/',
    },
    {
      title: 'Select',
      srcLight: '/static/base-ui/react-components/select-light.png',
      srcDark: '/static/base-ui/react-components/select-dark.png',
      href: '/base-ui/react-select/',
    },
    {
      title: 'Slider',
      srcLight: '/static/base-ui/react-components/slider-light.png',
      srcDark: '/static/base-ui/react-components/slider-dark.png',
      href: '/base-ui/react-slider/',
    },
    {
      title: 'Snackbar',
      srcLight: '/static/base-ui/react-components/snackbar-light.png',
      srcDark: '/static/base-ui/react-components/snackbar-dark.png',
      href: '/base-ui/react-snackbar/',
    },
    {
      title: 'Switch',
      srcLight: '/static/base-ui/react-components/switch-light.png',
      srcDark: '/static/base-ui/react-components/switch-dark.png',
      href: '/base-ui/react-switch/',
    },
    {
      title: 'Table Pagination',
      srcLight: '/static/base-ui/react-components/pagination-light.png',
      srcDark: '/static/base-ui/react-components/pagination-dark.png',
      href: '/base-ui/react-table-pagination/',
    },
    {
      title: 'Tabs',
      srcLight: '/static/base-ui/react-components/tabs-light.png',
      srcDark: '/static/base-ui/react-components/tabs-dark.png',
      href: '/base-ui/react-tabs/',
    },
    {
      title: 'Textarea Autosize',
      srcLight: '/static/base-ui/react-components/textarea-light.png',
      srcDark: '/static/base-ui/react-components/textarea-dark.png',
      href: '/base-ui/react-textarea-autosize/',
    },
  ];
}

export default function BaseUIComponents() {
  // Fix overloading with prefetch={false}, only prefetch on hover.
  return (
    <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
      {components().map((component, index) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={component.title}>
          <Card
            component={Link}
            noLinkStyle
            prefetch={false}
            variant="outlined"
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
              alt=""
              loading={index <= 5 ? 'eager' : 'lazy'}
              image={component.srcLight}
              sx={(theme) => ({
                aspectRatio: '16 / 9',
                background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                borderBottom: '1px solid',
                borderColor: 'divider',
                ...theme.applyDarkStyles({
                  content: `url(${component.srcDark})`,
                  background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                  borderColor: 'divider',
                }),
              })}
            />
            <Typography
              component="h2"
              variant="body2"
              sx={{ fontWeight: 'semiBold', px: 2, py: 1.5 }}
            >
              {component.title}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
