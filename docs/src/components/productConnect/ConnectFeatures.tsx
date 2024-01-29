import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import SvgMaterialDesign from 'docs/src/icons/SvgMaterialDesign';
import Frame from 'docs/src/components/action/Frame';
import MUIConnectSignUp from './MUIConnectSignUp';

const Image = styled('img')(({ theme }) => ({
  transition: '0.4s',
  display: 'block',
  height: 'auto',
  borderRadius: 6,
  border: '1px solid',
  borderColor: theme.palette.divider,
  filter: `drop-shadow(-2px 4px 6px ${alpha(theme.palette.grey[500], 0.5)})`,
  ...theme.applyDarkStyles({
    filter: `drop-shadow(-2px 4px 6px ${alpha(theme.palette.common.black, 0.2)})`,
    borderColor: theme.palette.primaryDark[600],
  }),
}));

export default function ConnectFeatures() {
  const [customized, setCustomized] = React.useState(true);
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Theming"
            title={
              <Typography variant="h2">
                Build <GradientText>your design system</GradientText> just as you want it to be
              </Typography>
            }
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <Group sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
            <Highlighter disableBorder selected={customized} onClick={() => setCustomized(true)}>
              <Item
                icon={<AutoAwesomeRounded color="warning" />}
                title="Feature 1"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
            </Highlighter>
            <Highlighter disableBorder selected={!customized} onClick={() => setCustomized(false)}>
              <Item
                icon={<SvgMaterialDesign />}
                title="Feature 2"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame>
            <Frame.Demo
              sx={{
                overflow: 'hidden',
                height: { xs: 240, sm: 390 },
                perspective: '1000px',
              }}
            >
              <Fade in={!customized} timeout={500}>
                <Box
                  sx={(theme) => ({
                    width: '100%',
                    height: '100%',
                    '& img': {
                      position: 'absolute',
                      '&:nth-of-type(1)': {
                        visibility: { xs: 'hidden', sm: 'visible' },
                        width: { xs: 240, sm: 600 },
                        top: 100,
                        left: '50%',
                        transform: 'translate(-40%)',
                      },
                      '&:nth-of-type(2)': {
                        width: { xs: 240, sm: 350 },
                        top: { xs: 130, sm: 40 },
                        left: { xs: '55%', sm: '40%' },
                        transform: {
                          xs: 'scale(1.8) translate(-20%)',
                          sm: 'scale(1) translate(0%)',
                        },
                      },
                    },
                    '&:hover': {
                      '& img': {
                        '&:nth-of-type(2)': {
                          top: { xs: 130, sm: 140 },
                          transform: {
                            xs: 'scale(1.8) translate(-20%)',
                            sm: 'scale(1.5) translate(-10%)',
                          },
                          filter: {
                            xs: 'auto',
                            sm: `drop-shadow(-16px 12px 20px ${alpha(
                              theme.palette.grey[600],
                              0.5,
                            )})`,
                          },
                        },
                      },
                    },
                    ...theme.applyDarkStyles({
                      '&:hover': {
                        '& img': {
                          '&:nth-of-type(2)': {
                            filter: {
                              xs: 'auto',
                              sm: `drop-shadow(-16px 12px 20px ${alpha(
                                theme.palette.common.black,
                                0.8,
                              )})`,
                            },
                          },
                          filter: `drop-shadow(-16px 12px 20px ${alpha(
                            theme.palette.common.black,
                            0.2,
                          )})`,
                        },
                      },
                    }),
                  })}
                >
                  <Image
                    src={`/static/branding/design-kits/connect-plug-in-figma-light.jpg`}
                    alt="Screenshot of Figma displaying the Material UI Design kit"
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/connect-plug-in-figma-dark.jpg)`,
                      })
                    }
                  />
                  <Image
                    src={`/static/branding/design-kits/connect-plug-in-light.jpg`}
                    alt=""
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/connect-plug-in-dark.jpg)`,
                      })
                    }
                  />
                </Box>
              </Fade>
            </Frame.Demo>
            <Frame.Info data-mui-color-scheme="dark">
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  Want to try Connect out?
                </Typography>
                <Chip label="Beta release" size="small" color="primary" variant="outlined" />
              </Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Add your email if you want to be notified when the Connect beta version becomes
                available for testing in the Figma community.
              </Typography>
              <MUIConnectSignUp />
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
