import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`a11y-tabpanel-${index}`}
      aria-labelledby={`a11y-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface DemoTabsProps {
  labelId: string;
  onChange: (event: unknown, value: number) => void;
  selectionFollowsFocus?: boolean;
  value: number;
}

function DemoTabs(props: DemoTabsProps) {
  const { labelId, onChange, selectionFollowsFocus, value } = props;

  return (
    <AppBar position="static">
      <Tabs
        aria-labelledby={labelId}
        onChange={onChange}
        selectionFollowsFocus={selectionFollowsFocus}
        value={value}
      >
        <Tab label="Item One" aria-controls="a11y-tabpanel-0" id="a11y-tab-0" />
        <Tab label="Item Two" aria-controls="a11y-tabpanel-1" id="a11y-tab-1" />
        <Tab label="Item Three" aria-controls="a11y-tabpanel-2" id="a11y-tab-2" />
      </Tabs>
    </AppBar>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function AccessibleTabs() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="demo-a11y-tabs-automatic-label">
        Tabs where selection follows focus
      </Typography>
      <DemoTabs
        labelId="demo-a11y-tabs-automatic-label"
        selectionFollowsFocus
        onChange={handleChange}
        value={value}
      />
      <Typography id="demo-a11y-tabs-manual-label">
        Tabs where each tab needs to be selected manually
      </Typography>
      <DemoTabs labelId="demo-a11y-tabs-manual-label" onChange={handleChange} value={value} />
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
