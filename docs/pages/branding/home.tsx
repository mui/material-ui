import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'docs/src/modules/components/Link';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box, { BoxProps } from '@material-ui/core/Box';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MaterialXIcon from 'docs/src/modules/branding/icons/MaterialX';
import LibraryIcon from 'docs/src/modules/branding/icons/Library';
import BrowseTemplateIcon from 'docs/src/modules/branding/icons/BrowseTemplate';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import Head from 'docs/src/modules/components/Head';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingHeader from 'docs/src/modules/branding/BrandingHeader';
import CustomerIcons from 'docs/src/modules/branding/CustomerIcons';
import ArrowCirleIcon from 'docs/src/modules/branding/icons/ArrowCircle';
import Image from 'docs/src/modules/branding/MaterialUixImage';
import MaterialUix from 'docs/src/modules/branding/MaterialUix';
import BrandingWhyEnterprise from 'docs/src/modules/branding/BrandingWhyEnterprise';
import BrandingBulletItem from 'docs/src/modules/branding/BrandingBulletItem';
import BrandingDiscoverMore from 'docs/src/modules/branding/BrandingDiscoverMore';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

function QuicklyBuild() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const CustomSwitch = styled(Switch)(({ theme }) => ({
    '&.MuiSwitch-root': {
      width: theme.spacing(9),
      height: theme.spacing(5.5),
    },
    '& .MuiSwitch-thumb': {
      width: theme.spacing(4),
      height: theme.spacing(4),
      borderRadius: '50%',
      top: theme.spacing(-0.4),
      // top: '-3px',
      position: 'relative',
      backgroundColor: theme.palette.secondary.main,
      backgroundImage: `url(${
        checked
          ? '/static/branding/home/Turn-on-light.svg'
          : '/static/branding/home/Turn-off-light.svg'
      })`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    '& .MuiSwitch-track': {
      borderRadius: theme.spacing(12.5),
      backgroundColor: theme.palette.greyAA,
    },
    '& .MuiSwitch-switchBase': {
      background: 'transparent !important',
    },
  }));
  return (
    <Grid container spacing={0} sx={{ mb: { md: 15 } }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ position: 'relative', alignItems: 'center', display: 'flex', p: 0 }}
      >
        <Container
          sx={{
            p: 0,
            px: { xs: 2, sm: 7.5, lg: 0 },
            maxWidth: { lg: '500px !important', sm: '100%' },
            textAlign: 'left',
            mt: { xs: 6, sm: 9, lg: 0 },
            mb: { xs: 8, lg: 0 },
          }}
        >
          <Typography
            variant="h1"
            align="left"
            sx={{
              mb: 4,
            }}
          >
            <UnderlinedText>Quickly </UnderlinedText> build beautiful React UIs
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Material - UI is a simple and customizable component library to build faster, beautiful,
            and more accessible React applications.Follow your own design system, or start with
            Material Design.
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Button
              sx={{ mr: { xs: 0.5, sm: 2.2 }, display: 'flex' }}
              component={Link}
              noLinkStyle
              href="/getting-started/usage/"
              size="large"
              variant="contained"
              endIcon={<NavigateNextIcon />}
            >
              Get started
            </Button>
            <Button
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              component={Link}
              noLinkStyle
              href="/getting-started/usage/"
              size="large"
              variant="contained"
              endIcon={<NavigateNextIcon />}
              color="secondary"
            >
              Rich components
            </Button>
            <Button
              sx={{ display: { xs: 'flex', sm: 'none' }, px: 1.9, pr: 1, pl: 2.5 }}
              component={Link}
              noLinkStyle
              href="/getting-started/usage/"
              size="large"
              variant="contained"
              endIcon={<NavigateNextIcon />}
              color="secondary"
            >
              Material UI - X
            </Button>
          </Box>
          <FormControlLabel
            sx={{ mt: { lg: 7, xs: 6 } }}
            control={<CustomSwitch checked={checked} onChange={handleChange} name="checked" />}
            label={
              <Typography
                variant="body3"
                sx={{
                  lineHeight: '18px',
                }}
              >
                Turn off the light
              </Typography>
            }
          />
        </Container>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: 'flex', flexDirection: 'column', pl: { xs: 2, sm: 3.9, lg: 0 }, p: 0 }}
      >
        <Box
          sx={{
            bgcolor: checked ? 'secondary.main' : 'greyEA',
            '& img': {
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              mb: 3.8,
            },
          }}
        >
          {checked ? (
            <React.Fragment>
              <Image
                src={'/static/branding/home/QuicklyBuild-dark.png'}
                sx={{
                  display: { xs: 'none', lg: 'block' },
                }}
              />
              <Image
                src={'/static/branding/home/QuicklyBuild-darkIpad.png'}
                sx={{
                  display: { xs: 'none', lg: 'none', sm: 'block' },
                }}
              />
              <Image
                src={'/static/branding/home/QuicklyBuild-darkMobile.png'}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Image
                src={'/static/branding/home/QuicklyBuild.png'}
                sx={{
                  display: { xs: 'none', lg: 'block' },
                }}
              />
              <Image
                src={'/static/branding/home/QuicklyBuild-Ipad.png'}
                sx={{
                  display: { xs: 'none', lg: 'none', sm: 'block' },
                }}
              />
              <Image
                src={'/static/branding/home/QuicklyBuild-Mobile.png'}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                }}
              />
            </React.Fragment>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

