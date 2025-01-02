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

const tabOneCode = `<AppProvider navigation={[
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  }
  // ...
]}>
  <DashboardLayout>
    <PageContainer>
      {/* ... */}
    </PageContainer>
  </DashboardLayout>
</AppProvider>`;

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

interface TabContainerProps {
  index: number;
  value: number;
  isDemo: boolean;
  children: React.ReactNode;
}

function TabContainer({ index, value, isDemo, children }: TabContainerProps) {
  return (
    <Paper
      variant="outlined"
      key={index}
      sx={(theme) => ({
        width: '100%',
        maxWidth: '100%',
        height: 260,
        display: value === index ? 'flex' : 'none',
        overflow: isDemo ? 'auto' : 'clip',
        bgcolor: '#FFF',
        borderRadius: '8px',
        boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.1)}`,
        borderColor: 'grey.200',
        ...(isDemo && { scrollbarGutter: 'stable' }),
      })}
    >
      {children}
    </Paper>
  );
}

interface ImageProps {
  alt: string;
  src: string;
}

function Image({ alt, src }: ImageProps) {
  return (
    <Box
      component="img"
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

function ToolpadCoreShowcaseDemo() {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <p>Loading...</p>
        </div>
      }
    >
      <ToolpadCoreShowcase />
    </React.Suspense>
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
    imgSrc: '/static/branding/toolpad/ex-1.png',
    imgAlt: 'Toolpad app',
    Demo: ToolpadCoreShowcaseDemo,
  },
  {
    code: tabTwoCode,
    label: 'Studio',
    language: 'yml',
    description:
      'A drag-and-drop builder for creating dashboards and internal tools quickly, with your own components and data. Changes you make are synced to yml, and vice versa.',
    imgSrc: '/static/branding/toolpad/ex-1.png',
    imgAlt: '.yaml file represents Toolpad app',
  },
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
            {tabsCodeInfo.map((tab, index) =>
              tab.Demo ? (
                <TabContainer index={index} value={tabValue} isDemo>
                  <tab.Demo />
                </TabContainer>
              ) : (
                <TabContainer index={index} value={tabValue} isDemo={false}>
                  <Image src={tab.imgSrc} alt={tab.imgAlt} />
                </TabContainer>
              ),
            )}
          </Box>
        </Box>
      }
      code={
        <React.Fragment>
          <ShowcaseCodeWrapper maxHeight={250}>
            {tabsCodeInfo.map((tab, index) => (
              <CustomTabPanel key={index} value={tabValue} index={index}>
                {tab.description ? (
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
                ) : null}
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
