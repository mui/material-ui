import * as React from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles, withStyles },
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/Select': Select,
  '@material-ui/core/NativeSelect': NativeSelect,
  '@material-ui/core/InputBase': InputBase,
};
