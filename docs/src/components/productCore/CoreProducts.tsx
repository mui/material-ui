import * as React from 'react';
import Grid from '@mui/material/Grid';
import Section from 'docs/src/layouts/Section';
import InfoCard from 'docs/src/components/action/InfoCard';

// Note: All of the commented code will be put back in once logos for each Core product are done.

const content = [
  {
    // icon:
    title: 'Material UI',
    description: "An open-source React component library that implements Google's Material Design.",
    link: '/material-ui/',
  },
  {
    // icon:
    title: 'Joy UI',
    description:
      "An easy to customize open-source React component library that implements MUI's own in-house design principles by default.",
    link: '/joy-ui/getting-started/',
  },
  {
    // icon:
    title: 'Base UI',
    description:
      "A library of unstyled React UI components and hooks. With Base UI, you gain complete control over your app's CSS and accessibility features.",
    link: '/base-ui/',
  },
  {
    // icon:
    title: 'MUI System',
    description: 'A set of CSS utilities to help you build custom designs more efficiently.',
    link: '/system/getting-started/',
  },
];

export default function CoreProducts() {
  return (
    <Section cozy>
      <Grid container spacing={2}>
        {content.map(({ title, description, link }) => (
          <Grid key={title} item xs={12} md={6}>
            <InfoCard link={link} title={title} description={description} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
