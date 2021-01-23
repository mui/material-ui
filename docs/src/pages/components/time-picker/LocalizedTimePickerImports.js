import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import arSaLocale from 'date-fns/locale/ar-SA';
import enLocale from 'date-fns/locale/en-US';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';

export default {
  react: React,
  'date-fns/locale/fr': frLocale,
  'date-fns/locale/ru': ruLocale,
  'date-fns/locale/ar-SA': arSaLocale,
  'date-fns/locale/en-US': enLocale,
  '@material-ui/core/ToggleButton': ToggleButton,
  '@material-ui/core/ToggleButtonGroup': ToggleButtonGroup,
  '@material-ui/core/TextField': TextField,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizationProvider,
  '@material-ui/lab/TimePicker': TimePicker,
};
