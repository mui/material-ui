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

const tabOneCode = `
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

const tabTwoCode = `
import { createDataProvider } from "@toolpad/studio/server";
import db from "../db";
export default createDataProvider({
  async getRecords({ paginationModel: { start, pageSize } }) {
    return {
      records: await db.query("SELECT * FROM USERS"),
    };
  },
});
`;

const tabThreeCode = `
import * as React from "react";
import { createComponent } from "@toolpad/studio/browser";
import * as L from "leaflet";
function Leaflet({ lat, long, zoom }: LeafletProps) {
  const root: any = React.useRef(null);
  return (
    <div ref={root} style={{ height: 400 }} />
  );
}
export default createComponent(Leaflet, {
  argTypes: {
    lat: { type: "number", }
})
  `;

const tabsCustomStyles = {
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
      backgroundColor: 'primaryDark.700',
    },
  },
  '& .MuiTabs-indicator': {
    height: '1px',
    opacity: '60%',
  },
  '& .Mui-selected': {
    color: 'primary.300',
  },
};

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
    label: 'Local first',
    language: 'tsx',
    description:
      'Store your app configuration locally in yaml files. Changes in Toolpad are automatically synced to the files, and vice-versa.',
    imgSrc: '/static/branding/toolpad/ex-1.png',
    imgAlt: '.yaml file represents Toolpad app',
  },
  {
    code: tabTwoCode,
    label: 'Serverless functions',
    language: 'tsx',
    description:
      "Write serverless functions that access your project's code, and let Toolpad handle linking your data with the UI.",
    imgSrc: '/static/branding/toolpad/ex-2.png',
    imgAlt: 'Toolpad user management app',
  },
  {
    code: tabThreeCode,
    label: 'Customize',
    language: 'tsx',
    description: 'Compose your UI with drag and drop using your own React components.',
    imgSrc: '/static/branding/toolpad/ex-3.png',
    imgAlt: 'Toolpad app with custom component',
  },
];

export default function ToolpadShowcase() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ShowcaseContainer
      noPadding
      preview={
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Toolpad showcase"
            sx={tabsCustomStyles}
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
              {tabsCodeInfo.map((tab, index) => (
                <Image key={index} index={index} value={value} src={tab.imgSrc} alt={tab.imgAlt} />
              ))}
            </Paper>
          </Box>
        </Box>
      }
      code={
        <React.Fragment>
          <ShowcaseCodeWrapper maxHeight={250}>
            {tabsCodeInfo.map((tab, index) => (
              <CustomTabPanel key={index} value={value} index={index}>
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
            primaryBtnLabel="Start using Toolpad"
            primaryBtnHref={ROUTES.toolpadLandingPage}
            secondaryBtnLabel="Learn more about why to use Toolpad"
            secondaryBtnHref={ROUTES.toolpadWhy}
          />
        </React.Fragment>
      }
    />
  );
}
