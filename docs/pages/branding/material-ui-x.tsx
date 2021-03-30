import * as React from 'react';
import { Container, Typography, Grid, Button, Box, BoxProps, Avatar } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Link from 'docs/src/modules/components/Link';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InLabIcon from 'docs/src/modules/branding/icons/InLab';
import WorkInProgressIcon from 'docs/src/modules/branding/icons/WorkInProgress';
import PlanningBuildIcon from 'docs/src/modules/branding/icons/PlanningBuild';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';
import BrandingDiscoverMore from 'docs/src/modules/branding/BrandingDiscoverMore';
import MaterialUixCard from 'docs/src/modules/branding/MaterialUixCard';
import CustomerIcons from 'docs/src/modules/branding/CustomerIcons';

interface ImageProps {
  src: string;
  sx?: BoxProps['sx'];
}
function Image(props: ImageProps) {
  const { src, ...other } = props;
  return (
    <Box
      {...other}
      sx={{
        position: 'relative',
        '& img': {
          mt: 16,
          mb: 3.5,
        },
        textAlign: 'center',
        ...other.sx,
      }}
    >
      <img alt="" src={src} loading="lazy" />
    </Box>
  );
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
function AdvancedReactComponent() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        position: 'relative',
      }}
    >
      <Image src="/static/branding/material-ui-x/material-ui-x-logo.svg" />
      <Typography variant="h1" align="center">
        <UnderlinedText>Advanced</UnderlinedText> React <br />
        components
      </Typography>
      <Typography
        sx={{
          mt: 4,
          maxWidth: 670,
          mx: 'auto',
          textAlign: 'center',

          fontWeight: 'normal',
        }}
      >
        Material-UI X is the last React UI library you&apos;ll ever need. <br />
        It contains the best React Data Grid on the market and a <br /> growing list of advanced
        components.
      </Typography>
      <Box sx={{ textAlign: 'center', mb: 8, mt: 7.2 }}>
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
            ml: 5.2,
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
      </Box>

      {/* Table place
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      Table place */}
    </Box>
  );
}

