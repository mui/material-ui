import * as React from 'react';
import addWeeks from 'date-fns/addWeeks';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  'date-fns/addWeeks': addWeeks,
  '@material-ui/core/TextField': TextField,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizationProvider,
  '@material-ui/lab/DateRangePicker': DateRangePicker,
  '@material-ui/core/Box': Box,
};
