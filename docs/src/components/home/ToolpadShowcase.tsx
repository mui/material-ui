import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ShowcaseContainer, { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import MoreInfoBox from 'docs/src/components/action/MoreInfoBox';
import ROUTES from 'docs/src/route';

const ToolpadCoreShowcase = React.lazy(() => import('./ToolpadCoreShowcaseDemo'));

const tabOneCode = `
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/page');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider navigation={NAVIGATION} router={router} window={demoWindow}>
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={2}>
            <Grid size={6}>
              <PlaceHolder height={100} />
            </Grid>
            <Grid size={6}>
              <PlaceHolder height={100} />
            </Grid>
            <Grid size={12}>
              <PlaceHolder height={200} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}`;

const tabTwoCode = `
apiVersion: v1
kind: page
spec:
  title: Default page
  alias:
  - CZndx3v
  content:
  - component: DataGrid
    name: dataGrid
    props:
      dataProviderId: dataProvider.ts:default
      columns:
      - field: firstname
        type: string
      - field: lastname
        type: string
      rowsSource: dataProvider
  - component: codeComponent.map
    name: map
`;
interface ImageProps {
  alt: string;
  index: number;
  src: string;
  value: number;
}

function Image({ alt, index, src, value }: ImageProps) {
  return (
    <Box
      component="img"
      hidden={value !== index}
      src={src}
      alt={alt}
      loading="lazy"
      height={260}
      sx={{
        width: { xs: 'auto', sm: '100%' },
        objectFit: 'cover',
        objectPosition: 'right',
      }}
    />
  );
}

interface DemoProps {
  value: number;
  index: number;
}

function ToolpadCoreShowcaseDemo({ value, index }: DemoProps) {
  return (
    <Box hidden={value !== index}>
      <React.Suspense
        fallback={
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
          >
            <p>Loading...</p>
          </Box>
        }
      >
        <ToolpadCoreShowcase />
      </React.Suspense>
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`toolpad-showcase-tabpanel-${index}`}
      aria-labelledby={`toolpad-showcase-${index}`}
      {...other}
    >
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `toolpad-showcase-tab-${index}`,
    'aria-controls': `toolpad-showcase-tab-${index}`,
  };
}

const tabsCodeInfo = [
  {
    code: tabOneCode,
    label: 'Core',
    language: 'tsx',
    description:
      'Drop-in components that abstract away the complexity of dashboard layouts, authentication, navigation, and more.',
    imgSrc: '/static/branding/toolpad/ex-1.png',
    imgAlt: 'Toolpad app',
    Demo: ToolpadCoreShowcaseDemo,
  },
  {
    code: tabTwoCode,
    label: 'Studio',
    language: 'yml',
    description:
      "Use a drag-and-drop interface to build your app's configuration. Changes made in Studio are automatically synced to .yml files, and vice-versa. Bring your own components and data.",
    imgSrc: '/static/branding/toolpad/ex-1.png',
    imgAlt: '.yaml file represents Toolpad app',
  },
  // {
  //   code: tabTwoCode,
  //   label: 'Serverless',
  //   language: 'tsx',
  //   description:
  //     'Write serverless functions to fetch your data, Toolpad automatically makes the result available on the page.',
  //   imgSrc: '/static/branding/toolpad/ex-2.png',
  //   imgAlt: 'Toolpad user management app',
  // },
  // {
  //   code: tabThreeCode,
  //   label: 'Customizable',
  //   language: 'tsx',
  //   description: 'Bring your own React components into Toolpad Studio.',
  //   imgSrc: '/static/branding/toolpad/ex-3.png',
  //   imgAlt: 'Toolpad app with custom component',
  // },
];

export default function ToolpadShowcase() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ShowcaseContainer
      noPadding
      preview={
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Toolpad showcase"
            sx={(theme) => ({
              minHeight: '26px',
              p: 0,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '& .MuiTabs-flexContainer': {
                p: 1,
                gap: '6px',
              },
              '& .MuiTab-root': {
                minHeight: '26px',
                minWidth: 'fit-content',
                p: '6px',
                borderRadius: '6px',
                fontSize: '.75rem',
                fontWeight: 'medium',
                lineHeight: 1,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[100],
                  ...theme.applyDarkStyles({
                    backgroundColor: 'primaryDark.700',
                  }),
                },
              },
              '& .MuiTabs-indicator': {
                height: '1px',
                opacity: '60%',
              },
              '& .Mui-selected': {
                color: 'primary.300',
              },
            })}
          >
            {tabsCodeInfo.map((tab, index) => (
              <Tab label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
          <Box sx={{ p: 2 }}>
            <Paper
              variant="outlined"
              sx={(theme) => ({
                width: '100%',
                height: 260,
                overflow: 'clip',
                boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.1)}`,
                borderColor: 'grey.200',
                borderRadius: '8px',
              })}
            >
              {tabsCodeInfo.map((tab, index) =>
                tab.Demo ? (
                  <tab.Demo index={index} value={tabValue} key={index} />
                ) : (
                  <Image
                    key={index}
                    index={index}
                    value={tabValue}
                    src={tab.imgSrc}
                    alt={tab.imgAlt}
                  />
                ),
              )}
            </Paper>
          </Box>
        </Box>
      }
      code={
        <React.Fragment>
          <ShowcaseCodeWrapper maxHeight={250}>
            {tabsCodeInfo.map((tab, index) => (
              <CustomTabPanel key={index} value={tabValue} index={index}>
                <Typography
                  variant="body2"
                  sx={{
                    pb: 1.5,
                    mb: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    color: 'grey.400',
                  }}
                >
                  {tab.description}
                </Typography>
                <HighlightedCode
                  copyButtonHidden
                  code={tab.code}
                  language={tab.language}
                  plainStyle
                />
              </CustomTabPanel>
            ))}
          </ShowcaseCodeWrapper>
          <MoreInfoBox
            primaryBtnLabel={`Start using Toolpad ${tabValue === 0 ? 'Core' : 'Studio'}`}
            primaryBtnHref={
              tabValue === 0 ? ROUTES.toolpadLandingPage : ROUTES.toolpadStudioLandingPage
            }
            secondaryBtnLabel={`Learn more about Toolpad ${tabValue === 0 ? 'Core' : 'Studio'}`}
            secondaryBtnHref={tabValue === 0 ? ROUTES.toolpadCoreDocs : ROUTES.toolpadStudioWhy}
          />
        </React.Fragment>
      }
    />
  );
}
