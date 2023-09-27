import * as React from 'react';
import Grid from '@mui/material/Grid';
import Section from 'docs/src/layouts/Section';
import InfoCard from 'docs/src/components/action/InfoCard';
import IconImage from 'docs/src/components/icon/IconImage';

// Note: All of the commented code will be put back in once logos for each Core product are done.

const content = [
  {
    icon: <IconImage height={30} width={28} name="product-material" />,
    title: 'Material UI',
    description: "An open-source React component library that implements Google's Material Design.",
    link: '/material-ui/',
  },
  {
    icon: <IconImage height={30} width={30} name="product-joy" />,
    title: 'Joy UI',
    description:
      "An easy to customize open-source React component library that implements MUI's own in-house design principles by default.",
    link: '/joy-ui/getting-started/',
  },
  {
    icon: <IconImage height={30} width={30} name="product-base" />,
    title: 'Base UI',
    description:
      "A library of unstyled React UI components and hooks. With Base UI, you gain complete control over your app's CSS and accessibility features.",
    link: '/base-ui/',
  },
];

export default function CoreProducts() {
  return (
    <Section cozy>
      <Grid container spacing={2}>
        {content.map(({ title, icon, description, link }) => (
          <Grid key={title} item xs={12} md={4}>
            <InfoCard title={title} icon={icon} description={description} link={link} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
