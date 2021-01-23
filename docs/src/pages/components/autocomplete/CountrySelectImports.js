import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/Autocomplete': Autocomplete,
  '@material-ui/core/styles': { makeStyles },
};
