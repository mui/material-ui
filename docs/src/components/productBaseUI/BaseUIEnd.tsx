import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CompareIcon from '@mui/icons-material/Compare';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha } from '@mui/material/styles';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';

export default function BaseUIEnd() {
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
            inverted
            overline="Community"
            title={
              <Typography variant="h2">
                Join our <GradientText>global community</GradientText>
              </Typography>
            }
            description={
              <React.Fragment>
                Base UI wouldn&apos;t be possible without our global community of contributors. Join
                us today to get help when you need it, and lend a hand when you can.
              </React.Fragment>
            }
          />
          <Button
            href={ROUTES.baseDocs}
            component={Link}
            noLinkStyle
            size="large"
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
            sx={{ mt: 2 }}
          >
            Get started
          </Button>
        </Grid>
        <Grid xs={12} sm={6}>
          <List sx={{ '& > li': { alignItems: 'flex-start' } }}>
            <ListItem sx={{ p: 0, mb: 4 }}>
              <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  mr: 2.5,
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'primary.200',
                  bgcolor: 'primary.50',
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                  ...theme.applyDarkStyles({
                    borderColor: 'primary.400',
                    bgcolor: 'primary.900',
                    boxShadow:
                      '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                  }),
                })}
              >
                <CompareIcon color="primary" />
              </Box>
              <div>
                <Typography sx={{ color: 'text.primary', mb: 0.75 }} fontWeight="500">
                  Base UI vs. Material UI
                </Typography>
                <Typography>
                  Base UI features many of the same components as Material UI, but without the
                  Material Design implementation.
                </Typography>
              </div>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  mr: 2.5,
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'primary.200',
                  bgcolor: 'primary.50',
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                  ...theme.applyDarkStyles({
                    borderColor: 'primary.400',
                    bgcolor: 'primary.900',
                    boxShadow:
                      '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                  }),
                })}
              >
                <StyleRoundedIcon color="primary" />
              </Box>
              <div>
                <Typography sx={{ color: 'text.primary', mb: 0.75 }} fontWeight="500">
                  Does it come with styles?
                </Typography>
                <Typography>
                  Base UI <i>is not packaged</i> with any default theme or built-in style engine.
                  This makes it a great choice if you need complete control over how your app&apos;s
                  CSS is implemented.
                </Typography>
              </div>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Section>
  );
}
