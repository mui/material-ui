import React from 'react';
import BrandingProvider from 'docs/src/BrandingProvider';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeader from 'docs/src/layouts/AppHeader';
import Head from 'docs/src/modules/components/Head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import { createTheme, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import SvgMaterialDesign from 'docs/src/icons/SvgMaterialDesign';
import Frame from 'docs/src/components/action/Frame';
import PlayerCard from 'docs/src/components/showcase/PlayerCard';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

const lightTheme = createTheme();
const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function LearnPage({ to = ROUTES.documentation, ...props }) {
  const [customized, setCustomized] = React.useState(true);
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  return (
    <BrandingProvider>
      <Head
        title="About us - MUI"
        description="MUI (formerly Material-UI) started back in 2014 to unify React and Material Design. Today, MUI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <AppHeader />
      <main>
        <React.Fragment>
          <Container>
            <Box
              sx={{
                height: '40vh',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 600,
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" color="primary.600" fontWeight="bold">
                Learn
              </Typography>
              <Typography component="h1" variant="h2" sx={{ my: 1 }}>
                MUI for <GradientText>Beginners</GradientText>
              </Typography>
              <Typography
                color="text.secondary"
                textAlign="center"
                sx={{
                  maxWidth: { md: 500 },
                  minHeight: 48, // a hack to reduce CLS (layout shift)
                }}
              >
                Learn the basics of MUI and how to quickly build a great looking UI.
              </Typography>
              <Button
                href={to}
                component={Link}
                noLinkStyle
                size="large"
                variant="contained"
                endIcon={<KeyboardArrowRightRounded />}
                sx={{ width: { xs: '100%', md: '50%' } }}
              >
                Start now
              </Button>
            </Box>
          </Container>
        </React.Fragment>
        <Section bg="gradient">
          <Grid container spacing={2}>
            <Grid item md={6} sx={{ minWidth: 0 }}>
              <Box maxWidth={500}>
                <SectionHeadline
                  overline="Course overview"
                  title={
                    <Typography variant="h2">
                      <GradientText>Learn by building</GradientText> a simple sign in UI
                    </Typography>
                  }
                  description="We'll walk you through the basics of the library while we build a simple, common use, sign UI. You'll learn how to make it following Material Design or a custom design:"
                />
              </Box>
              <Group sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
                <Highlighter
                  disableBorder
                  selected={customized}
                  onClick={() => setCustomized(true)}
                >
                  <Item
                    icon={<AutoAwesomeRounded color="warning" />}
                    title="Custom Theme"
                    description="Theming allows you to use your brand's design tokens, easily making the components reflect its look and feel."
                  />
                </Highlighter>
                <Highlighter
                  disableBorder
                  selected={!customized}
                  onClick={() => setCustomized(false)}
                >
                  <Item
                    icon={<SvgMaterialDesign />}
                    title="Material Design"
                    description="Every component comes with Google's tried and tested design system ready for use."
                  />
                </Highlighter>
              </Group>
            </Grid>
            <Grid item xs={12} md={6}>
              <Frame sx={{ height: '100%' }}>
                <Frame.Demo
                  sx={{
                    py: 2,
                    px: 2,
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 188,
                  }}
                >
                  <PlayerCard
                    {...(!customized && { theme: mode === 'dark' ? darkTheme : lightTheme })}
                  />
                </Frame.Demo>
                <Frame.Info sx={{ maxHeight: 300, overflow: 'auto' }}></Frame.Info>
              </Frame>
            </Grid>
          </Grid>
        </Section>
        <Divider />
      </main>
      <AppFooter />
    </BrandingProvider>
  );
}
