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
import DesignResourcesCard from 'docs/src/modules/branding/DesignResourcesCard';
import CommunitySayCard from 'docs/src/modules/branding/CommunitySayCard';

import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

// Start QuicklyBuild
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
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <UnderlinedText>Quickly </UnderlinedText> build beautiful React UIs
          </Typography>
          <Typography
            variant="h1"
            align="left"
            sx={{
              mb: 4,
              display: { xs: 'block', lg: 'none' },
            }}
          >
            <UnderlinedText>React</UnderlinedText> <br />
            components <br />
            for fast &<br /> beautiful apps.
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Material - UI is a simple and customizable component library to build faster, beautiful,
            and more accessible React applications.Follow your own design system, or start with
            Material Design.
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Button
              sx={{
                mr: { xs: 0.5, sm: 2.2 },
                display: 'flex',
                px: 2.5,
                '& .MuiButton-endIcon': {
                  ml: { xs: 0, sm: 1 },
                },
              }}
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
              sx={{
                display: { xs: 'none', sm: 'flex' },
              }}
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
            sx={{ mt: { lg: 6, xs: 6 } }}
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
// end QuicklyBuild
const communityData = [
  {
    isGithub: true,
    accountTypeImg: '/static/branding/home/Github.svg',
    description: (
      <React.Fragment>
        61,638 Stars on{' '}
        <Link href="mailto:sales@material-ui.com" sx={{ color: '#001E3C' }}>
          Github
        </Link>
      </React.Fragment>
    ),
  },
  {
    name: 'Jonathan Smith, CTO at Zendesk',
    avatar: '/static/branding/material-ui-x/community2.png',
    accountTypeImg: '/static/branding/home/DoubleQuote.svg',
    description: (
      <React.Fragment>
        “Many of us are so used to working on a computer desktop that when it comes time to purchase
        a new computer, we don’t consider other options. Today, computer notebooks – which were once
        called laptops…”
      </React.Fragment>
    ),
  },
  {
    accountTypeImg: '/static/branding/home/Twitter-white.svg',
    isTwitter: true,
    description: (
      <React.Fragment>
        12,442 Followers on{' '}
        <Link href="mailto:sales@material-ui.com" sx={{ textDecoration: 'underline' }}>
          Twitter
        </Link>
      </React.Fragment>
    ),
  },
  {
    accountTypeImg: '/static/branding/home/DoubleQuote.svg',
    name: 'Jonathan Smith, CTO at Zendesk',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        “Many of us are so used to working on a computer desktop that when it comes time to purchase
        a new computer, we don’t consider other options. Today, computer notebooks – which were once
        called laptops…”
      </React.Fragment>
    ),
  },
  {
    isGithub: true,
    accountTypeImg: '/static/branding/home/Github.svg',
    description: (
      <React.Fragment>
        61,638 Stars on{' '}
        <Link
          href="https://github.com/mui-org/material-ui"
          sx={{ textDecoration: 'underline', color: '#001E3C' }}
        >
          Github
        </Link>
      </React.Fragment>
    ),
  },
  {
    name: 'Jonathan Smith, CTO at Zendesk',
    avatar: '/static/branding/material-ui-x/community2.png',
    accountTypeImg: '/static/branding/home/DoubleQuote.svg',
    description: (
      <React.Fragment>
        “Many of us are so used to working on a computer desktop that when it comes time to purchase
        a new computer, we don’t consider other options. Today, computer notebooks – which were once
        called laptops…”
      </React.Fragment>
    ),
  },
  {
    accountTypeImg: '/static/branding/home/Twitter-white.svg',
    isTwitter: true,
    description: (
      <React.Fragment>
        12,442 Followers on <Link href="mailto:sales@material-ui.com">Twitter</Link>
      </React.Fragment>
    ),
  },
  {
    accountTypeImg: '/static/branding/home/DoubleQuote.svg',
    name: 'Jonathan Smith, CTO at Zendesk',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        “Many of us are so used to working on a computer desktop that when it comes time to purchase
        a new computer, we don’t consider other options. Today, computer notebooks – which were once
        called laptops…”
      </React.Fragment>
    ),
  },
];
function Community() {
  const [currentSlider, setCurrentSlider] = useState(3);
  const [preSlider, setPreSlider] = useState(0);
  const handlePreview = () => {
    if (preSlider > 0) {
      setCurrentSlider(currentSlider - 1);
      setPreSlider(preSlider - 1);
    } else {
      setCurrentSlider(3);
      setCurrentSlider(3);
    }
  };
  const handleNext = () => {
    if (currentSlider < 8) {
      setCurrentSlider(currentSlider + 1);
      setPreSlider(preSlider + 1);
    } else {
      setCurrentSlider(3);
      setPreSlider(0);
    }
  };
  return (
    <Box sx={{ pb: { xs: 11, sm: 20 }, pt: { xs: 2, sm: 10, lg: 0 } }}>
      <Container sx={{ px: { xs: 2, sm: 7.5, lg: 3 } }}>
        <Typography variant="h2" align="left" sx={{ mb: { xs: 5, sm: 8 } }}>
          Backed by <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />a
          community <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          of <Box component="span" sx={{ display: { sm: 'block', lg: 'none' } }} />
          more <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
          than
          <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />{' '}
          <UnderlinedText>2M developers </UnderlinedText>.
        </Typography>
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <button type="button" onClick={handlePreview}>
            Pre
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
          <div className="slider">
            {communityData.slice(preSlider, currentSlider).map((data, j) => (
              <section key={j}>
                <CommunitySayCard
                  key={j}
                  name={data.name}
                  description={data.description}
                  avatar={data.avatar}
                  accountTypeImg={data.accountTypeImg}
                  sx={{
                    p: { xs: 2, sm: 5 },
                    paddingRight: { xs: '16px !important', sm: '35px !important' },
                    borderRadius: '4px',
                    mt: 0,
                  }}
                  isGithub={data.isGithub}
                  isTwitter={data.isTwitter}
                  descSx={{ m: '0px !important', fontSize: { xs: 20, sm: 24 } }}
                  boxSx={{ mt: 3 }}
                  imgSx={{
                    width: data.isTwitter || data.isGithub ? '64px' : 'auto',
                    height: data.isTwitter || data.isGithub ? '64px' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: data.isTwitter || data.isGithub ? 'center' : '',
                    borderRadius: data.isTwitter || data.isGithub ? '100px' : '0px',
                    mb: data.isTwitter || data.isGithub ? 4 : 2.5,
                  }}
                  nameSx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 'normal' }}
                />
              </section>
            ))}
            <style>
              {`
              .slider {
                font-family: sans-serif;
                scroll-snap-type: x mandatory;
                display: flex;
                -webkit-overflow-scrolling: touch;
                overflow-x: scroll;
                margin: 0 -15px;
              }
              section {
              scroll-snap-align: start;
              position: relative;
              padding: 0 15px;
              }
              section:nth-child(odd){
                min-width:300px
              }
              section:nth-child(even){
                min-width:500px
              }
              @media(max-width:767px){
                section{
                      min-width: 100%;
                }
                section:nth-child(odd){
                  min-width:187px
                }
                section:nth-child(even){
                  min-width:375px
                }
              }
              `}
            </style>
          </div>
        </Box>
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <div className="slider">
            {communityData.map((data, j) => (
              <section key={j}>
                <CommunitySayCard
                  key={j}
                  uniqueKey={j}
                  name={data.name}
                  description={data.description}
                  avatar={data.avatar}
                  accountTypeImg={data.accountTypeImg}
                  sx={{
                    p: { xs: 2, sm: 5 },
                    paddingRight: { xs: '16px !important', sm: '35px !important' },
                    borderRadius: '4px',
                    mt: 0,
                  }}
                  isGithub={data.isGithub}
                  isTwitter={data.isTwitter}
                  descSx={{ m: '0px !important', fontSize: { xs: 20, sm: 24 } }}
                  boxSx={{ mt: 3 }}
                  imgSx={{
                    width: data.isTwitter || data.isGithub ? '64px' : 'auto',
                    height: data.isTwitter || data.isGithub ? '64px' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: data.isTwitter || data.isGithub ? 'center' : '',
                    borderRadius: data.isTwitter || data.isGithub ? '100px' : '0px',
                    mb: data.isTwitter || data.isGithub ? 4 : 2.5,
                  }}
                  nameSx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 'normal' }}
                />
              </section>
            ))}
            <style>
              {`
              .slider {
                font-family: sans-serif;
                scroll-snap-type: x mandatory;
                display: flex;
                -webkit-overflow-scrolling: touch;
                overflow-x: scroll;
                margin: 0 -15px;
              }
              section {
              scroll-snap-align: start;
              position: relative;
              padding: 0 15px;
              }
              section:nth-child(odd){
                min-width:300px
              }
              section:nth-child(even){
                min-width:500px
              }
              @media(max-width:767px){
                section{
                      min-width: 100%;
                }
                section:nth-child(odd){
                  min-width:187px
                }
                section:nth-child(even){
                  min-width:375px
                }
              }
              `}
            </style>
          </div>
        </Box>
      </Container>
    </Box>
  );
}

