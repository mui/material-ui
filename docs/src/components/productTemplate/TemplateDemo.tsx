import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme, alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import SvgDashboard from 'docs/src/icons/SvgDashboard';
import SvgEcommerce from 'docs/src/icons/SvgEcommerce';
import SvgLandingPage from 'docs/src/icons/SvgLandingPage';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import ArrowButton from 'docs/src/components/action/ArrowButton';
import LaunchRounded from '@material-ui/icons/LaunchRounded';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';

const DEMOS = ['Dashboard', 'Landing Pages', 'E-commerce'];

export default function TemplateDemo() {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const [templateIndex, setTemplateIndex] = React.useState(0);
  const icons = {
    [DEMOS[0]]: <SvgDashboard />,
    [DEMOS[1]]: <SvgLandingPage />,
    [DEMOS[2]]: <SvgEcommerce />,
  };
  const TEMPLATES = {
    [DEMOS[0]]: [
      // {
      //   name: 'Minimal Free – Client & Admin Dashboard',
      //   price: 'Free',
      //   src: '',
      //   href: ROUTES.storeTemplateMinimalFree,
      // },
      // { name: 'Devias Material Kit - React Admin Dashboard', price: 'Free', src: '', href: '' },
      {
        name: 'Flexy - React Admin Dashboard Template',
        price: '$49',
        src: `/static/branding/store-templates/template-${mode}4.jpeg`,
        href: ROUTES.storeFlexy,
      },
      // { name: 'Carpatin - Admin Dashboard', price: '$49', src: '', href: '' },
      {
        name: 'Minimal – Client & Admin Dashboard',
        price: '$69',
        src: `/static/branding/store-templates/template-${mode}1.jpeg`,
        href: ROUTES.storeTemplateMinimalDashboard,
      },
      {
        name: 'Berry - React Material Admin Dashboard Template',
        price: '$69',
        src: `/static/branding/store-templates/template-${mode}5.jpeg`,
        href: ROUTES.storeTemplateBerry,
      },
      // {
      //   name: 'Devias Material Kit Pro - React Client & Admin Dashboard',
      //   price: '$69',
      //   src: '',
      //   href: '',
      // },
      // { name: 'Tokyo - React Admin Dashboard', price: '$69', src: '', href: '' },
      {
        name: 'Material App Pro - React Admin Dashboard',
        price: '$69',
        src: `/static/branding/store-templates/template-${mode}3.jpeg`,
        href: ROUTES.storeTemplateMaterialApp,
      },
      // { name: 'Argon Dashboard PRO', price: '$69', src: '', href: '' },
    ],
    [DEMOS[1]]: [
      {
        name: 'theFront - Multipurpose Template + UI Kit',
        price: '$59',
        src: `/static/branding/store-templates/template-${mode}2.jpeg`,
        href: ROUTES.storeTheFront,
      },
      {
        name: 'Webbee - Multipurpose landing page UI Kit',
        price: '$59',
        src: `/static/branding/store-templates/template-${mode}6.jpeg`,
        href: ROUTES.storeTemplateWebbee,
      },
    ],
    [DEMOS[2]]: [
      {
        name: 'Bazar Pro - Multipurpose React Ecommerce Template',
        price: '$59',
        src: `/static/branding/store-templates/template-bazar-${mode}.jpeg`,
        href: 'https://material-ui.com/store/items/bazar-pro-react-ecommerce-template/',
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
                  Get the right template for your <GradientText>specific need</GradientText>
                </Typography>
              }
              description="We've gathered templates for lots of use-cases, all powered with the Core components carefully curated from MUI's team."
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
            <Frame.Demo sx={{ minHeight: { xs: 240, sm: 390 } }}>
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
                      sx={{
                        borderRadius: 1,
                        height: { xs: 200, sm: 240 },
                        background: `url(${item.src})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        bgcolor: 'grey.400',
                        filter:
                          mode === 'dark'
                            ? 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.6))'
                            : 'drop-shadow(0px 4px 10px rgba(61, 71, 82, 0.25))',
                        transition: '0.6s cubic-bezier(0.15, 0.3, 0.25, 1)',
                        transform: templateIndex !== index ? 'scale(0.92)' : 'scale(1)',
                      }}
                    >
                      <Link
                        href={item.href}
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
                          bgcolor: (theme) => alpha(theme.palette.primaryDark[500], 0.8),
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
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
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%)',
                  bottom: 8,
                  borderRadius: 20,
                  bgcolor: 'background.grey.100',
                  lineHeight: 1,
                  px: 0.5,
                }}
              >
                <Typography color="text.secondary" variant="caption">
                  {templateIndex + 1} / {templates.length}
                </Typography>
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
                <Typography variant="body2" color="success.600" fontWeight={500}>
                  {templates[templateIndex].price}
                </Typography>
              </Box>
              {templates.length > 1 && (
                <React.Fragment>
                  <ArrowButton
                    direction="left"
                    disabled={templateIndex === 0}
                    onClick={() => setTemplateIndex((current) => Math.max(0, current - 1))}
                    sx={{ ml: 'auto' }}
                  />
                  <ArrowButton
                    direction="right"
                    disabled={templateIndex === templates.length - 1}
                    onClick={() =>
                      setTemplateIndex((current) => Math.min(templates.length - 1, current + 1))
                    }
                  />
                </React.Fragment>
              )}
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
