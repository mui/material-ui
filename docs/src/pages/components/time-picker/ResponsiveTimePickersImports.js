import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
import DesktopTimePicker from '@material-ui/lab/DesktopTimePicker';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizationProvider,
  '@material-ui/lab/TimePicker': TimePicker,
  '@material-ui/lab/MobileTimePicker': MobileTimePicker,
  '@material-ui/lab/DesktopTimePicker': DesktopTimePicker,
};
