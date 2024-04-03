import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import ConnectFeatures from 'docs/src/components/productConnect/ConnectFeatures';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  transition: '0.4s',
  display: 'block',
  height: 'auto',
  borderRadius: 0,
  border: 'none',
  filter: `drop-shadow(-2px 4px 12px ${alpha(theme.palette.primary[200], 0.3)})`,
  overflow: 'clip',
  backgroundClip: 'padding-box',
  [theme.breakpoints.up('sm')]: {
    borderRadius: 12,
    border: '1px solid',
    borderColor: alpha(theme.palette.primary[100], 0.8),
  },
  ...theme.applyDarkStyles({
    borderColor: theme.palette.primaryDark[600],
    filter: `drop-shadow(-2px 4px 12px ${alpha(theme.palette.primary[900], 0.8)})`,
  }),
}));

export default function Connect() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Connect: A Figma plugin that exports complete Material UI themes"
        description="Connect is a Figma plugin that exports complete Material UI themes."
        card="/static/social-previews/connect-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/mui-design-kits" />
      <main id="main-content">
        <Section bg="gradient">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'auto', sm: 'center' },
            }}
          >
            <SectionHeadline
              alwaysCenter
              overline={
                <Chip label="Beta release" size="small" color="primary" variant="outlined" />
              }
              title={
                <Typography variant="h2" component="h1">
                  <GradientText>Bridge the gap</GradientText> between design and code
                </Typography>
              }
              description="Connect is a Figma plugin that exports complete Material UI themes directly from design to code."
            />
            <GetStartedButtons
              primaryLabel="Use Connect now"
              primaryUrl="https://www.figma.com/community/plugin/1336346114713490235/connect"
              secondaryLabel="View docs"
              secondaryUrl="/connect/" // I'll swap it later to /material-ui/design-resources/connect/ once that's merged
            />
          </Box>
        </Section>
        <Divider />
        <Box
          sx={{
            maxWidth: 1300,
            mx: 'auto',
            mt: { xs: 0, sm: '-46px' },
            px: { xs: 0, sm: 2 },
            pb: { xs: 4, sm: 8 },
          }}
        >
          <Image src="/static/branding/design-kits/connect-plug-in-figma-light.jpg" />
          {/* we'll likely replace this image with a video before merging */}
        </Box>
        <ConnectFeatures />
        <Divider />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/material-ui" />
    </BrandingCssVarsProvider>
  );
}
