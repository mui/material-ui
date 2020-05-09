import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AccessibleTabs() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [selectionFollowsFocus, toggleSelectionFollowsFocus] = React.useReducer(
    (flag) => !flag,
    true,
  );

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={selectionFollowsFocus}
            onChange={toggleSelectionFollowsFocus}
            color="secondary"
          />
        }
        label="Selection follows focus"
      />
      <AppBar position="static">
        <Tabs
          selectionFollowsFocus={selectionFollowsFocus}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Item One" aria-controls="simple-tabpanel-0" id="simple-tab-0" />
          <Tab label="Item Two" aria-controls="simple-tabpanel-1" id="simple-tab-1" />
          <Tab label="Item Three" aria-controls="simple-tabpanel-2" id="simple-tab-2" />
        </Tabs>
      </AppBar>
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
