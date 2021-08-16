import * as React from 'react';
import { useTheme, styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import SvgSwitch from 'docs/src/icons/SvgSwitch';
import SvgTypography from 'docs/src/icons/SvgTypography';
import SvgDatePicker from 'docs/src/icons/SvgDatePicker';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';

const DEMOS = ['Components', 'Branding', 'Iconography'];

const Image = styled('img')(({ theme }) => ({
  filter:
    theme.palette.mode === 'dark'
      ? 'drop-shadow(-8px 4px 20px rgba(0, 0, 0, 0.4))'
      : 'drop-shadow(-8px 4px 20px rgba(61, 71, 82, 0.2))',
  transition: '0.4s',
  display: 'block',
  height: 'auto',
  borderRadius: '10px',
}));

export default function TemplateDemo() {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <SvgSwitch />,
    [DEMOS[1]]: <SvgTypography />,
    [DEMOS[2]]: <SvgDatePicker />,
  };
  return (
    <Section bg="comfort">
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Use cases"
              title={
                <Typography variant="h2">
                  Get the right template for your <GradientText>specific need</GradientText>
                </Typography>
              }
              description="We've gathered templates for lots of use-cases, all powered with the Core components carefully curated from MUI's team."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item
                  icon={React.cloneElement(icons[name], { active: name === demo })}
                  title={name}
                />
              </Highlighter>
            ))}
            <More />
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
              <Fade in={demo === 'Components'} timeout={500}>
                <Box
                  sx={{
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
                        filter:
                          mode === 'dark'
                            ? 'drop-shadow(-16px 12px 20px rgba(0, 0, 0, 0.4))'
                            : 'drop-shadow(-16px 12px 20px rgba(61, 71, 82, 0.2))',
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
                  }}
                >
                  <Image
                    src={`/static/branding/design-kits/Button-${mode}.jpeg`}
                    alt=""
                    loading="lazy"
                  />
                  <Image
                    src={`/static/branding/design-kits/Alert-${mode}.jpeg`}
                    alt=""
                    loading="lazy"
                  />
                  <Image
                    src={`/static/branding/design-kits/Slider-${mode}.jpeg`}
                    alt=""
                    loading="lazy"
                  />
                </Box>
              </Fade>
              <Fade in={demo === 'Branding'} timeout={500}>
                <Image
                  src={`/static/branding/design-kits/Colors-${mode}.jpeg`}
                  alt=""
                  loading="lazy"
                  width="300"
                  sx={{
                    width: { sm: 400 },
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </Fade>
              <Fade in={demo === 'Iconography'} timeout={500}>
                <Image
                  src={`/static/branding/design-kits/Icons-${mode}.jpeg`}
                  alt=""
                  loading="lazy"
                  width="300"
                  sx={{
                    width: { sm: 500 },
                    position: 'absolute',
                    left: '50%',
                    top: 60,
                    transform: 'translate(-40%)',
                  }}
                />
              </Fade>
            </Frame.Demo>
            <Frame.Info>
              <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                MUI for Figma
              </Typography>
              <Typography variant="body2" color="success.600" fontWeight={500}>
                $69
              </Typography>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
