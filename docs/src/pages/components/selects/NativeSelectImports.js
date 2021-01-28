import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/NativeSelect': NativeSelect,
};