// Started WhyMaterialUix secion
const CustomGrid = styled(Grid)(({ theme }) => ({
  '&:nth-child(even)': {
    position: 'relative',
    top: '60px',
    [theme.breakpoints.down('lg')]: {
      top: 0,
    },
  },
}));
function WhyMaterialUix() {
  return (
    <Container sx={{ pb: 23, mt: { xs: 14, sm: 15, lg: 20 }, mb: { xs: 12, sm: 15 } }}>
      <Typography variant="h2" align="center">
        Why <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
        <UnderlinedText>Material UI X?</UnderlinedText>
      </Typography>
      <Typography
        sx={{
          mt: 2.5,
          maxWidth: 670,
          mx: 'auto',
          textAlign: 'center',
          p: { xs: '0 15px', md: 0 },
          mb: { xs: 7, sm: 10.4, lg: 10 },
          fontSize: '18px',
        }}
      >
        Looking to get ahead? We have timely resources. Switch to{' '}
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block', lg: 'block' } }} />{' '}
        Material-UI X to get more components.
      </Typography>
      <Grid container spacing={3}>
        <CustomGrid item xs={12} md={6}>
          <MaterialUixCard
            image="/static/branding/material-ui-x/7_ReactX.svg"
            title="Built exclusively for React"
          >
            <Box sx={{ mt: 2 }}>
              The team behind Material-UI has been developing for React, and only React, since 2014.
              We went all-in on React before most developers.
              <br />
              <br />
              As a result the components benefit from the expertise we have built, and leverage the
              power of React without compromises.
            </Box>
          </MaterialUixCard>
        </CustomGrid>
        <CustomGrid item xs={12} md={6}>
          <MaterialUixCard
            image="/static/branding/material-ui-x/8_TypescriptX.svg"
            title="TypeScript support"
          >
            <Box sx={{ mt: 2 }}>
              Material-UI X components are written in TypeScript, this helps keep the type
              definitions always up to date.
              <br />
              <br />
              Over half of all React web applications are built with TypeScript. If yours is,
              Material-UI X is ready for you. (And if it isn&apos;t – we&apos;ve still got you
              covered! 👍)
            </Box>
          </MaterialUixCard>
        </CustomGrid>
        <CustomGrid item xs={12} md={6}>
          <MaterialUixCard
            image="/static/branding/material-ui-x/10_LibraryX.svg"
            title="The most popular library"
          >
            <Box sx={{ mt: 2 }}>
              The team behind Material-UI X also developed the most popular UI library for React:
              Material-UI. With Material-UI X you will benefit from the same expertise gained over
              many years.
              <br />
              <br /> The components are built to the same quality standards: end-to-end tests,
              polished API, type safe, accessible, fast, small. 👌
            </Box>
          </MaterialUixCard>
        </CustomGrid>
        <CustomGrid item xs={12} md={6}>
          <MaterialUixCard
            image="/static/branding/material-ui-x/6_CompletenessX.svg"
            title="The only suite you need"
          >
            <Box sx={{ mt: 2 }}>
              Because of the sustainability challenge of developing open source components, no open
              source UI library can provide enough high quality components. Sometimes for advanced
              components such as a data grid, there isn&apos;t even an open source alternative to
              turn to.
              <br />
              <br />
              Material-UI X will support all the most needed UI components, without sacrificing
              quality.
            </Box>
          </MaterialUixCard>
        </CustomGrid>
        <CustomGrid item xs={12} md={6}>
          <MaterialUixCard
            image="/static/branding/material-ui-x/2_DocumentationX.svg"
            title="Outstanding documentation"
          >
            <Box sx={{ mt: 2 }}>
              The documentation is built on the experience we have gained developing open source
              components, and acting on the feedback for improving the documentation from our
              growing community of 2 million developers.
            </Box>
          </MaterialUixCard>
        </CustomGrid>
        <CustomGrid item xs={12} md={6}>
          <MaterialUixCard
            image="/static/branding/material-ui-x/3_CustomizabilityX.svg"
            title="Simple customizability"
          >
            <Box sx={{ mt: 2 }}>
              You want your components to be powerful, but without sacrificing how they look! After
              all, what good is that nice design system if you can&apos;t use it?
              <br />
              <br />
              Material-UI X is simple to customize by design, which means that you are in complete
              and full control of how your components render down to the very last component, class
              or style.
            </Box>
          </MaterialUixCard>
        </CustomGrid>
      </Grid>
    </Container>
  );
}
// End WhyMaterialUix secion
// Start WhatCommunitySay section
const communityData = [
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        It&apos;s my first day working with MaterialUI, and let me just say that it is THE SHIT
      </React.Fragment>
    ),
  },
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community2.png',
    description: (
      <React.Fragment>
        It&apos;s my first day working with MaterialUI, and let me just say that it is THE SHIT
      </React.Fragment>
    ),
  },
  {
    name: 'Spike Brehm',
    id: '@spikebrehm',
    avatar: '/static/branding/material-ui-x/community1.png',
    description: (
      <React.Fragment>
        It&apos;s my first day working with MaterialUI, and let me just say that it is THE SHIT
      </React.Fragment>
    ),
  },
];
interface CommunitySayCardProps {
  name: string;
  id: string;
  description: any;
  avatar: string;
}
function CommunitySayCard(props: CommunitySayCardProps) {
  const { name, id, description, avatar } = props;
  return (
    <Box sx={{ bgcolor: '#F3F6F9', px: 5 }}>
      <Box
        component="img"
        src="/static/branding/material-ui-x/Twitter.svg"
        loading="lazy"
        alt="Twitter"
        sx={{
          mt: 5.3,
          pl: 5.1,
          mb: 2.1,
        }}
      />
      <Typography variant="h4" align="center" sx={{ px: 5, mb: 4 }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            mr: 2,
            bgcolor: '#FFC846',
            width: 48,
            height: 48,
          }}
        >
          <img loading="lazy" src={avatar} alt="" />
        </Avatar>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="body1">{id}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
function WhatCommunitySay() {
  return (
    <Container>
      <Typography variant="h2" align="center" sx={{ mt: 15, mb: 8 }}>
        What our community
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
        has to say
      </Typography>
      {/* <Grid container spacing={3}>
        <Grid item xs={4}>
          {communityData.map((community, i) => (
            <CommunitySayCard
              key={i}
              name={community.name}
              id={community.id}
              description={community.description}
              avatar={community.avatar}
            />
          ))}
        </Grid>
      </Grid> */}
    </Container>
  );
}
// End WhatCommunitySay section
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
        pt: 12.5,
        pb: 16,
        mt: { xs: 20 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block7.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: '-40px',
          left: '60px',
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
          right: '20px',
          top: '-78px',
          display: { xs: 'none', sm: 'block' },
        }}
      />
      <Typography variant="h2" align="center">
        Roadmap
      </Typography>
      <Typography
        sx={{
          mt: 3,
          maxWidth: 670,
          mx: 'auto',
          textAlign: 'center',
          p: { xs: '0 15px', md: 0 },
          mb: { xs: 5, sm: 6, lg: 7.5 },
          fontSize: { xs: '16px', sm: '18px' },
        }}
      >
        We are commited to developing the most requested components{' '}
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> and features. You can
        find our <Link href="/getting-started/support/">quartly roadmap in GitHub.</Link>
      </Typography>
      <Container>
        <Grid container spacing={2} sx={{ maxWidth: '570px', margin: '0 auto' }}>
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
                  borderBottom: { xs: '1px solid #001E3C', lg: 'none' },
                  mb: 0.5,
                  display: { xs: 'inline-block', sm: 'block' },
                  width: { xs: 'auto', sm: '100%' },
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
                  mb: { xs: 6, sm: 0.5 },
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
const CustomButton = styled(Button)(({ theme }) => ({
  'MuiButton-root': {
    borderRadius: '4px',
    ml: 'auto',
    width: 'auto',
    py: 1,
    px: 1.5,
    lineHeight: 'normal',
    height: '32px',
  },
  '& a': {
    borderRadius: '4px',
    ml: 'auto',
    width: 'auto',
    py: 1,
    px: 1.5,
    lineHeight: 'normal',
    height: '32px',
  },
  '.MuiButton-label': {
    fontSize: '14px',
  },
  '.MuiButton-startIcon': {
    mt: 0.5,
    mr: 1,
    verticalAlign: 'middle',
  },
}));
interface RoadMapDetailCardProps {
  src: string;
  label: string;
  buttonLabel: string;
  startIcon: any;
  buttonSx?: BoxProps['sx'];
}
function RoadMapDetailCard(props: RoadMapDetailCardProps) {
  const { src, label, buttonLabel, startIcon, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'white',
        mb: 1.3,
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '4px',
      }}
    >
      <Image
        src={src}
        sx={{
          position: 'relative',
          '& img': {
            m: 0,
          },
          p: 0,
          mr: 2.2,
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>

      <Button
        href="/company/jobs/"
        component={Link}
        noLinkStyle
        color="primary"
        sx={{
          borderRadius: '4px',
          ml: 'auto',
          width: 'auto',
          py: 1,
          px: 1.5,
          lineHeight: 'normal',
          height: '32px',
          '& span': {
            fontSize: { xs: 0, sm: '14px' },
            '& span': {
              mr: 0,
            },
          },

          ...other.buttonSx,
        }}
        variant="contained"
        startIcon={startIcon}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
}
function RoadMapDetail() {
  return (
    <Box sx={{ bgcolor: 'greyEA', mt: 0, pb: 15, pt: 7.5, position: 'relative' }}>
      <Box
        component="img"
        src="/static/branding/block8.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: '-28px',
          right: '60px',
        }}
      />
      <Container sx={{ maxWidth: '818px !important' }}>
        <Typography variant="h3" component="div" sx={{ textAlign: 'left', mt: 10, mb: 1.4 }}>
          In the Lab
        </Typography>
        <Typography component="p" sx={{ textAlign: 'left', mb: 5 }}>
          In progress to move into the core.
        </Typography>
        <RoadMapDetailCard
          label={'Data Grid'}
          buttonLabel={'In the lab'}
          src={'/static/branding/material-ui-x/DataGrid.svg'}
          startIcon={<InLabIcon />}
        />
        <RoadMapDetailCard
          label={'Date Picker'}
          buttonLabel={'In the lab'}
          src={'/static/branding/material-ui-x/Calendar.svg'}
          startIcon={<InLabIcon />}
        />
        <RoadMapDetailCard
          label={'Tree View'}
          buttonLabel={'In the lab'}
          src={'/static/branding/material-ui-x/TreeView.svg'}
          startIcon={<InLabIcon />}
        />
        <Typography variant="h3" component="div" sx={{ textAlign: 'left', mt: 8.8, mb: 1.4 }}>
          Work In progress
        </Typography>
        <Typography component="p" sx={{ textAlign: 'left', mb: 5 }}>
          Components we are actively working on.
        </Typography>
        <RoadMapDetailCard
          label={'Advanced Data Grid'}
          buttonLabel={'Work in Progress'}
          src={'/static/branding/material-ui-x/DataGrid.svg'}
          startIcon={<WorkInProgressIcon />}
          buttonSx={{ bgcolor: 'vividBlue' }}
        />
        <RoadMapDetailCard
          label={'Date Picker'}
          buttonLabel={'Work in Progress'}
          src={'/static/branding/material-ui-x/Calendar.svg'}
          startIcon={<WorkInProgressIcon />}
          buttonSx={{ bgcolor: 'vividBlue' }}
        />

        <Typography variant="h3" component="div" sx={{ textAlign: 'left', mt: 8.8, mb: 1.4 }}>
          Planning to build
        </Typography>
        <Typography component="p" sx={{ textAlign: 'left', mb: 5 }}>
          Building the feature is planned but did not started yet.
        </Typography>
        <RoadMapDetailCard
          label={'Avanced Tree View'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Checked.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Scheduler'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Calendar.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Charts'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Chart.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Sparkline'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Sparkline.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Gauge'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Gauge.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Upload'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Upload.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
      </Container>
    </Box>
  );
}
// End RoadMapDetail section

export default function Page() {
  return (
    <BrandingRoot>
      <AdvancedReactComponent />
      <CustomerIcons />
      <WhyMaterialUix />
      <WhatCommunitySay />
      <RoadMap />
      <RoadMapDetail />
      <BrandingDiscoverMore />
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
