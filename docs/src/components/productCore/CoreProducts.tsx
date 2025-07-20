import * as React from 'react';
import Grid from '@mui/material/Grid';
import Section from 'docs/src/layouts/Section';
import { InfoCard } from '@mui/docs/InfoCard';
import { Theme } from '@mui/material/styles';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';

const iconStyles = (theme: Theme) => ({
  fontSize: '.875rem',
  color: (theme.vars || theme).palette.primary.main,
});

const logoColor = (theme: Theme) => ({
  '& path': {
    ...theme.applyDarkStyles({
      fill: (theme.vars || theme).palette.primary[400],
    }),
  },
});

const content = [
  {
    icon: <SvgMuiLogomark width={14} height={14} sx={logoColor} />,
    title: 'Material UI',
    description: "An open-source React component library that implements Google's Material Design.",
    link: '/material-ui/',
  },
  {
    icon: <WebRoundedIcon sx={iconStyles} />,
    title: 'Joy UI',
    description:
      "An open-source React component library that implements MUI's own in-house design principles.",
    link: '/joy-ui/getting-started/',
  },
  {
    icon: <StyleRoundedIcon sx={iconStyles} />,
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
        {content.map(({ icon, title, description, link }) => (
          <Grid key={title} size={{ xs: 12, md: 4 }}>
            <InfoCard
              icon={icon}
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
