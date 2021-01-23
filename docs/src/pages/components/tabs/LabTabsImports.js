import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/AppBar': AppBar,
  '@material-ui/core/Tab': Tab,
  '@material-ui/lab/TabContext': TabContext,
  '@material-ui/lab/TabList': TabList,
  '@material-ui/lab/TabPanel': TabPanel,
};
