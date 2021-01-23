import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizaitonProvider,
  '@material-ui/lab/StaticDatePicker': StaticDatePicker,
};
