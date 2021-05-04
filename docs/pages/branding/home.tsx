import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'docs/src/modules/components/Link';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Box, { BoxProps } from '@material-ui/core/Box';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import Head from 'docs/src/modules/components/Head';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingHeader from 'docs/src/modules/branding/BrandingHeader';
import CustomerIcons from 'docs/src/modules/branding/CustomerIcons';
import { useState } from 'react';
import ArrowCirleIcon from 'docs/src/modules/branding/icons/ArrowCircle';
import Image from 'docs/src/modules/branding/MaterialUixImage';

import {
  experimentalStyled as styled,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-root': {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
    // '&.Mui-expanded': {
    //   margin: 0,
    // },
  },
  '& .MuiSwitch-switchBase': {
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: 'red',
        opacity: 1,
        border: 'none',
      },
    },
  },
}));

function QuicklyBuild() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
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
              mb: 3.8,
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
            sx={{ mt: 7 }}
            control={<CustomSwitch checked={checked} onChange={handleChange} name="checked" />}
            label="Turn off the light"
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
            '& img': {
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
    <React.Fragment>
      <Typography variant="h2" align="center" sx={{ mb: 12.2 }}>
        Let’s get you started
      </Typography>
      <Box
        component="img"
        src="/static/branding/block10.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          left: { xs: '16px', sm: '60px', lg: '83px' },
          top: '-122px',
        }}
      />
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
              Install Material-UI's source files via npm. We take care of injecting the CSS needed.
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
              Material-UI components work without any additional setup, and don't pollute the global
              scope.
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
    </React.Fragment>
  );
}
const aboutCommunityData = [
  {
    label: 'Diamond sponsor',
    src: '/static/branding/home/Octopus-deploy.svg',
    topLabel: 'Diamond sponsor',
    description: <React.Fragment>Repetable, relyable deployments. </React.Fragment>,
  },
  {
    label: 'Doit International',
    // src: "/static/branding/home/Octopus-deploy.svg",
    topLabel: 'Diamond sponsor',
    description: <React.Fragment>Management platform for Google Clound and AWS.</React.Fragment>,
  },
  {
    label: 'Your company?',
    src: '/static/branding/home/Octopus-deploy.svg',
    topLabel: 'Gold sponsor',
    description: (
      <React.Fragment>
        Support our cause. Contact us at diamond@material-ui.com for pre-approval.
      </React.Fragment>
    ),
  },
  {
    label: 'Tidelift',
    src: '/static/branding/home/Octopus-deploy.svg',
    topLabel: 'Gold sponsor',
    description: <React.Fragment>Enterprise-ready open source software.</React.Fragment>,
  },
  {
    label: 'Bit',
    // src: "/static/branding/home/Octopus-deploy.svg",
    topLabel: 'Gold sponsor',
    description: <React.Fragment>The fastest way to share code.</React.Fragment>,
  },
  {
    label: 'Text-em-all',
    // src: "/static/branding/home/Octopus-deploy.svg",
    topLabel: 'Gold sponsor',
    description: <React.Fragment>The easy way to message your group.</React.Fragment>,
  },
  {
    label: 'Canada Casino',
    src: '/static/branding/home/Canada-casino.svg',
    topLabel: 'Gold sponsor',
    description: <React.Fragment>Safe and rewarding online casino experience</React.Fragment>,
  },
];

interface AboutCommunityCardProps {
  src?: string;
  label: string;
  topLabel?: string;
  href?: string;
  sx?: BoxProps['sx'];
  description: React.ReactNode;
}
function AboutCommunityCard(props: AboutCommunityCardProps) {
  const { label, topLabel, description, src, href, sx } = props;
  return (
    <Box sx={{ ...sx, bgcolor: 'white', borderRadius: '4px', overflow: 'hidden', height: '100%' }}>
      <Box
        sx={{ bgcolor: topLabel === 'Gold sponsor' ? 'sunglow' : 'rgb(0 200 255 / 20%)', py: 1.2 }}
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
      <Box sx={{ py: 2.6, px: 5, textAlign: 'center', minHeight: '120px' }}>
        <Box
          sx={{
            '& img': {
              verticalAlign: 'middle',
            },
          }}
        >
          <img alt="" src={src} loading="lazy" />
        </Box>
        <Box
          component={Link}
          sx={{
            textDecoration: 'none',
            '& svg': {
              mt: '2px',
            },
          }}
          // href={href}
          href={'/getting-started/usage/'}
        >
          <Typography variant="h4" component="h3" sx={{ mr: 1 }}>
            {label}
          </Typography>
          <ArrowCirleIcon />
        </Box>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  );
}
function AboutCommunity() {
  return (
    <Box sx={{ bgcolor: 'greyF3', pt: 15, pb: 20 }}>
      <Container>
        <Typography variant="h2" align="center" sx={{ mb: 2.5 }}>
          It’s all about the community
        </Typography>
        <Typography variant="body1" align="center">
          The continued development and maintenance of Material-UI is made possible by our generous
          sponsors.
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
            Become a Sponsor
          </Button>
        </Box>
        <Grid container spacing={1} sx={{ mt: 6 }}>
          <Grid item xs={12} md={6} lg={4} sx={{}}>
            <AboutCommunityCard
              label={'Diamond sponsor'}
              topLabel={'Diamond sponsor'}
              src={'/static/branding/home/Octopus-deploy.svg'}
              description={<React.Fragment>Repetable, relyable deployments.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{}}>
            <AboutCommunityCard
              label={'Doit International'}
              topLabel={'Diamond sponsor'}
              description={
                <React.Fragment>Management platform for Google Clound and AWS.</React.Fragment>
              }
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{}}>
            <AboutCommunityCard
              label={'Your company?'}
              src={'/static/branding/home/Add.svg'}
              description={
                <React.Fragment>
                  Support our cause. Contact us at diamond@material-ui.com for pre-approval.
                </React.Fragment>
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{}}>
          <Grid item xs={12} md={6} lg={3} sx={{}}>
            <AboutCommunityCard
              label={'Tidelift'}
              topLabel={'Gold sponsor'}
              description={<React.Fragment>Enterprise-ready open source software.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{}}>
            {' '}
            <AboutCommunityCard
              label={'Bit'}
              topLabel={'Gold sponsor'}
              description={<React.Fragment>The fastest way to share code.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{}}>
            {' '}
            <AboutCommunityCard
              label={'Text-em-all'}
              topLabel={'Gold sponsor'}
              description={<React.Fragment>The easy way to message your group.</React.Fragment>}
              href="/discover-more/roadmap/"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{}}>
            {' '}
            <AboutCommunityCard
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
      <AboutCommunity />
    </BrandingRoot>
  );
}
