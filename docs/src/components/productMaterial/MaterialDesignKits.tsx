import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Frame from 'docs/src/components/action/Frame';
import { Link } from '@mui/docs/Link';

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

interface MaterialDesignKitsProps {
  gradient?: boolean;
}

export default function MaterialDesignKits({ gradient }: MaterialDesignKitsProps) {
  const [customized, setCustomized] = React.useState(true);

  return (
    <Section bg={gradient ? 'gradient' : 'white'} cozy>
      <Grid container spacing={2} alignItems="center">
        <Grid md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Design resources"
            title={
              <Typography variant="h2">
                Enhance your <GradientText>design workflow</GradientText>
              </Typography>
            }
            description="Reach out for the Figma Design Kit and the Connect plugin to bridge the gap between development and design when using Material UI."
          />
          <Group sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
            <Highlighter disableBorder selected={customized} onClick={() => setCustomized(true)}>
              <Item
                icon={<DrawRoundedIcon color="primary" />}
                title="Design Kit"
                description="Get many of the Material UI components with states, variations, colors, typography, and icons on your preferred design tool. Frequently updated to stay up-to-date with the latest release."
              />
            </Highlighter>
            <Highlighter disableBorder selected={!customized} onClick={() => setCustomized(false)}>
              <Item
                icon={<ExtensionRoundedIcon color="primary" />}
                title="Sync plugin"
                description="Quickly generate a theme file with token and component customizations done on Figma."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            minHeight: { lg: '590px' },
          }}
        >
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                overflow: 'hidden',
                height: { xs: 240, sm: 420 },
                perspective: '1000px',
              }}
            >
              <Fade in={customized} timeout={500}>
                <Box
                  sx={[
                    {
                      width: '100%',
                      height: '100%',
                      '& img': {
                        position: 'absolute',
                        left: '50%',
                        width: { xs: 240, sm: 300 },
                        '&:nth-of-type(1)': {
                          top: 120,
                          transform: 'translate(-70%)',
                        },
                        '&:nth-of-type(2)': {
                          top: 80,
                          transform: 'translate(-50%)',
                        },
                        '&:nth-of-type(3)': {
                          top: 40,
                          transform: 'translate(-30%)',
                        },
                      },
                      '&:hover': {
                        '& img': {
                          filter: 'drop-shadow(-16px 12px 20px rgba(61, 71, 82, 0.2))',
                          '&:nth-of-type(1)': {
                            top: 0,
                            transform: 'scale(0.8) translate(-108%) rotateY(30deg)',
                          },
                          '&:nth-of-type(2)': {
                            top: 40,
                            transform: 'scale(0.8) translate(-54%) rotateY(30deg)',
                          },
                          '&:nth-of-type(3)': {
                            top: 40,
                            transform: 'scale(0.8) translate(-0%) rotateY(30deg)',
                          },
                        },
                      },
                    },
                    (theme) =>
                      theme.applyDarkStyles({
                        '&:hover': {
                          '& img': {
                            filter: 'drop-shadow(-16px 12px 20px rgba(0, 0, 0, 0.4))',
                          },
                        },
                      }),
                  ]}
                >
                  <Image
                    src={`/static/branding/design-kits/Button-light.jpeg`}
                    alt=""
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/Button-dark.jpeg)`,
                      })
                    }
                  />
                  <Image
                    src={`/static/branding/design-kits/Alert-light.jpeg`}
                    alt=""
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/Alert-dark.jpeg)`,
                      })
                    }
                  />
                  <Image
                    src={`/static/branding/design-kits/Slider-light.jpeg`}
                    alt=""
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/Slider-dark.jpeg)`,
                      })
                    }
                  />
                </Box>
              </Fade>
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
                    alt=""
                    loading="lazy"
                    sx={(theme) =>
                      theme.applyDarkStyles({
                        content: `url(/static/branding/design-kits/connect-shot2-dark.png)`,
                      })
                    }
                  />
                </Box>
              </Fade>
            </Frame.Demo>
            {customized ? (
              <Frame.Info
                data-mui-color-scheme="dark"
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  minWidth: 0,
                  gap: { xs: 3, sm: 0 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="semiBold">
                    Available in:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, '& >img': { width: 26, height: 26 } }}>
                    <img src="/static/branding/design-kits/figma-logo.svg" alt="" loading="lazy" />
                    <img src="/static/branding/design-kits/sketch-logo.svg" alt="" loading="lazy" />
                    <img
                      src="/static/branding/design-kits/adobexd-logo.svg"
                      alt=""
                      loading="lazy"
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    gap: 1.5,
                    width: { xs: '100%', sm: 'fit-content' },
                  }}
                >
                  <Button
                    component={Link}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    href="https://www.figma.com/community/file/912837788133317724/material-ui-for-figma-and-mui-x"
                    startIcon={
                      <img
                        src="/static/branding/design-kits/figma-logo.svg"
                        alt=""
                        loading="lazy"
                        style={{ width: 16, height: 16 }}
                      />
                    }
                    sx={{
                      height: 'fit-content',
                      width: { xs: '100%', sm: 'fit-content' },
                    }}
                  >
                    Figma Preview
                  </Button>
                  <Button
                    component={Link}
                    variant="contained"
                    size="small"
                    href="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=design-cta2#design"
                    endIcon={<ChevronRightRoundedIcon />}
                    sx={{
                      ml: { xs: 0, sm: 'auto' },
                      height: 'fit-content',
                      width: { xs: '100%', sm: 'fit-content' },
                      color: '#FFF !important',
                    }}
                  >
                    Buy it now
                  </Button>
                </Box>
              </Frame.Info>
            ) : (
              <Frame.Info data-mui-color-scheme="dark">
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  Get the beta version of Material UI Sync now!
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  There&apos;s still a lot to do, and we&apos;re looking forward to hearing from all
                  of you.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
                  <Button
                    component={Link}
                    variant="contained"
                    size="small"
                    noLinkStyle
                    href="https://www.figma.com/community/plugin/1336346114713490235/connect"
                  >
                    Use Sync now
                  </Button>
                  <Button
                    component={Link}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    href="/material-ui/design-resources/connect/"
                  >
                    View documentation
                  </Button>
                </Box>
              </Frame.Info>
            )}
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
