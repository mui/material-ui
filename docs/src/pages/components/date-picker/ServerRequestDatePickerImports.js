import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import PickersDay from '@material-ui/lab/PickersDay';
import DatePicker from '@material-ui/lab/DatePicker';
import PickersCalendarSkeleton from '@material-ui/lab/PickersCalendarSkeleton';
import getDaysInMonth from 'date-fns/getDaysInMonth';

export default {
  react: React,
  '@material-ui/core/Badge': Badge,
  '@material-ui/core/TextField': TextField,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizaitonProvider,
  '@material-ui/lab/PickersDay': PickersDay,
  '@material-ui/lab/DatePicker': DatePicker,
  '@material-ui/lab/PickersCalendarSkeleton': PickersCalendarSkeleton,
  'date-fns/getDaysInMonth': getDaysInMonth,
};
