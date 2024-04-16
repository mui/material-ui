import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Palette from '@mui/icons-material/Palette';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import CodeRounded from '@mui/icons-material/CodeRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import Section from 'docs/src/layouts/Section';
import { InfoCard } from '@mui/docs/InfoCard';

const content = [
  {
    icon: <Palette fontSize="small" color="primary" />,
    title: 'For designers',
    description:
      'Save time getting the Material UI components all setup, leveraging the latest features from your favorite design tool.',
  },
  {
    icon: <LibraryBooks fontSize="small" color="primary" />,
    title: 'For product managers',
    description:
      'Quickly put together ideas and high-fidelity mockups/prototypes using components from your actual product.',
  },
  {
    icon: <CodeRounded fontSize="small" color="primary" />,
    title: 'For developers',
    description:
      'Effortlessly communicate with designers using the same language around the MUI Core components props and variants.',
  },
];

function DesignKitValues() {
  return (
    <Section>
      <Typography variant="body2" color="primary" fontWeight="bold">
        Collaboration
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
        Be more efficient <GradientText>designing and developing</GradientText> with the same
        library
      </Typography>
      <Grid container spacing={3}>
        {content.map(({ icon, title, description }) => (
          <Grid key={title} xs={12} sm={6} md={4}>
            <InfoCard title={title} icon={icon} description={description} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

export default DesignKitValues;
