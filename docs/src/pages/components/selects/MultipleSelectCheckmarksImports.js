import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Input': Input,
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/Select': Select,
  '@material-ui/core/Checkbox': Checkbox,
};
