import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'docs/src/modules/components/Link';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box, { BoxProps } from '@material-ui/core/Box';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MaterialXIcon from 'docs/src/modules/branding/icons/MaterialX';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import Head from 'docs/src/modules/components/Head';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingHeader from 'docs/src/modules/branding/BrandingHeader';
import CustomerIcons from 'docs/src/modules/branding/CustomerIcons';
import { useState } from 'react';
import ArrowCirleIcon from 'docs/src/modules/branding/icons/ArrowCircle';
import Image from 'docs/src/modules/branding/MaterialUixImage';
import MaterialUix from 'docs/src/modules/branding/MaterialUix';
import { experimentalStyled as styled } from '@material-ui/core/styles';

// const CustomSwitch = styled(Switch)(({ theme }) => ({
//   '&.MuiSwitch-root': {
//     width: '72px',
//     height: '44px',
//   },
//   '& .MuiSwitch-thumb': {
//     width: '32px',
//     height: '32px',
//     borderRadius: '50%',
//     top: '-3px',
//     position: 'relative',
//     backgroundColor: '#001e3c',
//     backgroundImage: `url(${'/static/branding/home/Switch-button.svg'})`,
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: '100px',
//     backgroundColor: '#AAB4BE',
//   },
// }));

function QuicklyBuild() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const CustomSwitch = styled(Switch)(({ theme }) => ({
    '&.MuiSwitch-root': {
      width: '72px',
      height: '44px',
    },
    '& .MuiSwitch-thumb': {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      top: '-3px',
      position: 'relative',
      backgroundColor: '#001e3c',
      backgroundImage: `url(${
        checked
          ? '/static/branding/home/Turn-on-light.svg'
          : '/static/branding/home/Turn-off-light.svg'
      })`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    '& .MuiSwitch-track': {
      borderRadius: '100px',
      backgroundColor: '#AAB4BE',
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
            <UnderlinedText>Quickly</UnderlinedText> build beautiful React UIs
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Material-UI is a simple and customizable component library to build faster, beautiful,
            and more accessible React applications. Follow your own design system, or start with
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
              Material UI-X
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
            bgcolor: checked ? '#001E3C' : '#EAEEF3',
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
              Install Material-UI&apos;s source files via npm. We take care of injecting the CSS
              needed.
            </Typography>
            <Box
              sx={{
                bgcolor: 'secondary.main',
                borderRadius: '4px',
                px: 2.5,
                py: 2.5,
                fontSize: '16px',
                lineHeight: '19px',
                color: 'white',
                '& p': {
                  mb: 4,
                },
              }}
              component="p"
            >
              $ npm install @material-ui/core
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 4, mb: 2.2 }}>
              our use a <Link href="mailto:sales@material-ui.com">CDN</Link>{' '}
              <Box component="span" sx={{ display: { lg: 'block' } }} /> Load the default Roboto
              font.
            </Typography>
            <Box sx={{ bgcolor: 'secondary.main', borderRadius: '4px' }}>
              <Typography>
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
              </Typography>
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
              Material-UI components work without any additional setup, and don&apos;t pollute the
              global scope.
            </Typography>
            <Box sx={{ bgcolor: 'secondary.main', borderRadius: '4px', mt: 4, mb: 2.2 }}>
              {/* import React from 'react'; import {Button} from '@material-ui/core'; */}
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
        what good is that nice design system if you can&apos;t use it?
        <br />
        <br />
        Material-UI is simple to customize by design, which means that you are in complete and full
        control of how your components render down to the very last component, class or style.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/home/Savetime.svg',
    title: 'Save time',
    description: (
      <React.Fragment>
        You want your components to be powerful, but without sacrificing how they look! After all,
        what good is that nice design system if you can&apos;t use it?
        <br />
        <br />
        Material-UI is simple to customize by design, which means that you are in complete and full
        control of how your components render down to the very last component, class or style.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/home/Accesibility.svg',
    title: 'Accesibility',
    description: (
      <React.Fragment>
        All our components have built-in support for accessibility allowing you to reach a larger
        audience. We think about it, so you don&apos;t have to.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/home/Completeness.svg',
    title: 'Completeness',
    description: (
      <React.Fragment>
        Because of the sustainability challenge of developing open source components, no open source
        UI library can provide enough high quality components. Sometimes for advanced components
        such as a data grid, there isn’t even an open source alternative to turn to. <br /> <br />{' '}
        Material-UI X will support all the most needed UI components, without sacrificing quality.
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
      <Container sx={{ px: { sm: 7.3 } }}>
        <Typography variant="h2" align="center" sx={{ mb: { xs: 8, sm: 10 } }}>
          Why Material-UI?
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
            color: '#AAB4BE',
          }}
        >
          The last React UI library you’ll ever need. It contains the best React Data
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

interface OurSponsorCardProps {
  src?: string;
  label: string;
  topLabel?: string;
  href?: string;
  sx?: BoxProps['sx'];
  imgSx?: BoxProps['sx'];
  LabelSx?: BoxProps['sx'];
  DescSx?: BoxProps['sx'];
  description: React.ReactNode;
}
function OurSponsorCard(props: OurSponsorCardProps) {
  const { label, topLabel, description, src, href = '/', imgSx, LabelSx, DescSx, sx } = props;
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
      <Box sx={{ py: 2.6, px: 4, textAlign: 'center', minHeight: '120px' }}>
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
              color: '#001E3C',
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
  );
}
function OurSponsors() {
  return (
    <Box sx={{ bgcolor: 'greyF3', pt: 15, pb: 20, position: 'relative' }}>
      <Box
        component="img"
        src="/static/branding/block1-white.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          left: 0,
          bottom: -40,
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
        }}
      />
      <Container>
        <Typography variant="h2" align="center" sx={{ mb: 2.5 }}>
          Our sponsors
        </Typography>
        <Typography variant="body1" align="center">
          The continued development and maintenance of Material-UI{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          is greatly helped by our generous sponsors.
        </Typography>
        <Box sx={{ textAlign: 'center', mb: 8, mt: 4 }}>
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
        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid item xs={12} md={6} lg={4} sx={{}}>
            <OurSponsorCard
              label={'Diamond sponsor'}
              topLabel={'Diamond sponsor'}
              src={'/static/branding/home/Octopus-deploy.svg'}
              description={<React.Fragment>Repetable, relyable deployments.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{}}>
            <OurSponsorCard
              label={'Doit International'}
              topLabel={'Diamond sponsor'}
              src={'/static/branding/home/Doit.svg'}
              description={
                <React.Fragment>Management platform for Google Clound and AWS.</React.Fragment>
              }
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{}}>
            <OurSponsorCard
              sx={{
                border: '1px dashed #D7DCE1',
                borderRadius: '4px',
                bgcolor: 'transparent !important',
              }}
              imgSx={{
                background: '#FFFFFF',
                boxShadow: '0px 2px 3px rgb(0 30 60 / 8%)',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '100px',
                marginBottom: '38px',
                '& img': {
                  width: '18px',
                  // width: '18px !important',
                },
              }}
              label={'Your company?'}
              src={'/static/branding/home/Add.svg'}
              description={
                <React.Fragment>
                  Support our cause. Contact us at{' '}
                  <Link href="mailto:sales@material-ui.com">diamond@material-ui.com</Link> for
                  pre-approval.
                </React.Fragment>
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid item xs={12} md={6} lg={3} sx={{}}>
            <OurSponsorCard
              imgSx={{ maxWidth: '70px' }}
              label={'Tidelift'}
              topLabel={'Gold sponsor'}
              src={'/static/branding/home/Tidelift.svg'}
              description={<React.Fragment>Enterprise-ready open source software.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{}}>
            {' '}
            <OurSponsorCard
              imgSx={{ maxWidth: '70px' }}
              label={'Bit'}
              topLabel={'Gold sponsor'}
              src={'/static/branding/home/Bit.svg'}
              description={<React.Fragment>The fastest way to share code.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{}}>
            {' '}
            <OurSponsorCard
              imgSx={{ maxWidth: '70px' }}
              label={'Text-em-all'}
              topLabel={'Gold sponsor'}
              src={'/static/branding/home/Text-em-all.svg'}
              description={<React.Fragment>The easy way to message your group.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{}}>
            {' '}
            <OurSponsorCard
              imgSx={{ maxWidth: '70px' }}
              label={'Canada Casino'}
              topLabel={'Gold sponsor'}
              src={'/static/branding/home/Canada-casino.svg'}
              description={
                <React.Fragment>Safe and rewarding online casino experience</React.Fragment>
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
      <WhyMaterialUix />
      <OurSponsors />
    </BrandingRoot>
  );
}
