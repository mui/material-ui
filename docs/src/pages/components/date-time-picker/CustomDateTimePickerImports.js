import * as React from 'react';
import AlarmIcon from '@material-ui/icons/Alarm';
import SnoozeIcon from '@material-ui/icons/Snooze';
import TextField from '@material-ui/core/TextField';
import ClockIcon from '@material-ui/icons/AccessTime';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';

export default {
  react: React,
  '@material-ui/icons/Alarm': AlarmIcon,
  '@material-ui/icons/Snooze': SnoozeIcon,
  '@material-ui/core/TextField': TextField,
  '@material-ui/icons/AccessTime': ClockIcon,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizationProvider,
  '@material-ui/lab/DateTimePicker': DateTimePicker,
  '@material-ui/lab/MobileDateTimePicker': MobileDateTimePicker,
};
