import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import FormatShapesRoundedIcon from '@mui/icons-material/FormatShapesRounded';
import SvgStorybook from 'docs/src/icons/SvgStorybook';
import ImagesearchRollerRoundedIcon from '@mui/icons-material/ImagesearchRollerRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
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
  const [index, setIndex] = React.useState(0);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Available in Beta"
            title={
              <Typography variant="h2">
                The way developers and designers <GradientText>ship faster</GradientText>
              </Typography>
            }
            description="Connect is perfect for teams of developers and designers building with the Material UI React library and design kit."
          />
          <Group sx={{ m: -2, p: 2 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<ImagesearchRollerRoundedIcon color="success" />}
                title="Customize your design tokens"
                description="Change your colors, typography styles, shadows, spacing values, and border-radius through Figma's variables panel. Then, quickly generate a theme with these changes."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<FormatShapesRoundedIcon color="primary" />}
                title="Redesign your components"
                description="Want to make your primary button fully rounded and with lowercase text? Use Connect to output code for custom component styles."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<SvgStorybook />}
                title="Preview your changes on Storybook"
                description="All of the changes you run through the Connect plugin can also be visualized on a built-in Storybook preview instance."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                overflow: 'hidden',
                height: { xs: 240, sm: '100%' },
                perspective: '1000px',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  '& img': {
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                  },
                }}
              >
                {index === 0 && (
                  <Fade in={index === 0} timeout={500}>
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
                            width: { xs: 240, sm: 560 },
                            top: { xs: 100, sm: 40 },
                            left: { xs: '52%', sm: '40%' },
                            transform: {
                              xs: 'scale(1.8) translate(-20%)',
                              sm: 'scale(1) translate(0%)',
                            },
                          },
                        },
                        '&:hover': {
                          '& img': {
                            '&:nth-of-type(2)': {
                              top: { xs: 100, sm: 60 },
                              transform: {
                                xs: 'scale(1.8) translate(-20%)',
                                sm: 'scale(1.1) translate(-15%)',
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
                        src={`/static/branding/design-kits/connect-page-base1-light.png`}
                        alt="Screenshot of Figma displaying the Material UI Design kit"
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/connect-page-base1-dark.png)`,
                          })
                        }
                      />
                      <Image
                        src={`/static/branding/design-kits/connect-shot1-light.png`}
                        alt="Screenshot of the Connect plugin"
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/connect-shot1-dark.png)`,
                          })
                        }
                      />
                    </Box>
                  </Fade>
                )}
                {index === 1 && (
                  <Fade in={index === 1} timeout={500}>
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
                            width: { xs: 240, sm: 560 },
                            top: { xs: 100, sm: 40 },
                            left: { xs: '52%', sm: '60%' },
                            transform: {
                              xs: 'scale(1.8) translate(-20%)',
                              sm: 'none',
                            },
                          },
                        },
                        '&:hover': {
                          '& img': {
                            '&:nth-of-type(2)': {
                              top: { xs: 100, sm: 60 },
                              transform: {
                                xs: 'scale(1.8) translate(-20%)',
                                sm: 'scale(1.1) translate(-30%)',
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
                        src={`/static/branding/design-kits/connect-page-base2-light.png`}
                        alt="Screenshot of Figma displaying the Material UI Design kit"
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/connect-page-base2-dark.png)`,
                          })
                        }
                      />
                      <Image
                        src={`/static/branding/design-kits/connect-shot2-light.png`}
                        alt="Screenshot of the Connect plugin"
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/connect-shot2-dark.png)`,
                          })
                        }
                      />
                    </Box>
                  </Fade>
                )}
                {index === 2 && (
                  <Fade in={index === 2} timeout={500}>
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
                            width: { xs: 240, sm: 560 },
                            top: { xs: 100, sm: 40 },
                            left: { xs: '52%', sm: '45%' },
                            transform: {
                              xs: 'scale(1.8) translate(-20%)',
                              sm: 'none',
                            },
                          },
                        },
                        '&:hover': {
                          '& img': {
                            '&:nth-of-type(2)': {
                              top: { xs: 100, sm: 60 },
                              transform: {
                                xs: 'scale(1.8) translate(-20%)',
                                sm: 'scale(1.1) translate(-25%)',
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
                        src={`/static/branding/design-kits/connect-page-base2-light.png`}
                        alt="Screenshot of Figma displaying the Material UI Design kit"
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/connect-page-base2-dark.png)`,
                          })
                        }
                      />
                      <Image
                        src={`/static/branding/design-kits/connect-shot3-light.png`}
                        alt="Screenshot of the Connect plugin"
                        loading="lazy"
                        sx={(theme) =>
                          theme.applyDarkStyles({
                            content: `url(/static/branding/design-kits/connect-shot3-dark.png)`,
                          })
                        }
                      />
                    </Box>
                  </Fade>
                )}
              </Box>
            </Frame.Demo>
            <Frame.Info data-mui-color-scheme="dark">
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Stay on the loop about the Connect progress!
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Add your email to be notified about the plugin progress as we go.
              </Typography>
              <MUIConnectSignUp />
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