// Start LetStarted
interface CodeTagProps {
  snippet: string;
  color?: string;
}
function CodeTag(props: CodeTagProps) {
  const { snippet, color = 'white' } = props;
  return (
    <Box
      component="span"
      sx={{ color: color, fontFamily: 'PT Mono', fontSize: '16px', lineHeight: '19px' }}
    >
      {snippet}
    </Box>
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
          left: { xs: 16, sm: 60, lg: '50%' },
          transform: { sm: 'none', lg: 'translateX(-50%)' },
          bottom: '-40px',
          position: 'absolute',
          top: 'auto',
        }}
      />
      <Typography variant="h2" align="center" sx={{ mb: 12.2 }}>
        Let’s get you <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
        started
      </Typography>

      <Grid container spacing={0} sx={{ mb: { md: 15 } }}>
        <Grid item xs={12} md={6} sx={{ bgcolor: 'greyF3', px: { xs: 2, sm: 0 } }}>
          <Box sx={{ maxWidth: '470px', mx: 'auto', pt: 6.1, pb: 12 }}>
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
            <Typography variant="h2" align="center" sx={{ mt: 4, mb: 2.5 }}>
              Installation
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              Install Material - UI&apos;s source files via npm.We take care of injecting the CSS
              needed.
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
                <CodeTag snippet={'$ npm install @material-ui/core'} />
              </pre>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 4, mb: 2.5 }}>
              our use a <Link href="mailto:sales@material-ui.com"> CDN </Link>{' '}
              <Box component="span" sx={{ display: 'block' }} /> Load the default Roboto font.
            </Typography>
            <Box
              sx={{
                bgcolor: 'secondary.main',
                borderRadius: '4px',
                px: 2.5,
                overflowY: 'auto',
                color: 'white',
              }}
            >
              <pre>
                &lt;
                <CodeTag snippet={`link`} color="#A03D52" />
                &nbsp;
                <CodeTag snippet={`rel=`} color="#1CB661" />
                <CodeTag snippet={`"stylesheet"`} color="#FFC846" />
                &nbsp;
                <CodeTag snippet={`href=`} color="#1CB661" />
                <CodeTag
                  snippet={`"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"`}
                  color="#FFC846"
                />
                &nbsp;/&gt;
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
        <Grid item xs={12} md={6} sx={{ px: { xs: 2, sm: 0 } }}>
          <Box sx={{ maxWidth: '470px', mx: 'auto', pt: 6.1, pb: { xs: 13.5, sm: 16, lg: 10 } }}>
            <Avatar
              sx={{
                bgcolor: 'vividBlue',
                width: 100,
                height: 100,
                mt: { lg: -12.5, sm: 0 },
                mb: 0,
                mx: 'auto',
              }}
            >
              <img loading="lazy" src={'/static/branding/home/Usage.svg'} alt="" />
            </Avatar>
            <Typography variant="h2" align="center" sx={{ mt: 4, mb: 2.5 }}>
              Usage
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              Material - UI components work without any additional setup, and don&apos;t pollute the
              global scope.
            </Typography>
            <Box
              sx={{
                bgcolor: 'secondary.main',
                borderRadius: '4px',
                px: 2.5,
                overflowY: 'auto',
                color: 'white',
              }}
            >
              <pre>
                <CodeTag snippet={'import'} color="vividBlue" />
                &nbsp; React &nbsp;
                <CodeTag snippet={'from'} color="vividBlue" />
                &nbsp;
                <CodeTag snippet={"'react'"} color="#1CB661" />
                ;
                <br />
                <CodeTag snippet={'import'} color="vividBlue" />
                &nbsp;
                <CodeTag snippet={'{ Button }'} /> &nbsp;
                <CodeTag snippet={'from'} color="vividBlue" />
                &nbsp;
                <CodeTag snippet={"'@material-ui/core'"} color="#1CB661" />;
                <br />
                <CodeTag snippet={'function'} color="vividBlue" />
                &nbsp;
                <CodeTag snippet={'App'} color="#FFC846" /> &#40;&#41;&nbsp;&#123; &nbsp;&nbsp;
                <br />
                &nbsp;
                <CodeTag snippet={'return'} color="vividBlue" />
                &nbsp;&lt;
                <CodeTag snippet={'Button'} color="#FFC846" />
                &nbsp;
                <CodeTag snippet={'color'} color="#1CB661" />=
                <CodeTag snippet={'"primary"'} color="#FFC846" />
                &gt;Hello <br />
                World &lt;
                <CodeTag snippet={'/Button'} color="#FFC846" />
                &gt;;
                <br />
                <CodeTag snippet={'}'} />
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
// End LetStarted

