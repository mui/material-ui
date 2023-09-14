import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InstallDesktopRoundedIcon from '@mui/icons-material/InstallDesktopRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import Link from 'docs/src/modules/components/Link';

const content = [
  {
    title: 'Installation',
    description: 'Add Joy UI into your project with a few commands.',
    link: '/joy-ui/getting-started/installation/',
    icon: <InstallDesktopRoundedIcon color="primary" />,
  },
  {
    title: 'Usage',
    description: 'Learn the basics of working with Joy UI components.',
    link: '/joy-ui/getting-started/usage/',
    icon: <SettingsSuggestRoundedIcon color="primary" />,
  },
  {
    title: 'Templates',
    description: 'A selection of free application templates to get you started.',
    link: 'joy-ui/getting-started/templates/',
    icon: <DashboardRoundedIcon color="primary" />,
  },
];

export default function JoyStartingLinksCollection() {
  return (
    <Grid container spacing={2}>
      {content.map(({ icon, title, description, link }) => (
        <Grid key={title} xs={12} sm={4}>
          <Paper
            component={Link}
            href={link}
            noLinkStyle
            variant="outlined"
            sx={(theme) => ({
              p: 3,
              height: '100%',
              background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
              ...theme.applyDarkStyles({
                bgcolor: 'primaryDark.900',
                background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                borderColor: 'primaryDark.700',
              }),
            })}
          >
            <Box
              sx={(theme) => ({
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'primary.200',
                bgcolor: 'primary.50',
                boxShadow:
                  '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                ...theme.applyDarkStyles({
                  borderColor: 'primary.400',
                  bgcolor: 'primary.900',
                  boxShadow:
                    '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                }),
              })}
            >
              {icon}
            </Box>
            <Typography
              fontWeight="bold"
              component="h3"
              color="text.primary"
              variant="body2"
              mt={2}
              mb={0.5}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
