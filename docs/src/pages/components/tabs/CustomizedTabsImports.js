import * as React from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles, withStyles },
  '@material-ui/core/Tabs': Tabs,
  '@material-ui/core/Tab': Tab,
  '@material-ui/core/Typography': Typography,
};