// Start DesignResources

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
function DesignResources() {
  return (
    <Box sx={{ pb: { xs: 11.2, sm: 12.5 }, pt: { xs: 15.5, sm: 17.8, lg: 0 } }}>
      <Container sx={{ px: { xs: 2, sm: 8.7, lg: 3 } }}>
        <Typography align="center" variant="h3" sx={{ mb: 2.5 }}>
          Looking for design resources?
        </Typography>
        <Typography align="center" sx={{ mb: 6 }}>
          A set of reusable components for design tools is{' '}
          <Box component="span" sx={{ display: { sm: 'block', lg: 'none' } }} /> available,
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} /> designed to match
          the React <Box component="span" sx={{ display: { sm: 'block', lg: 'none' } }} />
          components, and to help you
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} /> craft great
          <Box component="span" sx={{ display: { sm: 'block', lg: 'none' } }} />
          products:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '717px',
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
// End DesignResources

// Start WhyMaterialUix

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
        what good is that nice design system if you can&apos;t use it ?
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
        audience.We think about it, so you don&apos;t have to.
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
          left: { xs: 16, sm: 33 },
        }}
      />
      <Container sx={{ px: { sm: 7.3, lg: 3 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: { xs: 8, sm: 10 }, fontSize: { xs: '36px', sm: '48px', lg: '52px' } }}
        >
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
        <Typography variant="h1" align="center" sx={{ display: { xs: 'block', lg: 'none' } }}>
          Material-UI X
        </Typography>
        <Typography
          variant="body3"
          sx={{
            mt: { xs: 2.4, sm: 2.5, lg: 4.3 },
            maxWidth: 670,
            mx: 'auto',
            textAlign: 'center',
            fontWeight: 'normal',
            color: 'greyAA',
            display: 'block',
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
              mr: -4,
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
              in our organization.What&apos;s more, Material - UI&apos;s well architected
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
// End WhyMaterialUix

// Start SimpleDeclarative
interface IsDarkButtonProps {
  title: string;
  lightOn?: number;
  darkOn?: number;
  clickDarkOn?: any;
  clickLightOn?: any;
}
const Button1 = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    padding: '4px 8px',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '20px',
    minWidth: '65px',
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.text.primary,
    },
  },
  '&.MuiButton-label': {
    textTransform: 'capitalize',
  },
}));

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
              color: 'grey87',
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
      <Image
        src={
          title === 'Light' ? '/static/branding/home/Light.svg' : '/static/branding/home/Dark.svg'
        }
        sx={{
          mr: 0.7,
          '& img': {
            verticalAlign: 'middle',
            marginTop: '-1px',
          },
        }}
      />
      {title}
    </Button1>
  );
}
function TabContent() {
  const [lightOn, setLightOn] = useState(1);
  const [darkOn, setDarkOn] = useState(0);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={6} sx={{ bgcolor: 'secondary.main', overflowY: 'auto' }}>
        <Box
          sx={{
            px: 3.5,
            py: 7.5,
            position: 'relative',
          }}
        >
          <Box sx={{ fontSize: '16px', lineHeight: '19px', fontFamily: 'PT Mono', color: 'white' }}>
            <Image
              src={'/static/branding/home/Dot.svg'}
              sx={{ position: 'absolute', left: 20, top: 20 }}
            />
            <pre>
              <CodeTag snippet={`<ion-card>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-img`} color="vividBlue" />
              &nbsp;
              <CodeTag snippet={`src=`} color="#1CB661" />
              <CodeTag snippet={`"/assets/shirt-white.jpg"`} />
              <CodeTag snippet={`></ion-img>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-card-content>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-fab>`} color="vividBlue" />
              <CodeTag snippet={`<ion-icon`} color="vividBlue" />
              &nbsp;
              <CodeTag snippet={`name=`} color="#1CB661" />
              <CodeTag snippet={`“like”`} />
              <br />
              <CodeTag snippet={`slot=`} color="#1CB661" />
              <CodeTag snippet={`“end”`} color="#FFC846" />
              <CodeTag snippet={`></ion-icon></ion-fab>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-card-header>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-card-subtitle>`} color="vividBlue" />
              <CodeTag snippet={`Material-UI`} />
              <CodeTag snippet={`</ion-card-subtitle>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<on-card-title>`} color="vividBlue" />
              <CodeTag snippet={`Material-UI`} />
              <CodeTag snippet={`</ion-card-title>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`</ion-card-header>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<p`} color="vividBlue" />
              &nbsp;
              <CodeTag snippet={`className=`} color="#1CB661" />
              <CodeTag snippet={`“price-tag”`} />
              <CodeTag snippet={`>`} color="vividBlue" />
              <CodeTag snippet={`€29,-`} />
              <CodeTag snippet={`</p>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-item>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-button`} color="vividBlue" />
              &nbsp;
              <CodeTag snippet={`fill=`} color="#1CB661" />
              <CodeTag snippet={`"solid"`} />
              <CodeTag snippet={`>`} color="vividBlue" />
              <CodeTag snippet={`Action`} />
              <CodeTag snippet={`</ion-button>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-icon`} color="vividBlue" />
              &nbsp;
              <CodeTag snippet={`name=`} color="#1CB661" />
              <CodeTag snippet={`“heart”`} />
              &nbsp;
              <CodeTag snippet={`slot=`} color="#1CB661" />
              <CodeTag snippet={`“end”`} color="#FFC846" />
              <CodeTag snippet={`></ion-icon>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`<ion-icon`} color="vividBlue" />
              &nbsp;
              <CodeTag snippet={`name=`} color="#1CB661" />
              <CodeTag snippet={`“share”`} />
              &nbsp;
              <CodeTag snippet={`slot=`} color="#1CB661" />
              <CodeTag snippet={`“end”`} color="#FFC846" />
              <CodeTag snippet={`></ion-icon>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`</ion-item>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`</ion-card-content>`} color="vividBlue" />
              <br />
              <CodeTag snippet={`</ion-card>`} color="vividBlue" />
            </pre>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          bgcolor: 'greyEA',
          height: 'auto',
          position: 'relative',
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          py: 12.6,
          px: 3.7,
        }}
      >
        <Box
          component="img"
          src="/static/branding/block1-white.svg"
          loading="lazy"
          alt=""
          sx={{
            position: 'absolute',
            bottom: '-40px',
            right: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#E5E8EC',
            borderRadius: '4px',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
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
        <Image src={'/static/branding/home/Cards.png'} sx={{ '& img': { width: '100%' } }} />
      </Grid>
    </Grid>
  );
}
const CustomTab = styled(Tab)(({ theme }) => ({
  '&.MuiTab-root': {
    minWidth: 'auto',
    padding: '0',
    margin: '0 30px',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: theme.spacing(3.75),
    letterSpacing: '-0.5px',
    color: theme.palette.greyAA,
    textTransform: 'initial',
  },

  '&.Mui-selected': {
    color: theme.palette.secondary.main,
  },
}));
const CustomTabs = styled(TabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.secondary.main,
    minWidth: theme.spacing(8.25),
  },
}));
const CustomTabPanel = styled(TabPanel)(({ theme }) => ({
  '&.MuiTabPanel-root': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6.7),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),

      marginBottom: theme.spacing(3),
    },
  },
}));

