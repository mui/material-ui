import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import PickersDay from '@material-ui/lab/PickersDay';
import clsx from 'clsx';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';

export default {
  react: React,
  '@material-ui/core': { makeStyles, createStyles },
  '@material-ui/core/TextField': TextField,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizaitonProvider,
  '@material-ui/lab/DatePicker': DatePicker,
  '@material-ui/lab/PickersDay': PickersDay,
  clsx,
  'date-fns/endOfWeek': endOfWeek,
  'date-fns/isSameDay': isSameDay,
  'date-fns/isWithinInterval': isWithinInterval,
  'date-fns/startOfWeek': startOfWeek,
};
