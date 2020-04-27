import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel
        activeValue={value}
        value={0}
        id={a11yProps(0)['aria-controls']}
        aria-labelledby={a11yProps(0).id}
      >
        Item One
      </TabPanel>
      <TabPanel
        activeValue={value}
        value={1}
        id={a11yProps(1)['aria-controls']}
        aria-labelledby={a11yProps(1).id}
      >
        Item Two
      </TabPanel>
      <TabPanel
        activeValue={value}
        value={2}
        id={a11yProps(2)['aria-controls']}
        aria-labelledby={a11yProps(2).id}
      >
        Item Three
      </TabPanel>
    </div>
  );
}
