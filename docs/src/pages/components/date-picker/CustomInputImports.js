import * as React from 'react';
import Box from '@material-ui/core/Box';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DesktopDatePicker from '@material-ui/lab/DatePicker';

export default {
  react: React,
  '@material-ui/core/Box': Box,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizaitonProvider,
  '@material-ui/lab/DatePicker': DesktopDatePicker,
};
