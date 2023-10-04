import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CompareIcon from '@mui/icons-material/Compare';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import GradientText from 'docs/src/components/typography/GradientText';
import { GlowingIconContainer } from 'docs/src/components/action/InfoCard';
import ROUTES from 'docs/src/route';

export default function JoyUIEnd() {
  return (
    <Section
      data-mui-color-scheme="dark"
      sx={{
        color: 'text.secondary',
        background: (theme) =>
          `linear-gradient(180deg, ${(theme.vars || theme).palette.primaryDark[800]} 50%, 
          ${alpha(theme.palette.primary[800], 0.2)} 100%), ${
            (theme.vars || theme).palette.primaryDark[800]
          }`,
      }}
    >
      <Grid container spacing={{ xs: 6, sm: 10 }} alignItems="center">
        <Grid xs={12} sm={6}>
          <SectionHeadline
            overline="Community"
            title={
              <Typography variant="h2">
                Join our <GradientText>global community</GradientText>
              </Typography>
            }
            description={
              <React.Fragment>
                Joy UI wouldn&apos;t be possible without our global community of contributors. Join
                us today to get help when you need it, and lend a hand when you can.
              </React.Fragment>
            }
          />
          <GetStartedButtons
            primaryUrl={ROUTES.joyDocs}
            secondaryLabel="Learn Joy UI"
            secondaryUrl={ROUTES.joyTutorial}
            altInstallation="npm install @mui/joy @emotion/react @emotion/styled"
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <List sx={{ '& > li': { alignItems: 'flex-start' } }}>
            <ListItem sx={{ p: 0, mb: 4, gap: 2.5 }}>
              <GlowingIconContainer icon={<CompareIcon color="primary" />} />
              <div>
                <Typography sx={{ color: 'text.primary', mb: 0.5 }} fontWeight="semiBold">
                  Joy UI vs. Material UI
                </Typography>
                <Typography>
                  Joy UI is intended to serve as an alternative to Material UI for designs that{' '}
                  <i>don&apos;t</i> adhere to Material Design.
                </Typography>
              </div>
            </ListItem>
            <ListItem sx={{ p: 0, gap: 2.5 }}>
              <GlowingIconContainer icon={<StyleRoundedIcon color="primary" />} />
              <div>
                <Typography sx={{ color: 'text.primary', mb: 0.5 }} fontWeight="semiBold">
                  Which design language is it based on?
                </Typography>
                <Typography>
                  Joy UI is baked in with a minimalistic, subtly opinionated, default theme designed
                  by the MUI team.
                </Typography>
              </div>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Section>
  );
}
