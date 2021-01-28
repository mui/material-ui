import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles, createStyles, useTheme },
  '@material-ui/core/Input': Input,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/Select': Select,
};
