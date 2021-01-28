import * as React from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles, useTheme },
  '@material-ui/core/Input': Input,
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/Select': Select,
  '@material-ui/core/Chip': Chip,
};
