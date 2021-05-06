import React from 'react';
import { Container, Typography, Grid, Button, Box, Avatar } from '@material-ui/core';
import MaterialLink from '@material-ui/core/Link';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InLabIcon from 'docs/src/modules/branding/icons/InLab';
import WorkInProgressIcon from 'docs/src/modules/branding/icons/WorkInProgress';
import PlanningBuildIcon from 'docs/src/modules/branding/icons/PlanningBuild';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';
import BrandingDiscoverMore from 'docs/src/modules/branding/BrandingDiscoverMore';
import MaterialUix from 'docs/src/modules/branding/MaterialUix';
import CommunitySayCard from 'docs/src/modules/branding/CommunitySayCard';
import Link from 'docs/src/modules/components/Link';
import RoadMapDetailCard from 'docs/src/modules/branding/RoadMapDetailCard';
import ExclusiveFeaturesCard from 'docs/src/modules/branding/ExclusiveFeaturesCard';
import Image from 'docs/src/modules/branding/MaterialUixImage';
import CustomerIcons from 'docs/src/modules/branding/CustomerIcons';
import Head from 'docs/src/modules/components/Head';
import BrandingHeader from 'docs/src/modules/branding/BrandingHeader';

function AdvancedReactComponent() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        position: 'relative',
      }}
    >
      <Container>
        <Image
          src="/static/branding/material-ui-x/material-ui-x-logo.svg"
          sx={{ display: { xs: 'none', lg: 'block' }, pt: 16, mb: 3.8, textAlign: 'center' }}
        />
        <Typography variant="h1" align="center" sx={{ display: { xs: 'none', lg: 'block' } }}>
          <UnderlinedText>Advanced</UnderlinedText> React <br />
          components
        </Typography>
        <Typography
          variant="h1"
          align="center"
          sx={{ pt: { xs: 6, sm: 9 }, display: { xs: 'block', lg: 'none' } }}
        >
          The most <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          ambitious <Box component="span" sx={{ display: { xs: 'block' } }} /> products
          <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} /> depend on{' '}
          <Box component="span" sx={{ display: { xs: 'block' } }} />
          <UnderlinedText>Material-UI X</UnderlinedText>
        </Typography>
        <Typography
          sx={{
            mt: { xs: 4, sm: 4, lg: 3.8 },
            maxWidth: 670,
            mx: 'auto',
            textAlign: 'center',
            fontWeight: 'normal',
          }}
        >
          Material-UI X is the last React UI library you&apos;ll ever need.{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          It contains the best React Data Grid on the market and a{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> growing list of
          advanced components.
        </Typography>
        <Box sx={{ textAlign: 'center', mt: { xs: 4, lg: 7.2 } }}>
          <Button
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
            endIcon={<NavigateNextIcon />}
          >
            See pricing
          </Button>
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
            Explore Library
          </Button>

          <Image
            src={'/static/branding/material-ui-x/AdvancedReactCalender.png'}
            sx={{
              display: { xs: 'none', lg: 'block' },
              mt: 8,
              '& img': {
                verticalAlign: 'bottom',
                width: '100%',
              },
            }}
          />
          <Image
            src={'/static/branding/material-ui-x/AdvancedReactCalenderIpad.png'}
            sx={{
              display: { xs: 'none', sm: 'block', lg: 'none' },
              right: '-24px',
              position: 'relative',
              mt: 9.5,
              '& img': {
                verticalAlign: 'bottom',
                width: '100%',
              },
            }}
          />
          <Image
            src={'/static/branding/material-ui-x/AdvancedReactCalenderMobile.png'}
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

// Started WhyMaterialUix secion
const materialUixData = [
  {
    src: '/static/branding/material-ui-x/7_ReactX.svg',
    title: 'Built exclusively for React',
    description: (
      <React.Fragment>
        The team behind Material-UI has been developing for React, and only React, since 2014. We
        went all-in on React before most developers.
        <br />
        <br />
        As a result the components benefit from the expertise we have built, and leverage the power
        of React without compromises.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/8_TypescriptX.svg',
    title: 'TypeScript support',
    description: (
      <React.Fragment>
        Material-UI X components are written in TypeScript, this helps keep the type definitions
        always up to date.
        <br />
        <br />
        Over half of all React web applications are built with TypeScript. If yours is, Material-UI
        X is ready for you. (And if it isn&apos;t – we&apos;ve still got you covered! 👍)
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/10_LibraryX.svg',
    title: 'The most popular library',
    description: (
      <React.Fragment>
        The team behind Material-UI X also developed the most popular UI library for React:
        Material-UI. With Material-UI X you will benefit from the same expertise gained over many
        years.
        <br />
        <br /> The components are built to the same quality standards: end-to-end tests, polished
        API, type safe, accessible, fast, small. 👌
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/6_CompletenessX.svg',
    title: 'The only suite you need',
    description: (
      <React.Fragment>
        Because of the sustainability challenge of developing open source components, no open source
        UI library can provide enough high quality components. Sometimes for advanced components
        such as a data grid, there isn&apos;t even an open source alternative to turn to.
        <br />
        <br />
        Material-UI X will support all the most needed UI components, without sacrificing quality.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/2_DocumentationX.svg',
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
    src: '/static/branding/material-ui-x/3_CustomizabilityX.svg',
    title: 'Simple customizability',
    description: (
      <React.Fragment>
        You want your components to be powerful, but without sacrificing how they look! After all,
        what good is that nice design system if you can&apos;t use it?
        <br />
        <br />
        Material-UI X is simple to customize by design, which means that you are in complete and
        full control of how your components render down to the very last component, class or style.
      </React.Fragment>
    ),
  },
];

function WhyMaterialUix() {
  return (
    <Container
      sx={{
        pb: 7.2,
        mt: { xs: 12, sm: 15, lg: 20 },
        mb: { xs: 12, sm: 15 },
        px: { sm: 7.5, lg: 3 },
      }}
    >
      <Typography variant="h2" align="center">
        Why <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
        <UnderlinedText>Material UI X?</UnderlinedText>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 2.5,
          maxWidth: 670,
          mx: 'auto',
          textAlign: 'center',
          p: { xs: '0 15px', sm: 0 },
          mb: { xs: 7, sm: 10.5, lg: 10 },
        }}
      >
        Looking to get ahead? We have timely resources. Switch to{' '}
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> Material-UI X to get
        more components.
      </Typography>
      <MaterialUix data={materialUixData} />
    </Container>
  );
}
// End WhyMaterialUix secion

// Start React Data Grid Market
const ExclusiveFeaturesGrid = styled(Grid)(({ theme }) => ({
  '&:nth-child(odd)': {
    position: 'relative',
    top: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      top: 0,
    },
  },
}));
const exclusiveFeaturesData = [
  [
    { src: '/static/branding/material-ui-x/Resizing.svg', label: 'Column Resizing' },
    { src: '/static/branding/material-ui-x/Pagination.svg', label: 'Pagination', id: 1 },
  ],
  [
    {
      src: '/static/branding/material-ui-x/ReorderRows.svg',
      label: 'Reorder Rows',
      topImagesrc: '/static/branding/material-ui-x/WorkInProgress.svg',
    },
    {
      src: '/static/branding/material-ui-x/Clipboard.svg',
      label: 'Clipboard',
      topImagesrc: '/static/branding/material-ui-x/WorkInProgress.svg',
      id: 1,
    },
  ],
  [
    { src: '/static/branding/material-ui-x/MultiRow.svg', label: 'Multi Row Selection' },
    {
      src: '/static/branding/material-ui-x/RowVirtualization.svg',
      label: 'Row virtualization',
      id: 1,
    },
  ],
  [
    {
      src: '/static/branding/material-ui-x/ExcelExport.svg',
      label: 'Excel Export',
      topImagesrc: '/static/branding/material-ui-x/WorkInProgress.svg',
    },
    {
      src: '/static/branding/material-ui-x/TreeData.svg',
      label: 'Tree Data',
      topImagesrc: '/static/branding/material-ui-x/WorkInProgress.svg',
      id: 1,
    },
  ],
];
function ReactDataGridMarket() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        position: 'relative',
        pt: { xs: 15, sm: 12.5, lg: 15 },
        pb: { xs: 8, sm: 23, lg: 15 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block9.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          left: { xs: '16px', sm: '60px', lg: '83px' },
          top: '-122px',
        }}
      />
      <Container>
        <Typography variant="h2" align="center" sx={{ mb: 2.5 }}>
          The best <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          <UnderlinedText>React Data Grid</UnderlinedText>{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          on <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          the market
        </Typography>
        <Typography sx={{ textAlign: 'center', mb: { xs: 8, sm: 10, fontSize: { xs: '16px' } } }}>
          The performance, feature set and quality has not been seen before in a{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          dedicated React Data Grid.
        </Typography>
        <Box
          component="img"
          src="/static/branding/material-ui-x/ReactDataGrid.jpg"
          loading="lazy"
          alt=""
          sx={{ width: '100%', display: { xs: 'none', lg: 'block' } }}
        />
        <Box
          component="img"
          src="/static/branding/material-ui-x/ReactDataGridIpad.jpg"
          loading="lazy"
          alt=""
          sx={{ width: '100%', display: { xs: 'none', sm: 'block', lg: 'none' }, ml: -3 }}
        />
        <Box
          component="img"
          src="/static/branding/material-ui-x/ReactDataGridMobile.jpg"
          loading="lazy"
          alt=""
          sx={{
            width: '100%',
            display: { xs: 'block', sm: 'none' },
            position: 'relative',
            right: '-16px',
          }}
        />
        <Typography
          variant="h3"
          align="center"
          sx={{ mt: 12, mb: 2.5, fontSize: { xs: '22px', sm: '32px', lg: '36px' } }}
        >
          Packed with exclusive features
        </Typography>
        <Typography align="center" sx={{ mb: { xs: 8, sm: 10 }, fontSize: { xs: '16px' } }}>
          The Material-UI X React Data Grid is packed with exclusive features that will
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
          enrich the experience of your data tables.
        </Typography>
        <Grid container spacing={3} sx={{ px: { xs: 0, sm: 3.3, lg: 0 } }}>
          {exclusiveFeaturesData.map((exclusiveFeatures, i) => (
            <ExclusiveFeaturesGrid item lg={3} sm={6} xs={12} key={i}>
              {exclusiveFeatures.map((featuresData: any) => (
                <ExclusiveFeaturesCard
                  key={featuresData.label}
                  src={featuresData.src}
                  label={featuresData.label}
                  topImagesrc={featuresData.topImagesrc}
                  id={featuresData.id}
                />
              ))}
            </ExclusiveFeaturesGrid>
          ))}
        </Grid>
        <Button
          href="/getting-started/usage/"
          component={MaterialLink}
          size="large"
          variant="contained"
          sx={{
            mt: 18.8,
            ml: 'auto',
            width: '234px',
            mr: 'auto',
            display: { xs: 'none', lg: 'flex' },
          }}
          endIcon={<NavigateNextIcon />}
        >
          And more features
        </Button>
      </Container>
    </Box>
  );
}
// End React Data Grid Market
// Start WhatCommunitySay section

const communityData = [
  [
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          Sometimes a library is so incredibly awesome. You don’t want to use anything else. I
          absolutely love that I can have the Material look or completely customize @MaterialUI to
          any look I desire.
        </React.Fragment>
      ),
    },
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community2.png',
      description: (
        <React.Fragment>
          Becoming more obsessed with @MaterialUI for #React. Along with #TypeScript support, they
          have phenomenal documentation, and an impressive design section with customizable themes
          and case studies. This is the best front-end library I&apos;ve ever worked with!
        </React.Fragment>
      ),
    },
  ],
  [
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          The DX on Material-UI is absolutely insane and that package has shaped my approach to
          Component API Design / Composition Design & Style System Design. I think those guys got it
          idiomatically right, wonderful product.
        </React.Fragment>
      ),
    },
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          Working with Material-UI is like working with an entire UI development team, minus the
          overhead.
          <br />
          <br />
          The theming tooling is simple and well-done. The components are common, customizable, and
          practical. Trophy
        </React.Fragment>
      ),
    },
  ],
  [
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          Working with @MaterialUI feels like cheat codes! It&apos;s not supposed to be *this* easy
          to build stuff!
        </React.Fragment>
      ),
    },
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          Spent the morning going through the docs for Material-UI. Such an amazing framework with
          amazing documentation! I tried using it several months ago, but struggled to grasp how a
          lot of it worked. Apparently, my understanding of React has been upgraded since then.
          Smiling face with smiling eyes
        </React.Fragment>
      ),
    },
  ],
];

