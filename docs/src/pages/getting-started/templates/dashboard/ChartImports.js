import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

export default {
  react: React,
  '@material-ui/core/styles': { useTheme },
  recharts: { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer },
  './Title': Title,
};