function SimpleDeclarative() {
  const [value, setValue] = useState('0');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ pt: { xs: 13.1, sm: 15 }, pb: { xs: 10, sm: 15, lg: 18 } }}>
      <Container sx={{ px: { sm: 3.75, lg: 3 } }}>
        <Typography variant="h1" align="center" sx={{ mb: 2.5 }}>
          Simple, <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} /> declarative
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          <UnderlinedText> components </UnderlinedText>
        </Typography>
        <Typography align="center" sx={{ mb: { xs: 3, sm: 8 } }}>
          Material - UI’s components are written in React making it easy to build{' '}
          <Box component="span" sx={{ display: { sm: 'block', lg: 'none' } }} />
          modern, <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
          high quality UIs that perform great everywhere.
        </Typography>
        <TabContext value={value}>
          <CustomTabs onChange={handleChange} aria-label="simple tabs example" centered>
            <CustomTab label="Cards" value="0" />
            <CustomTab label="Avatars" value="1" />
            <CustomTab label="Colors" value="2" />
          </CustomTabs>
          <CustomTabPanel value="0">
            <TabContent />
          </CustomTabPanel>
          <CustomTabPanel value="1">
            <TabContent />
          </CustomTabPanel>
          <CustomTabPanel value="2">
            <TabContent />
          </CustomTabPanel>
        </TabContext>
        <Box sx={{ textAlign: 'center', mb: 3.8 }}>
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
        </Box>

        <Typography align="center" sx={{ display: { xs: 'none', lg: 'block' } }}>
          Material - UI has more than <b> 50 React components </b> ⚛️
        </Typography>
        <Typography align="center" sx={{ display: { xs: 'block', lg: 'none' } }}>
          Material-UI has more than{' '}
          <b>
            2,500
            <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} /> components
          </b>{' '}
          <Box component="span" sx={{ display: { xs: 'block', lg: 'none' } }} />
          integrated with React.js ⚛️
        </Typography>
      </Container>
    </Box>
  );
}
// End SimpleDeclarative

// Start PremiumTemplate
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
// End PremiumTemplate

// Start OurSponsors

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
            fontSize: '12px !important',
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
                border: '1px dashed rgb(215 220 225)',
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
// End OurSponsors
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
      <Community />
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
