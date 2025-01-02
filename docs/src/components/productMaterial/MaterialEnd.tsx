import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CompareIcon from '@mui/icons-material/Compare';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import { GlowingIconContainer } from '@mui/docs/InfoCard';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { Link } from '@mui/docs/Link';
import ROUTES from 'docs/src/route';

interface MaterialEndProps {
  noFaq?: boolean;
}

export default function MaterialEnd({ noFaq }: MaterialEndProps) {
  return (
    <Section
      cozy
      data-mui-color-scheme="dark"
      sx={{
        color: 'text.secondary',
        background: (theme) =>
          `linear-gradient(180deg, ${(theme.vars || theme).palette.primaryDark[900]} 50%, 
          ${alpha(theme.palette.primary[800], 0.2)} 100%), ${
            (theme.vars || theme).palette.primaryDark[900]
          }`,
      }}
    >
      {noFaq ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionHeadline
            alwaysCenter
            overline="Community"
            title={
              <Typography variant="h2">
                Join our <GradientText>global community</GradientText>
              </Typography>
            }
            description={
              <React.Fragment>
                Material UI wouldn&apos;t be possible without our global community of contributors.
                Join us today to get help when you need it, and lend a hand when you can.
              </React.Fragment>
            }
          />
          <GetStartedButtons
            primaryUrl={ROUTES.materialDocs}
            secondaryLabel="View templates"
            secondaryUrl={ROUTES.freeTemplates}
            altInstallation="npm install @mui/material @emotion/react @emotion/styled"
          />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 6, sm: 10 }} alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <SectionHeadline
              overline="Community"
              title={
                <Typography variant="h2">
                  Join our <GradientText>global community</GradientText>
                </Typography>
              }
              description={
                <React.Fragment>
                  Material UI wouldn&apos;t be possible without our global community of
                  contributors. Join us today to get help when you need it, and lend a hand when you
                  can.
                </React.Fragment>
              }
            />
            <GetStartedButtons
              primaryUrl={ROUTES.materialDocs}
              secondaryLabel="View templates"
              secondaryUrl={ROUTES.freeTemplates}
              altInstallation="npm install @mui/material @emotion/react @emotion/styled"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <List sx={{ '& > li': { alignItems: 'flex-start' } }}>
              <ListItem sx={{ p: 0, mb: 4, gap: 2.5 }}>
                <GlowingIconContainer icon={<CompareIcon color="primary" />} />
                <div>
                  <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
                    Material UI vs. Base UI
                  </Typography>
                  <Typography>
                    Material UI implements Google&apos;s Material Design whereas Base UI features
                    many of the same components, but without the Material Design implementation.
                  </Typography>
                </div>
              </ListItem>
              <ListItem sx={{ p: 0, gap: 2.5 }}>
                <GlowingIconContainer icon={<StyleRoundedIcon color="primary" />} />
                <div>
                  <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
                    Does it support Material Design 3?
                  </Typography>
                  <Typography>
                    The adoption of Material Design 3 is tentatively planned for Material UI v7. See
                    the{' '}
                    <Link href="https://mui.com/versions/#release-schedule">
                      the release schedule
                    </Link>{' '}
                    and follow{' '}
                    <Link href="https://github.com/mui/material-ui/issues/29345">
                      this GitHub issue
                    </Link>{' '}
                    for future updates.
                  </Typography>
                </div>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Section>
  );
}
