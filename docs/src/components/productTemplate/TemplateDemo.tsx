import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Frame from 'docs/src/components/action/Frame';
import LaunchRounded from '@mui/icons-material/LaunchRounded';
import Link from 'docs/src/modules/components/Link';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import Layers from '@mui/icons-material/Layers';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import More from 'docs/src/components/action/More';

const DEMOS = ['Dashboard', 'Landing Pages', 'E-commerce'];

function ActionArea(props: ButtonBaseProps) {
  return (
    <ButtonBase
      {...props}
      sx={[
        (theme) => ({
          width: 100,
          height: 100,
          borderRadius: '50%',
          transition: '0.2s',
          '&.Mui-disabled': {
            opacity: 0,
          },
          '& > svg': { transition: '0.2s' },
          backdropFilter: 'blur(4px)',
          bgcolor: alpha(theme.palette.primaryDark[500], 0.5),
          '&:hover, &:focus': {
            '& > svg': { fontSize: 28 },
          },
          position: 'absolute',
          top: 'calc(50% - 50px)',
          color: '#fff',
          p: 1.5,
          ...theme.applyDarkStyles({
            bgcolor: alpha(theme.palette.primary[500], 0.5),
          }),
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

export default function TemplateDemo() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const [templateIndex, setTemplateIndex] = React.useState(0);
  const icons = {
    [DEMOS[0]]: <DashboardRounded fontSize="small" />,
    [DEMOS[1]]: <Layers fontSize="small" />,
    [DEMOS[2]]: <ShoppingBag fontSize="small" />,
  };

  const TEMPLATES = {
    [DEMOS[0]]: [
      {
        name: 'Devias Kit Pro - Client & Admin Dashboard',
        src: {
          light: '/static/branding/store-templates/template-4light.jpg',
          dark: '/static/branding/store-templates/template-4dark.jpg',
        },
        href: 'https://mui.com/store/items/devias-kit-pro/',
      },
      {
        name: 'Minimal - Client & Admin Dashboard',
        src: {
          light: '/static/branding/store-templates/template-1light.jpg',
          dark: '/static/branding/store-templates/template-1dark.jpg',
        },
        href: 'https://mui.com/store/items/minimal-dashboard/',
      },
      {
        name: 'Berry - React Material Admin Dashboard Template',
        src: {
          light: '/static/branding/store-templates/template-5light.jpg',
          dark: '/static/branding/store-templates/template-5dark.jpg',
        },
        href: 'https://mui.com/store/items/berry-react-material-admin/',
      },
      {
        name: 'Mira Pro - React Material Admin Dashboard',
        src: {
          light: '/static/branding/store-templates/template-3light.jpg',
          dark: '/static/branding/store-templates/template-3dark.jpg',
        },
        href: 'https://mui.com/store/items/mira-pro-react-material-admin-dashboard/',
      },
    ],
    [DEMOS[1]]: [
      {
        name: 'theFront - Multipurpose Template + UI Kit',
        src: {
          light: '/static/branding/store-templates/template-2light.jpg',
          dark: '/static/branding/store-templates/template-2dark.jpg',
        },
        href: 'https://mui.com/store/items/the-front-landing-page/',
      },
      {
        name: 'Webbee - Multipurpose landing page UI Kit',
        src: {
          light: '/static/branding/store-templates/template-6light.jpg',
          dark: '/static/branding/store-templates/template-6dark.jpg',
        },
        href: 'https://mui.com/store/items/webbee-landing-page/',
      },
    ],
    [DEMOS[2]]: [
      {
        name: 'Bazar Pro - Multipurpose React Ecommerce Template',
        src: {
          light: '/static/branding/store-templates/template-bazar-light.jpg',
          dark: '/static/branding/store-templates/template-bazar-dark.jpg',
        },
        href: 'https://mui.com/store/items/bazar-pro-react-ecommerce-template/',
      },
    ],
  };

  const templates = TEMPLATES[demo];

  return (
    <Section bg="comfort">
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Use cases"
              title={
                <Typography variant="h2">
                  The right template for your <GradientText>specific need</GradientText>
                </Typography>
              }
              description="A growing list of templates for multiple use-cases, all powered by MUI Core components and carefully curated by MUI's team."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter
                key={name}
                selected={name === demo}
                onClick={() => {
                  setDemo(name);
                  setTemplateIndex(0);
                }}
              >
                <Item
                  icon={React.cloneElement(icons[name], name === demo ? { color: 'primary' } : {})}
                  title={name}
                />
              </Highlighter>
            ))}
            <More
              component={Link}
              href="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=templates-cta2#populars"
              noLinkStyle
            />
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame>
            <Frame.Demo sx={{ minHeight: { xs: 240, sm: 320 } }}>
              <Box
                sx={{
                  overflow: 'hidden',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '50%',
                  py: 2,
                  transform: 'translate(0px, -50%)',
                  '& > div': { px: '12%', overflow: 'unset !important' },
                  '& .react-swipeable-view-container > div': {
                    overflow: 'unset !important',
                  },
                }}
              >
                <SwipeableViews
                  springConfig={{
                    duration: '0.6s',
                    delay: '0s',
                    easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
                  }}
                  index={templateIndex}
                  resistance
                  enableMouseEvents
                  onChangeIndex={(index) => setTemplateIndex(index)}
                >
                  {templates.map((item, index) => (
                    <Box
                      key={item.name}
                      sx={(theme) => ({
                        borderRadius: 1,
                        height: { xs: 200, sm: 240 },
                        backgroundImage: `url(${item.src.light})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        bgcolor: 'background.paper',
                        boxShadow: '0px 4px 10px rgba(61, 71, 82, 0.25)',
                        transition: '0.6s cubic-bezier(0.15, 0.3, 0.25, 1)',
                        transform: templateIndex !== index ? 'scale(0.92)' : 'scale(1)',
                        ...theme.applyDarkStyles({
                          backgroundImage: `url(${item.src.dark})`,
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        }),
                      })}
                    >
                      <Link
                        href={`${item.href}?utm_source=marketing&utm_medium=referral&utm_campaign=templates-cta2`}
                        noLinkStyle
                        target="_blank"
                        sx={{
                          transition: '0.3s',
                          borderRadius: 1,
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          top: 0,
                          left: 0,
                          bgcolor: (theme) => alpha(theme.palette.primaryDark[900], 0.4),
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover, &:focus': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Typography fontWeight="bold">Go to store</Typography>
                        <LaunchRounded fontSize="small" sx={{ ml: 1 }} />
                      </Link>
                    </Box>
                  ))}
                </SwipeableViews>
                {templates.length > 1 && (
                  <React.Fragment>
                    <ActionArea
                      aria-label="Previous template"
                      disabled={templateIndex === 0}
                      onClick={() => setTemplateIndex((current) => Math.max(0, current - 1))}
                      sx={{ left: 0, transform: 'translate(-50%)', justifyContent: 'flex-end' }}
                    >
                      <KeyboardArrowLeftRounded />
                    </ActionArea>
                    <ActionArea
                      aria-label="Next template"
                      disabled={templateIndex === templates.length - 1}
                      onClick={() =>
                        setTemplateIndex((current) => Math.min(templates.length - 1, current + 1))
                      }
                      sx={{ right: 0, transform: 'translate(50%)', justifyContent: 'flex-start' }}
                    >
                      <KeyboardArrowRightRounded />
                    </ActionArea>
                  </React.Fragment>
                )}
              </Box>
            </Frame.Demo>
            <Frame.Info
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& .MuiIconButton-root': { display: { xs: 'none', md: 'inline-flex' } },
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" fontWeight={500} noWrap sx={{ mb: 0.5 }}>
                  {templates[templateIndex].name}
                </Typography>
                <Box
                  sx={{
                    borderRadius: 20,
                    lineHeight: 1,
                    px: 0.5,
                  }}
                >
                  <Typography color="grey.500" variant="caption">
                    {templateIndex + 1} / {templates.length}
                  </Typography>
                </Box>
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
