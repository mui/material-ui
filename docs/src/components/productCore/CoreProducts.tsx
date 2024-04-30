import * as React from 'react';
import Grid from '@mui/material/Grid';
import Section from 'docs/src/layouts/Section';
import { InfoCard } from '@mui/docs/InfoCard';

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
      "An open-source React component library that implements MUI's own in-house design principles.",
    link: '/joy-ui/getting-started/',
  },
  {
    // icon:
    title: 'Base UI',
    description:
      "A library of unstyled React components and low-level hooks. With Base UI, you gain complete control over your app's CSS and accessibility features.",
    link: '/base-ui/',
  },
  {
    // icon:
    title: 'MUI System',
    description:
      'A set of CSS utilities to help you build custom designs more efficiently. It makes it possible to rapidly lay out custom designs.',
    link: '/system/getting-started/',
  },
];

export default function CoreProducts() {
  return (
    <Section cozy>
      <Grid container spacing={2}>
        {content.map(({ title, description, link }) => (
          <Grid key={title} item xs={12} md={6}>
            <InfoCard
              link={link}
              title={title}
              description={description}
              titleProps={{
                component: 'h2',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
