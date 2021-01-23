import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizationProvider,
  '@material-ui/lab/DatePicker': DatePicker,
  '@material-ui/lab/MobileDatePicker': MobileDatePicker,
  '@material-ui/lab/DesktopDatePicker': DesktopDatePicker,
};