const communityDataIpadMobile = [
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        Sometimes a library is so incredibly awesome. You don’t want to use anything else. I
        absolutely love that I can have the Material look or completely customize @MaterialUI to any
        look I desire.
      </React.Fragment>
    ),
  },
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community2.png',
    description: (
      <React.Fragment>
        Becoming more obsessed with @MaterialUI for #React. Along with #TypeScript support, they
        have phenomenal documentation, and an impressive design section with customizable themes and
        case studies. This is the best front-end library I&apos;ve ever worked with!
      </React.Fragment>
    ),
  },
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        The DX on Material-UI is absolutely insane and that package has shaped my approach to
        Component API Design / Composition Design & Style System Design. I think those guys got it
        idiomatically right, wonderful product.
      </React.Fragment>
    ),
  },
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        Working with Material-UI is like working with an entire UI development team, minus the
        overhead.
        <br />
        <br />
        The theming tooling is simple and well-done. The components are common, customizable, and
        practical. Trophy
      </React.Fragment>
    ),
  },
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        Working with @MaterialUI feels like cheat codes! It&apos;s not supposed to be *this* easy to
        build stuff!
      </React.Fragment>
    ),
  },
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        Spent the morning going through the docs for Material-UI. Such an amazing framework with
        amazing documentation! I tried using it several months ago, but struggled to grasp how a lot
        of it worked. Apparently, my understanding of React has been upgraded since then. Smiling
        face with smiling eyes
      </React.Fragment>
    ),
  },
];
function WhatCommunitySay() {
  return (
    <Container sx={{ px: { xs: 2, sm: 7.2, lg: 3 }, pt: { lg: 15 }, pb: { lg: 20 } }}>
      <Typography
        variant="h2"
        align="center"
        sx={{ mt: { xs: 12, sm: 15, lg: 0 }, mb: { xs: 4, sm: 10, lg: 8 } }}
      >
        What our community
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> has to say
      </Typography>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Grid container spacing={3}>
          {communityData.map((community, i) => (
            <Grid item lg={4} key={i}>
              {community.map((data, j) => (
                <CommunitySayCard
                  key={j}
                  uniqueKey={j}
                  name={data.name}
                  id={data.id}
                  description={data.description}
                  avatar={data.avatar}
                />
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <div className="slider">
          {communityDataIpadMobile.map((data, j) => (
            <section key={j}>
              <CommunitySayCard
                key={j}
                uniqueKey={j}
                name={data.name}
                id={data.id}
                description={data.description}
                avatar={data.avatar}
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
                min-width: 50%;
              scroll-snap-align: start;
              position: relative;
              padding: 0 15px;
              }
              @media(max-width:767px){
                section{
                      min-width: 100%;
                }
              }
              `}
          </style>
        </div>
      </Box>
    </Container>
  );
}

// End WhatCommunitySay section
// Start 65+ React UI components section fro Ipad and Mobile view

interface ReactUiComponentCardProps {
  children?: React.ReactNode;
  label?: string;
  src?: string;
  smValue?: any;
}

function ReactUiComponentCard(props: ReactUiComponentCardProps) {
  const { children, label = '', src = '', smValue = 6 } = props;
  return (
    <Grid
      item
      sm={smValue}
      xs={12}
      sx={{ filter: 'drop-shadow(0px 14px 10px rgba(0, 0, 0, 0.02))' }}
    >
      {children !== undefined ? (
        children
      ) : (
        <React.Fragment>
          <Image
            src={src}
            sx={{
              '& img': {
                width: '100%',
                verticalAlign: 'bottom',
              },
            }}
          />
          <Box sx={{ bgcolor: 'white', py: 3, px: 5 }}>
            <Typography variant="h4">{label}</Typography>
          </Box>
        </React.Fragment>
      )}
    </Grid>
  );
}
const reactUiComponentData = [
  { label: 'Dropdowns', src: '/static/branding/material-ui-x/dropdown.png', smValue: 12 },
  { label: 'Dialogues', src: '/static/branding/material-ui-x/dialogue.png' },
  { label: 'Date Inputs', src: '/static/branding/material-ui-x/date-inputs.png' },
  { label: 'Chat', src: '/static/branding/material-ui-x/chat.png' },
  { label: 'Gauges', src: '/static/branding/material-ui-x/gauges.png' },
  { label: 'Inputs', src: '/static/branding/material-ui-x/inputs.png' },
  { label: 'Tooltips', src: '/static/branding/material-ui-x/tooltips.png' },
  { label: 'Charts', src: '/static/branding/material-ui-x/charts.png', smValue: 12 },
  { label: 'Grid', src: '/static/branding/material-ui-x/grid.png' },
];
function ReactUiComponent() {
  return (
    <Container
      sx={{
        position: 'relative',
        pt: { xs: 10, sm: 13.8 },
        display: { xs: 'block', lg: 'none' },
        bgcolor: 'greyF3',
        px: { xs: 2, sm: 7.5 },
        pb: { xs: 10, sm: 14.6 },
        mt: { xs: 8, sm: 18.1 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block1-white.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          right: { xs: '15px', sm: '60px' },
          top: '-78px',
        }}
      />
      <Typography variant="h2" sx={{ mb: { xs: 2.5, sm: 5 } }}>
        65+ React UI components
      </Typography>
      <Typography sx={{ fontSize: '18px', mb: 8 }}> Material-UI Pro Components</Typography>
      <Box sx={{ mt: { xs: 2.5, sm: 3.8 } }}>
        <Grid spacing={3} container>
          {reactUiComponentData.map((reactUiComponent, i) => (
            <ReactUiComponentCard
              key={i}
              label={reactUiComponent.label}
              src={reactUiComponent.src}
              smValue={reactUiComponent.smValue}
            />
          ))}
          <ReactUiComponentCard>
            <Box
              sx={{
                bgcolor: 'emerald',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: { xs: '396px', sm: 0 },
                borderRadius: '4px',
              }}
            >
              <Box>
                <Box component={Link} href="/getting-started/usage/">
                  <Image
                    src={'/static/branding/material-ui-x/Material-UI-Icon.png'}
                    sx={{
                      '& img': {
                        verticalAlign: 'middle',
                      },
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ mt: 1.3, maxWidth: '200px', color: '#fff' }}>
                  See Components and Features
                </Typography>
              </Box>
            </Box>
          </ReactUiComponentCard>
        </Grid>
      </Box>
    </Container>
  );
}
// End 65+ React UI components section for Ipad and Mobile view
// Start RoadMap section
const roadMapData = [
  {
    image: '/static/branding/material-ui-x/InLab.svg',
    color: 'primary.main',
    label: 'In the lab',
    description: (
      <React.Fragment>
        In the lab, in progress to <Box component="span" sx={{ display: { xs: 'block' } }} />
        move into the core
      </React.Fragment>
    ),
  },
  {
    image: '/static/branding/material-ui-x/WorkInProgress.svg',
    color: 'vividBlue',
    label: 'Work in progress',
    description: (
      <React.Fragment>
        {' '}
        Work in progress, will <Box component="span" sx={{ display: { xs: 'block' } }} /> likely
        land in the lab.
      </React.Fragment>
    ),
  },
  {
    image: '/static/branding/material-ui-x/PlanningBuild.svg',
    color: 'grey87',
    label: 'Planning to build',
    description: (
      <React.Fragment>
        Building the feature is <Box component="span" sx={{ display: { xs: 'block' } }} /> planned
        but did not <Box component="span" sx={{ display: { xs: 'block' } }} />
        started yet.
      </React.Fragment>
    ),
  },
];

function RoadMap() {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: 'greyF3',
        position: 'relative',
        pt: { sm: 0, lg: 12.5 },
        pb: { xs: 20, sm: 20, lg: 16 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block7.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: '-33px',
          left: { xs: '16px', sm: '60px', lg: '135px' },
          zIndex: 1,
        }}
      />
      <Box
        component="img"
        src="/static/branding/block1-white.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          right: { xs: '16px', sm: '60px', lg: '135px' },
          top: '-78px',
          display: { xs: 'none', lg: 'block' },
        }}
      />
      <Container>
        <Typography variant="h2" align="center">
          Roadmap
        </Typography>
        <Typography
          sx={{
            mt: 2.5,
            maxWidth: 670,
            mx: 'auto',
            textAlign: 'center',
            p: { xs: '0 15px', md: 0 },
            mb: { xs: 5, sm: 6, lg: 7.5 },
            fontSize: { xs: '16px', sm: '18px' },
          }}
        >
          We are commited to developing the most requested components{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> and features. You
          can find our <Link href="/getting-started/support/">quartly roadmap in GitHub.</Link>
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ maxWidth: { sm: '622px', lg: '570px' }, margin: '0 auto' }}
        >
          {roadMapData.map((roadMap) => (
            <Grid
              item
              container
              direction="column"
              xs={6}
              sm={4}
              lg={4}
              sx={{ alignItems: 'center' }}
              key={roadMap.image}
            >
              <Avatar
                sx={{
                  mb: 2.5,
                  bgcolor: roadMap.color,
                  width: 40,
                  height: 40,
                  marginLeft: 0,
                  mr: 'auto',
                }}
              >
                <img loading="lazy" src={roadMap.image} alt="" />
              </Avatar>
              <Typography
                component="p"
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  borderBottom: { xs: '1px solid rgb(0,30,60)', lg: 'none' },
                  mb: 0.5,
                  display: { xs: 'inline-block', sm: 'inline-block' },
                  width: { xs: 'auto', sm: 'auto' },
                  ml: { xs: 0, sm: 'none' },
                  mr: { xs: 'auto', sm: 'none' },
                }}
              >
                {roadMap.label}
              </Typography>
              <Typography
                component="p"
                variant="body3"
                sx={{
                  textAlign: 'left',
                  fontSize: '14px',
                  width: '100%',
                  color: 'grey87',
                  mb: { xs: 6, sm: 0.5, lg: 0 },
                }}
              >
                {roadMap.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
// End RoadMap section
// Start RoadMapDetail section
const roadMapDetailData = [
  {
    title: 'In the Lab',
    description: 'In progress to move into the core.',
    cardData: [
      {
        label: 'Data Grid',
        buttonLabel: 'In the lab',
        src: '/static/branding/material-ui-x/DataGrid.svg',
        startIcon: <InLabIcon />,
      },
      {
        label: 'Date Picker',
        buttonLabel: 'In the lab',
        src: '/static/branding/material-ui-x/Calendar.svg',
        startIcon: <InLabIcon />,
      },
      {
        label: 'Tree View',
        buttonLabel: 'In the lab',
        src: '/static/branding/material-ui-x/TreeView.svg',
        startIcon: <InLabIcon />,
      },
    ],
  },
  {
    title: 'Work In progress',
    description: 'Components we are actively working on.',
    cardData: [
      {
        label: 'Advanced Data Grid',
        buttonLabel: 'Work in Progress',
        src: '/static/branding/material-ui-x/DataGrid.svg',
        startIcon: <WorkInProgressIcon />,
        buttonSx: { bgcolor: 'vividBlue' },
      },
      {
        label: 'Date Picker',
        buttonLabel: 'Work in Progress',
        src: '/static/branding/material-ui-x/Calendar.svg',
        startIcon: <WorkInProgressIcon />,
        buttonSx: { bgcolor: 'vividBlue' },
      },
    ],
  },
  {
    title: 'Planning to build',
    description: 'Building the feature is planned but did not started yet.',
    cardData: [
      {
        label: 'Avanced Tree View',
        buttonLabel: 'Planning to build',
        src: '/static/branding/material-ui-x/Checked.svg',
        startIcon: <PlanningBuildIcon />,
        buttonSx: { bgcolor: 'grey87' },
      },
      {
        label: 'Scheduler',
        buttonLabel: 'Planning to build',
        src: '/static/branding/material-ui-x/Calendar.svg',
        startIcon: <PlanningBuildIcon />,
        buttonSx: { bgcolor: 'grey87' },
      },
      {
        label: 'Charts',
        buttonLabel: 'Planning to build',
        src: '/static/branding/material-ui-x/Chart.svg',
        startIcon: <PlanningBuildIcon />,
        buttonSx: { bgcolor: 'grey87' },
      },
      {
        label: 'Sparkline',
        buttonLabel: 'Planning to build',
        src: '/static/branding/material-ui-x/Sparkline.svg',
        startIcon: <PlanningBuildIcon />,
        buttonSx: { bgcolor: 'grey87' },
      },
      {
        label: 'Gauge',
        buttonLabel: 'Planning to build',
        src: '/static/branding/material-ui-x/Gauge.svg',
        startIcon: <PlanningBuildIcon />,
        buttonSx: { bgcolor: 'grey87' },
      },
      {
        label: 'Upload',
        buttonLabel: 'Planning to build',
        src: '/static/branding/material-ui-x/Upload.svg',
        startIcon: <PlanningBuildIcon />,
        buttonSx: { bgcolor: 'grey87' },
      },
    ],
  },
];
function RoadMapDetail() {
  return (
    <Box
      sx={{
        bgcolor: 'greyEA',
        mt: 0,
        pb: { xs: 12.9, sm: 15, lg: 17.5 },
        pt: { xs: 2.4, sm: 6.3 },
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src="/static/branding/block8.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: '-28px',
          right: { xs: '17px', sm: '60px', lg: '135px' },
        }}
      />
      <Container sx={{ maxWidth: '818px !important', px: { sm: 7.5, lg: 3 } }}>
        {roadMapDetailData.map((roadMapDetail, i) => (
          <React.Fragment key={i}>
            <Typography
              variant="h3"
              component="div"
              sx={{ textAlign: 'left', mt: { xs: 7.5, sm: 10, lg: 8.8 }, mb: 1.4 }}
            >
              {roadMapDetail.title}
            </Typography>
            <Typography component="p" sx={{ textAlign: 'left', mb: { xs: 4, sm: 5 } }}>
              {roadMapDetail.description}
            </Typography>
            {roadMapDetail.cardData.map((roadMap: any) => (
              <RoadMapDetailCard
                key={roadMap.label}
                label={roadMap.label}
                buttonLabel={roadMap.buttonLabel}
                src={roadMap.src}
                startIcon={roadMap.startIcon}
                buttonSx={roadMap.buttonSx}
              />
            ))}
          </React.Fragment>
        ))}
      </Container>
    </Box>
  );
}
// End RoadMapDetail section

export default function Page() {
  return (
    <BrandingRoot>
      <Head title="Material-UI-X" description="Material-UI-X page." />
      <BrandingHeader mode={'dark'} />
      <AdvancedReactComponent />
      <CustomerIcons />
      <WhyMaterialUix />
      <ReactDataGridMarket />
      <WhatCommunitySay />
      <ReactUiComponent />
      <RoadMap />
      <RoadMapDetail />
      <BrandingDiscoverMore />
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
