import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import InstallDesktopRoundedIcon from '@mui/icons-material/InstallDesktopRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';
import InfoCard from 'docs/src/components/action/InfoCard';

const content = [
  {
    title: 'Installation',
    description: 'Add Joy UI to your project with a few commands.',
    link: '/joy-ui/getting-started/installation/',
    icon: <InstallDesktopRoundedIcon color="primary" />,
  },
  {
    title: 'Usage',
    description: 'Learn the basics of working with Joy UI components.',
    link: '/joy-ui/getting-started/usage/',
    icon: <DrawRoundedIcon color="primary" />,
  },
  {
    title: 'Templates',
    description: 'Get started with our selection of free application templates.',
    link: 'joy-ui/getting-started/templates/',
    icon: <WebRoundedIcon color="primary" />,
  },
];

export default function JoyStartingLinksCollection() {
  return (
    <Grid container spacing={2}>
      {content.map(({ icon, title, description, link }) => (
        <Grid key={title} xs={12} sm={4}>
          <InfoCard link={link} title={title} icon={icon} description={description} />
        </Grid>
      ))}
    </Grid>
  );
}