function LetStarted() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component="img"
        src="/static/branding/block10.svg"
        loading="lazy"
        alt=""
        sx={{
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '-40px',
          position: 'absolute',
          top: 'auto',
        }}
      />
      <Typography variant="h2" align="center" sx={{ mb: 12.2 }}>
        Let’s get you started
      </Typography>

      <Grid container spacing={1} sx={{ mb: { md: 15 }, p: 0 }}>
        <Grid item xs={12} md={6} sx={{ bgcolor: 'greyF3' }}>
          <Box sx={{ maxWidth: '470px', mx: 'auto', pt: 6.1, pb: 10 }}>
            <Avatar
              sx={{
                mt: -12.5,
                mb: 0,
                mx: 'auto',
                bgcolor: 'primary.main',
                width: 100,
                height: 100,
              }}
            >
              <img loading="lazy" src={'/static/branding/home/Installation.svg'} alt="" />
            </Avatar>
            <Typography variant="h2" align="center" sx={{ mt: 4, mb: 2.2 }}>
              Installation
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              Install Material - UI & apos; s source files via npm.We take care of injecting the CSS
              needed.
            </Typography>
            <Box
              sx={{
                bgcolor: 'secondary.main',
                borderRadius: '4px',
                px: 2.5,
                fontSize: '16px',
                lineHeight: '19px',
                color: 'white',
              }}
            >
              <pre>
                {/* <code>$ npm install @material-ui/core </code> */}
              </pre>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 4, mb: 2.2 }}>
              our use a <Link href="mailto:sales@material-ui.com"> CDN </Link>{' '}
              <Box component="span" sx={{ display: { lg: 'block' } }} /> Load the default Roboto
              font.
            </Typography>
            <Box
              sx={{
                bgcolor: 'secondary.main',
                borderRadius: '4px',
                px: 2.5,
                overflowY: 'auto',
                m: 0,
              }}
            >
              <pre>
                <code className="language-html" data-lang="html">
                  <Box component="span">&lt;link </Box>
                  <Box component="span">&nbsp;</Box>
                  <Box component="span">rel=</Box>
                  <Box component="span">"stylesheet"</Box>
                  <Box component="span">href=</Box>
                  <Box component="span">
                    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                  </Box>
                  <Box component="span">/&gt;</Box>
                </code>
              </pre>
            </Box>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button
                component={Link}
                noLinkStyle
                href="/getting-started/usage/"
                size="large"
                variant="contained"
                endIcon={<NavigateNextIcon />}
              >
                Read Installation docs
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: '470px', mx: 'auto', pt: 6.1, pb: 10 }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 100,
                height: 100,
                mt: -12.5,
                mb: 0,
                mx: 'auto',
              }}
            >
              <img loading="lazy" src={'/static/branding/home/Usage.svg'} alt="" />
            </Avatar>
            <Typography variant="h2" align="center" sx={{ mt: 4, mb: 2.2 }}>
              Usage
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              Material - UI components work without any additional setup, and don & apos; t pollute
              the global scope.
            </Typography>
            <Box
              sx={{
                bgcolor: 'secondary.main',
                borderRadius: '4px',
                px: 2.5,
                overflowY: 'auto',
              }}
            >
              <pre>
                <code className="language-html" data-lang="html">
                  {/* <Box component="span">
                    import React from 'react' <Box component="span">&semi;</Box>
                  </Box>
                  <br />
                  <Box component="span">
                    import <Box component="span">&lbrace;</Box>Button
                    <Box component="span">&rbrace;</Box> from '@material-ui/core'
                    <Box component="span">&semi;</Box>
                  </Box>
                  <br />
                  <Box component="span">function App </Box>
                  <Box component="span">&lpar;</Box>
                  <Box component="span">&rpar;</Box>
                  <Box component="span">&lbrace;</Box>
                  <br />
                  <Box component="span">return</Box>
                  <Box component="span">&lt;Button</Box>
                  <Box component="span">color=</Box>
                  <Box component="span">"primary"</Box>
                  <Box component="span">&gt;</Box>
                  <Box component="span">&lt;/Button&gt;</Box>
                  <Box component="span">&rbrace;</Box> */}
                </code>
              </pre>
            </Box>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button
                component={Link}
                noLinkStyle
                href="/getting-started/usage/"
                size="large"
                variant="contained"
                endIcon={<NavigateNextIcon />}
              >
                Explore the Docs
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
const designResourcesData = [
  {
    label: 'Figma',
    src: '/static/branding/home/Figma.svg',
    href: '/getting-started/usage/',
  },
  {
    label: 'Sketch',
    src: '/static/branding/home/Sketch.svg',
    href: '/getting-started/usage/',
  },
  {
    label: 'Adobe XD',
    src: '/static/branding/home/Adobe-XD.svg',
    href: '/getting-started/usage/',
  },
  {
    label: 'Framer',
    src: '/static/branding/home/Framer.svg',
    href: '/getting-started/usage/',
  },
];
interface DesignResourcesCardProps {
  label: string;
  src: string;
  href: string;
}

