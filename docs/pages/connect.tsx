import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
// import MUIConnectSignUp from 'docs/src/components/productConnect/MUIConnectSignUp';
import InfoCard from 'docs/src/components/action/InfoCard';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import PhishingRoundedIcon from '@mui/icons-material/PhishingRounded';

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  transition: '0.4s',
  display: 'block',
  height: 'auto',
  borderRadius: 0,
  border: '1px solid',
  borderColor: alpha(theme.palette.primary[100], 0.8),
  filter: `drop-shadow(-2px 4px 6px ${alpha(theme.palette.primary[200], 0.5)})`,
  overflow: 'clip',
  backgroundClip: 'padding-box',
  [theme.breakpoints.up('sm')]: {
    borderRadius: 10,
  },
  ...theme.applyDarkStyles({
    borderColor: theme.palette.primaryDark[600],
    filter: `drop-shadow(-2px 6px 24px ${alpha(theme.palette.primary[900], 0.8)})`,
  }),
}));

const content = [
  {
    icon: <StyleRoundedIcon color="primary" />,
    title: 'Lorem ipsum dolor',
    description:
      'Maecenas molestie blandit ligula, non suscipit est. Proin luctus venenatis fermentum.',
  },
  {
    icon: <PhishingRoundedIcon color="primary" />,
    title: 'Lorem ipsum dolor',
    description:
      'Maecenas molestie blandit ligula, non suscipit est. Proin luctus venenatis fermentum.',
  },
  {
    icon: <AccessibilityNewRounded color="primary" />,
    title: 'Lorem ipsum dolor',
    description:
      'Maecenas molestie blandit ligula, non suscipit est. Proin luctus venenatis fermentum.',
  },
];

export default function Connect() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Connect: A Figma plug-in that exports a Material UI theme"
        description="A Figma plug-in that exports a Material UI theme object."
        card="/static/social-previews/connect-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/mui-design-kits" />
      <main id="main-content">
        <Section bg="gradient">
          <SectionHeadline
            alwaysCenter
            overline={<Chip label="Beta release" size="small" color="primary" variant="outlined" />}
            title={
              <Typography variant="h2" component="h1">
                <GradientText>Bridge the gap</GradientText> between Figma and your codebase
              </Typography>
            }
            description="Connect is a Figma plug-in that lets you bring Material UI component customizations done in Figma to your codebase."
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GetStartedButtons
              primaryLabel="Get it at the Figma Community"
              primaryUrl="/connect/"
            />
          </Box>
        </Section>
        <Divider />
        <Box
          sx={{
            maxWidth: 1300,
            mx: 'auto',
            mt: { xs: 0, sm: '-80px' },
            mb: '-16px',
            px: { xs: 0, sm: 2 },
          }}
        >
          <Image src="/static/branding/design-kits/connect-plug-in-figma-light.jpg" />
        </Box>
        <Section cozy>
          <Grid container spacing={3}>
            {content.map(({ icon, title, description }) => (
              <Grid key={title} item xs={12} md={4}>
                <InfoCard title={title} icon={icon} description={description} />
              </Grid>
            ))}
          </Grid>
        </Section>
        <Divider />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/material-ui" />
    </BrandingCssVarsProvider>
  );
}
