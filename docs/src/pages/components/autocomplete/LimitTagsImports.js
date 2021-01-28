import * as React from 'react';
import Autocomplete from '@material-ui/core/Autocomplete';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default {
  react: React,
  '@material-ui/core/Autocomplete': Autocomplete,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/TextField': TextField,
};