function DesignResourcesCard(props: DesignResourcesCardProps) {
  const { label, src, href } = props;
  return (
    <Box
      sx={{
        minWidth: { xs: '130px', sm: 0 },
        textAlign: 'center',
        mb: { xs: 5, sm: 0 },
      }}
    >
      <Image
        src={src}
        sx={{
          width: '100px',
          height: '100px',
          bgcolor: 'greyF3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '100px',
          mx: 'auto',
          mb: 2.5,
        }}
      />
      <Box
        component={Link}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: 'secondary.main',
          textDecoration: 'none !important',
          '& svg': {
            mt: '2px',
          },
        }}
        href={href}
      >
        <Typography variant="h4" component="h3" sx={{ mr: 1 }}>
          {label}
        </Typography>
        <ArrowCirleIcon />
      </Box>
    </Box>
  );
}
function DesignResources() {
  return (
    <Box sx={{ pb: { sm: 12.5 }, pt: { sm: 17.8, lg: 0 } }}>
      <Container sx={{ px: { xs: 2, sm: 8.7, lg: 3 } }}>
        <Typography align="center" variant="h3" sx={{ mb: 2.5 }}>
          Looking for design resources?
        </Typography>
        <Typography align="center" sx={{ mb: 6 }}>
          A set of reusable components for design tools is available,
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} /> designed to match
          the React components, and to help you
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} /> craft great
          products:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '712px',
            width: '100%',
            p: 0,
            mx: 'auto',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {designResourcesData.map((resource, i) => (
            <DesignResourcesCard {...resource} key={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
const materialUixData = [
  {
    src: '/static/branding/home/Beautiful.svg',
    title: 'Beautiful look & feel',
    description: (
      <React.Fragment>
        The components come with Material Design by default the design specification used by Google
        on Android and all its product.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/home/Documentation.svg',
    title: 'Outstanding documentation',
    description: (
      <React.Fragment>
        The documentation is built on the experience we have gained developing open source
        components, and acting on the feedback for improving the documentation from our growing
        community of 2 million developers.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/home/Customizability.svg',
    title: 'Simple customizability',
    description: (
      <React.Fragment>
        You want your components to be powerful, but without sacrificing how they look! After all,
        what good is that nice design system if you can & apos; t use it ?
        <br />
        <br />
        Material - UI is simple to customize by design, which means that you are in complete and
        full control of how your components render down to the very last component, class or style.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/home/Savetime.svg',
    title: 'Save time',
    description: (
      <React.Fragment>
        You want your components to be powerful, but without sacrificing how they look! After all,
        what good is that nice design system if you can & apos; t use it ?
        <br />
        <br />
        Material - UI is simple to customize by design, which means that you are in complete and
        full control of how your components render down to the very last component, class or style.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/home/Accesibility.svg',
    title: 'Accesibility',
    description: (
      <React.Fragment>
        All our components have built -in support for accessibility allowing you to reach a larger
        audience.We think about it, so you don & apos; t have to.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/home/Completeness.svg',
    title: 'Completeness',
    description: (
      <React.Fragment>
        Because of the sustainability challenge of developing open source components, no open source
        UI library can provide enough high quality components.Sometimes for advanced components such
        as a data grid, there isn’t even an open source alternative to turn to. <br /> <br />{' '}
        Material - UI X will support all the most needed UI components, without sacrificing quality.
      </React.Fragment>
    ),
  },
];
function WhyMaterialUix() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        pt: 15,
        pb: { xs: 10, sm: 15, lg: 67.7 },
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box
        component="img"
        src="/static/branding/block13.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          right: 0,
          top: -100,
        }}
      />
      <Box
        component="img"
        src="/static/branding/block12.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: -36,
          left: 33,
        }}
      />
      <Container sx={{ px: { sm: 7.3, lg: 3 } }}>
        <Typography variant="h2" align="center" sx={{ mb: { xs: 8, sm: 10 } }}>
          Why Material - UI ?
        </Typography>
        <MaterialUix data={materialUixData} variant={'dark'} />
        <Typography align="center" variant="h4" sx={{ mt: { xs: 12.2, sm: 29.6, lg: 20 } }}>
          or go even beyond …
        </Typography>
        <Image
          src="/static/branding/home/X-icon.svg"
          sx={{
            mt: { xs: 9.5, sm: 15 },
            mb: { xs: 3.3, sm: 2.6, lg: 4.1 },
            textAlign: 'center',
            bgcolor: 'vividBlue',
            width: 100,
            height: 100,
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
          }}
        />
        <Image
          src="/static/branding/material-ui-x/material-ui-x-logo.svg"
          sx={{
            display: { xs: 'none', lg: 'block' },
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        />
        <Typography
          sx={{
            mt: { xs: 2.4, sm: 2.5, lg: 4.3 },
            maxWidth: 670,
            mx: 'auto',
            textAlign: 'center',
            fontWeight: 'normal',
            color: 'greyAA',
          }}
        >
          The last React UI library you’ll ever need.It contains the best React Data
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> Grid on the market
          and a growing list of advanced components.
        </Typography>
        <Box sx={{ textAlign: 'center', mt: { xs: 4, sm: 5, lg: 4 } }}>
          <Button
            sx={{ mb: { xs: 4, sm: 0 } }}
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
            endIcon={<MaterialXIcon />}
          >
            Learn more
          </Button>
          <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          <Button
            sx={{
              textDecoration: 'underline',
              color: 'white',
              ml: { xs: 1.3, sm: 4.4, lg: 5.3 },
              p: 0,
              background: 'transparent',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: '18px',
              lineHeight: '24px',
              '&:hover': {
                background: 'none',
                textDecoration: 'underline',
              },
            }}
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
            endIcon={<NavigateNextIcon />}
          >
            Check pricing
          </Button>

          <Image
            src={'/static/branding/home/Material-ui-x.png'}
            sx={{
              display: { xs: 'none', lg: 'block' },
              mt: 11.3,
              '& img': {
                verticalAlign: 'bottom',
                width: '100%',
              },
            }}
          />
          <Image
            src={'/static/branding/home/Material-ui-x-ipad.png'}
            sx={{
              display: { xs: 'none', sm: 'block', lg: 'none' },
              right: '-24px',
              position: 'relative',
              mt: 10,
              mr: -5,
              '& img': {
                verticalAlign: 'bottom',
                width: '100%',
              },
            }}
          />
          <Image
            src={'/static/branding/home/Material-ui-x-mobile.png'}
            sx={{
              display: { xs: 'block', sm: 'none' },
              mt: 8,
              position: 'relative',
              right: '-16px',
              '& img': {
                verticalAlign: 'bottom',
                width: '100%',
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

function WhyEnterprise() {
  return (
    <Box
      sx={{
        pt: { xs: 12, sm: 15 },
        pb: { xs: 20.8, sm: 15 },
        bgcolor: 'greyF3',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src="/static/branding/block14.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          right: { xs: '15px', sm: '40px' },
          bottom: '-40px',
        }}
      />
      <Container sx={{ px: { xs: 2, sm: 7.5, lg: 3 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontSize: { xs: '40px', sm: '48px', lg: '52px' },
            lineHeight: { xs: '48px', sm: '56px', lg: '60px' },
            mb: { xs: 8, sm: 10, lg: 9.7 },
            textAlign: { xs: 'center', lg: 'left' },
          }}
        >
          Here’s why enterprises{' '}
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
          also use Material - UI
        </Typography>
        <BrandingWhyEnterprise
          sx={{ px: 0 }}
          imgSx={{
            bgcolor: 'black',
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
          }}
          src={'/static/branding/home/unity.svg'}
          descSx={{
            fontSize: { xs: '24px', sm: '28px', lg: '24px' },
            lineHeight: { xs: '30px', sm: '36px', lg: '30px' },
          }}
          description={
            <React.Fragment>
              “Material - UI offers a wide variety of high quality components that have allowed us
              to ship features faster.Material - UI has been used by more than a hundred engineers
              in our organization.What & apos; s more, Material - UI & apos; s well architected
              customization system has allowed us to differentiate ourselves in the marketplace.”
            </React.Fragment>
          }
          avatar={'/static/branding/pricing/avatar.svg'}
          name={'Joona Rahko'}
          post={'Staff Software Engineer at Unity Technologies'}
          netflixSx={{ display: { xs: 'block', lg: 'none' } }}
        />
      </Container>
    </Box>
  );
}

const Button1 = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    textAlign: 'center',
    width: '50%',
    fontSize: '14px',
    lineHeight: '20px',
    border: '0',
    borderRadius: '4px',
    padding: '8px 0',
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.text.primary,
    },
  },
  '&.MuiButton-label': {
    textTransform: 'capitalize',
  },
}));
interface IsDarkButtonProps {
  title: string;
  lightOn?: number;
  darkOn?: number;
  clickDarkOn?: any;
  clickLightOn?: any;
}

function IsDarkButton(props: IsDarkButtonProps) {
  const { title = 'Light', darkOn, lightOn = 1, clickDarkOn, clickLightOn } = props;

  return (
    <Button1
      color="inherit"
      variant="contained"
      size="small"
      sx={
        (lightOn === 1 && title === 'Light') || (darkOn === 1 && title === 'Dark')
          ? { background: 'white', color: 'text.primary' }
          : {
              background: 'transparent',
              color: 'greyAA',
            }
      }
      onClick={() => {
        if (title === 'Dark') {
          clickDarkOn();
        } else {
          clickLightOn();
        }
      }}
    >
      <Image src={'/static/branding/home/Turn-off-light.svg'} />
      {title}
    </Button1>
  );
}
const customTab = styled(Tab)(({ theme }) => ({
  '&.MuiSwitch-root': {
    width: theme.spacing(9),
    height: theme.spacing(5.5),
  },
  '& .MuiSwitch-switchBase': {
    background: 'transparent !important',
  },
}));

function SimpleDeclarative() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  const [lightOn, setLightOn] = React.useState(1);
  const [darkOn, setDarkOn] = React.useState(0);

  return (
    <Box sx={{ pt: 15, pb: 18 }}>
      <Container>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontSize: { xs: '40px', sm: '48px', lg: '52px' },
            lineHeight: { xs: '48px', sm: '56px', lg: '60px' },
            mb: 2.5,
          }}
        >
          Simple, declarative
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
          <UnderlinedText> components </UnderlinedText>
        </Typography>
        <Typography align="center" sx={{ mb: 8 }}>
          Material - UI’s components are written in React making it easy to build modern,
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
          high quality UIs that perform great everywhere.
        </Typography>
        {/* ------test  */}
        {/* <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Cards" value="1" />
            <Tab label="Avatars" value="2" />
            <Tab label="Colors" value="3" />
          </TabList>
          <TabPanel value="1">
            <Grid container spacing={1} sx={{ mb: { md: 15 }, p: 0 }}>
              <Grid item xs={12} md={6} sx={{ bgcolor: 'secondary.main' }}>
                <Box sx={{ maxWidth: '470px', mx: 'auto', pt: 6.1, pb: 10 }}>
                  <pre>
                    <code className="language-html" data-lang="html">
                      <Box component="span">&lt;ion-card&gt;</Box>
                      <br />
                      <Box component="span">&lt;ion-img</Box>
                      <Box component="span">src=</Box>
                      <Box component="span">"/assets/shirt-white.jpg"</Box>
                      <Box component="span">&gt;</Box>
                      <Box component="span">&lt;/ion-img&gt;</Box>
                      <br />
                      <Box component="span">&lt;ion-card-content&gt;</Box>
                      <br />
                      <Box component="span">&lt;ion-fab&gt;</Box>
                      <Box component="span">&lt;ion-icon</Box>
                      <Box component="span">name=</Box>
                      <Box component="span">“like”</Box>
                      <Box component="span">slot=</Box>
                      <Box component="span">“end”</Box>
                      <Box component="span">&gt;</Box>
                      <Box component="span">&lt;/ion-icon&gt;</Box>
                      <Box component="span">&lt;/ion-fab&gt;</Box>
                      <br />
                      <Box component="span">&lt;/ion-card-header&gt;</Box>
                      <br />
                      <Box component="span">&lt;ion-card-subtitle&gt;</Box>
                      Material-UI
                      <Box component="span">&lt;/ion-card-subtitle&gt;</Box>
                      <br />
                      <Box component="span">&lt;ion-card-title&gt;</Box>
                      Material-UI
                      <Box component="span">&lt;/ion-card-title&gt;</Box>
                      <br />
                      <Box component="span">&lt;/ion-card-header&gt;</Box>
                      <br />
                      <Box component="span">&lt;p</Box>
                      <Box component="span">class=</Box>
                      <Box component="span">“price-tag”</Box>
                      <Box component="span">&gt;</Box>
                      €29,-
                      <Box component="span">&lt;/p&gt;</Box>
                      <br />
                      <Box component="span">&lt;/ion-item</Box>
                      <br />
                      <Box component="span">&lt;ion-button</Box>
                      <Box component="span">fill=</Box>
                      <Box component="span">"solid"</Box>
                      <Box component="span">&gt;</Box>
                      Action
                      <Box component="span">&lt;/ion-button&gt;</Box>
                      <br />
                      <Box component="span">&lt;ion-icon</Box>
                      <Box component="span">name=</Box>
                      <Box component="span">“heart”</Box>
                      <Box component="span">slot=</Box>
                      <Box component="span">“end”</Box>
                      <Box component="span">&gt;</Box>
                      <Box component="span">&lt;/ion-icon&gt;</Box>
                      <br />
                      <Box component="span">&lt;ion-icon</Box>
                      <Box component="span">name=</Box>
                      <Box component="span">“share”</Box>
                      <Box component="span">slot=</Box>
                      <Box component="span">“end”</Box>
                      <Box component="span">&gt;</Box>
                      <Box component="span">&lt;/ion-icon&gt;</Box>
                      <br />
                      <Box component="span">&lt;/ion-item&gt;</Box>
                      <br />
                      <Box component="span">&lt;/ion-card-content&gt;</Box>
                      <br />
                      <Box component="span">&lt;/ion-card&gt;</Box>
                    </code>
                  </pre>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ bgcolor: 'greyEA' }}>
                <Box sx={{ maxWidth: '470px', mx: 'auto', pt: 6.1, pb: 10 }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, .2)',
                      mixBlendMode: 'normal',
                      borderRadius: 1,
                      mt: 2,
                      p: '2px',
                      maxWidth: 310,
                    }}
                  >
                    <IsDarkButton
                      title="Light"
                      lightOn={lightOn}
                      clickLightOn={() => {
                        setLightOn(1);
                        setDarkOn(0);
                      }}
                    />
                    <IsDarkButton
                      title="Dark"
                      darkOn={darkOn}
                      clickDarkOn={() => {
                        setDarkOn(1);
                        setLightOn(0);
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext> */}
        {/* ------test  */}

        <Button
          component={Link}
          noLinkStyle
          href="/getting-started/usage/"
          size="large"
          variant="contained"
          endIcon={<LibraryIcon />}
        >
          Explore the components
        </Button>
        <Typography>
          Material - UI has more than <b> 50 React components </b> ⚛️
        </Typography>
      </Container>
    </Box>
  );
}
function PremiumTemplate() {
  return (
    <Box sx={{ pb: { xs: 12.2, sm: 15 } }}>
      <Grid container spacing={0} sx={{ px: { xs: 2, sm: 3.7, lg: 0 } }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: 'relative', alignItems: 'center', display: 'flex', p: 0 }}
        >
          <Container
            sx={{
              p: 0,
              px: { xs: 0, sm: 3.7, lg: 0 },
              maxWidth: { lg: '470px !important', sm: '535px' },
              textAlign: 'left',
              mt: { xs: 0, sm: 0, lg: 0 },
              mb: { xs: 4.2, sm: 6, lg: 0 },
              mx: { xs: 0, sm: 0, lg: 'auto' },
            }}
          >
            <Typography
              variant="h1"
              align="left"
              sx={{
                mb: 2.5,
              }}
            >
              Premium templates
            </Typography>
            <Typography sx={{ mb: 4 }}>
              Take your project to the next level with premium themes from our store – all built on
              Material - UI.
            </Typography>
            <BrandingBulletItem iconSx={{ color: 'primary.main', mr: 0 }} variant="dark">
              4.8 / 5 average rating
            </BrandingBulletItem>
            <BrandingBulletItem iconSx={{ color: 'primary.main', mr: 0 }} variant="dark">
              10 crisp new templates
            </BrandingBulletItem>
            <BrandingBulletItem iconSx={{ color: 'primary.main', mr: 0 }} variant="dark">
              Build in React ⚛️
            </BrandingBulletItem>
            <Box sx={{ display: 'flex' }}>
              <Button
                sx={{ mr: { xs: 0.5, sm: 2.2 }, display: 'flex', mt: 4 }}
                component={Link}
                noLinkStyle
                href="/getting-started/usage/"
                size="large"
                variant="contained"
                endIcon={<BrowseTemplateIcon />}
                color="secondary"
              >
                Browse templates
              </Button>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              '& img': {
                width: '100%',
                verticalAlign: 'middle',
              },
            }}
          >
            <Image src={'/static/branding/home/PremiumTemplate.png'} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
interface OurSponsorCardProps {
  src?: string;
  label: string;
  topLabel?: string;
  href?: string;
  sx?: BoxProps['sx'];
  imgSx?: BoxProps['sx'];
  LabelSx?: BoxProps['sx'];
  DescSx?: BoxProps['sx'];
  boxSx?: BoxProps['sx'];
  description: React.ReactNode;
}
function OurSponsorCard(props: OurSponsorCardProps) {
  const {
    label,
    topLabel,
    description,
    src,
    href = '/',
    imgSx,
    LabelSx,
    DescSx,
    boxSx,
    sx,
  } = props;
  return (
    <Box sx={{ bgcolor: 'white', borderRadius: '4px', overflow: 'hidden', height: '100%', ...sx }}>
      <Box
        sx={{
          bgcolor: topLabel === 'Gold sponsor' ? 'rgb(255 200 70 / 20%)' : 'rgb(0 200 255 / 20%)',
          py: topLabel ? 1.2 : 0,
        }}
      >
        <Typography
          sx={{
            fontSize: '12px',
            textAlign: 'center',
            color: 'secondary.main',
            fontWeight: 'bold',
          }}
        >
          {topLabel}
        </Typography>
      </Box>
      <Box
        sx={{
          py: 2.6,
          px: 4,
          textAlign: 'center',
          minHeight: { xs: '326px', sm: '314px' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...boxSx,
        }}
      >
        <Box>
          <Image
            src={src}
            sx={{
              maxWidth: '120px',
              mx: 'auto',
              '& img': {
                verticalAlign: 'middle',
                width: '100%',
              },
              ...imgSx,
            }}
          />
          {topLabel ? (
            <Box
              component={Link}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: 'secondary.main',
                my: 1.8,
                textDecoration: 'none',
                '& svg': {
                  mt: '2px',
                },
              }}
              href={href}
            >
              <Typography variant="h4" component="h3" sx={{ mr: 1 }}>
                {label}
              </Typography>
              <ArrowCirleIcon />
            </Box>
          ) : (
            <Typography variant="h4" component="h3" sx={{ mr: 1, ...LabelSx }}>
              {label}
            </Typography>
          )}

          <Typography variant="body2" sx={{ ...DescSx }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
function OurSponsors() {
  return (
    <Box
      sx={{
        bgcolor: 'greyF3',
        pt: { xs: 10, sm: 15 },
        pb: { xs: 18.75, sm: 20 },
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src="/static/branding/block1-white.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          left: { xs: 'auto', sm: 0 },
          bottom: -40,
          right: { xs: '15px', sm: 'auto' },
        }}
      />
      <Box
        component="img"
        src="/static/branding/block11.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: -30,
          right: 40,
          display: { xs: 'none', lg: 'block' },
        }}
      />
      <Container sx={{ px: { xs: 2, sm: 7.5, lg: 0 } }}>
        <Typography variant="h2" align="center" sx={{ mb: { xs: 3, sm: 2.5 } }}>
          Our sponsors
        </Typography>
        <Typography variant="body1" align="center">
          The continued development and maintenance of Material - UI{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          is greatly helped by our generous sponsors.
        </Typography>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8 }, mt: 4 }}>
          <Button
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
            endIcon={<NavigateNextIcon />}
          >
            Become a sponsor
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <OurSponsorCard
              label={'Diamond sponsor'}
              topLabel={'Diamond sponsor'}
              src={'/static/branding/home/Octopus-deploy.svg'}
              description={<React.Fragment> Repetable, relyable deployments.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <OurSponsorCard
              label={'Doit International'}
              topLabel={'Diamond sponsor'}
              src={'/static/branding/home/Doit.svg'}
              description={
                <React.Fragment> Management platform for Google Clound and AWS.</React.Fragment>
              }
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            <OurSponsorCard
              sx={{
                border: '1px dashed #D7DCE1',
                borderRadius: '4px',
                bgcolor: 'transparent !important',
                mx: 'auto',
                maxWidth: {
                  sm: '348px',
                  lg: '100%',
                },
              }}
              imgSx={{
                background: 'white',
                boxShadow: '0px 2px 3px rgb(0 30 60 / 8%)',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '100px',
                mb: 4.7,
                mt: 3.5,
                '& img': {
                  width: '18px',
                },
              }}
              label={'Your company?'}
              src={'/static/branding/home/Add.svg'}
              description={
                <React.Fragment>
                  Support our cause.Contact us at{' '}
                  <Link href="mailto:sales@material-ui.com"> diamond@material-ui.com </Link> for pre
                  - approval.
                </React.Fragment>
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <OurSponsorCard
              imgSx={{ maxWidth: '70px' }}
              boxSx={{ minHeight: '258px' }}
              label={'Tidelift'}
              topLabel={'Gold sponsor'}
              src={'/static/branding/home/Tidelift.svg'}
              description={
                <React.Fragment> Enterprise - ready open source software.</React.Fragment>
              }
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            {' '}
            <OurSponsorCard
              imgSx={{ maxWidth: '70px' }}
              boxSx={{ minHeight: '258px' }}
              label={'Bit'}
              topLabel={'Gold sponsor'}
              src={'/static/branding/home/Bit.svg'}
              description={<React.Fragment> The fastest way to share code.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            {' '}
            <OurSponsorCard
              imgSx={{ maxWidth: '70px' }}
              boxSx={{ minHeight: '258px' }}
              label={'Text-em-all'}
              topLabel={'Gold sponsor'}
              src={'/static/branding/home/Text-em-all.svg'}
              description={<React.Fragment> The easy way to message your group.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            {' '}
            <OurSponsorCard
              imgSx={{ maxWidth: '70px' }}
              boxSx={{ minHeight: '258px' }}
              label={'Canada Casino'}
              topLabel={'Gold sponsor'}
              src={'/static/branding/home/Canada-casino.svg'}
              description={
                <React.Fragment>Safe and rewarding online casino experience </React.Fragment>
              }
              href="/discover-more/roadmap/"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default function Page() {
  return (
    <BrandingRoot>
      <Head
        title="Home page - Material-UI"
        description="Material-UI started back in 2014 to unify React and Material Design. Today, Material-UI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <BrandingHeader />
      <QuicklyBuild />
      <CustomerIcons />
      <LetStarted />
      <DesignResources />
      <WhyMaterialUix />
      <WhyEnterprise />
      <SimpleDeclarative />
      <PremiumTemplate />
      <OurSponsors />
      <BrandingDiscoverMore />
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
