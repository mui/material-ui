import * as React from 'react';
import { convertLength } from '@material-ui/core/styles/cssUtils';
import {
  makeStyles,
  createStyles,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import {
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';

export default {
  react: React,
  '@material-ui/core/styles/cssUtils': { convertLength },
  '@material-ui/core/styles': {
    makeStyles,
    createStyles,
    createMuiTheme,
    responsiveFontSizes,
  },
  recharts: {
    Legend,
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer,
  },
};
