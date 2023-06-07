import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

function components() {
  return [
    {
      title: 'Autocomplete',
      description:
        'The Autocomplete component is a text input enhanced by a panel of suggested options.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/dashboard/',
    },
    {
      title: 'Badge',
      description:
        'The Badge component generates a small label that is attached to its child element.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sign-in/',
    },
    {
      title: 'Button',
      description: 'Buttons let users take actions and make choices with a single tap.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sign-in-side/',
    },
    {
      title: 'Click-Away Listener',
      description:
        'The Click-Away Listener component detects when a click event happens outside of its child element.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sign-up/',
    },
    {
      title: 'Focus Trap',
      description:
        'The Focus Trap component prevents the user&apos;s focus from escaping its children components.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/blog/',
    },
    {
      title: 'Form Control',
      description:
        'The Form Control component is a utility that lets you associate a form input with auxiliary components, such as labels, error indicators, or helper text.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/checkout/',
    },
    {
      title: 'Input',
      description: 'The Input component provides users with a field to enter and edit text.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/album/',
    },
    {
      title: 'Menu',
      description:
        'The Menu components provide your users with a list of options on temporary surfaces.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/pricing/',
    },
    {
      title: 'Modal',
      description:
        'The Modal component lets you create dialogs, popovers, lightboxes, and other elements that force the user to take action before continuing.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'No-SSR',
      description:
        'The No-SSR component defers the rendering of children components from the server to the client.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Popper',
      description:
        'The Popper component lets you create tooltips and popovers that display information about an element on the page.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Portal',
      description:
        'The Portal component lets you render its children into a DOM node that exists outside of the Portal&apos;s own DOM hierarchy.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Select',
      description:
        'The Select components let you create lists of options for users to choose from.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Slider',
      description:
        'A slider is a UI element that lets users select a single value or a range of values along a bar. ',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Snackbar',
      description:
        'The Snackbar component informs users that an action has been or will be performed by the app.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Switch',
      description:
        'Switches are UI elements that let users choose between two states—most commonly on/off.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Table Pagination',
      description:
        'Table Pagination is an interface tool for splitting up large amounts of data to make it easier for users to navigate.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Tabs',
      description:
        'Tabs are UI elements for organizing and navigating between groups of related content.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'Textarea Autosize',
      description:
        'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
    },
    {
      title: 'What more?',
      description:
        'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.',
      src: '/static/images/base-ui-components/slider.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
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
              gap: 1.5,
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
              image={component.src}
              sx={(theme) => ({
                height: '100%',
                background: `linear-gradient(180deg, ${theme.palette.grey[50]} 20%, #FFF 100%)`,
                color: 'divider',
                borderBottom: '1px solid',
                borderColor: 'divider',
                ...theme.applyDarkStyles({
                  background: `linear-gradient(180deg, ${theme.palette.primaryDark[800]} 20%, ${theme.palette.primaryDark[700]} 100%)`,
                  borderColor: 'grey.900',
                }),
              })}
            />
            <CardContent sx={{ flexGrow: 1, px: 2, py: 0.5 }}>
              <Typography component="h2" variant="body1" fontWeight={600} gutterBottom>
                {component.title}
              </Typography>
              <Typography component="p" variant="body2" color="text.secondary">
                {component.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BaseUIComponents;
