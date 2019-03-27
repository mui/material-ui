import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
}

function TabPanel(props: TabPanelProps) {
  const { children, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" style={{ padding: 8 * 3 }} {...other}>
      {children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" aria-label="Simple tabs example">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Item One" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          <Tab label="Item Two" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
          <Tab label="Item Three" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
        </Tabs>
      </AppBar>
      <TabPanel hidden={value !== 0} id="simple-tabpanel-1" aria-labelledby="simple-tab-1">
        Item One
      </TabPanel>
      <TabPanel hidden={value !== 1} id="simple-tabpanel-2" aria-labelledby="simple-tab-2">
        Item Two
      </TabPanel>
      <TabPanel hidden={value !== 2} id="simple-tabpanel-3" aria-labelledby="simple-tab-3">
        Item Three
      </TabPanel>
    </div>
  );
}
