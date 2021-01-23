import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/core/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default {
  react: React,
  '@material-ui/core/Chip': Chip,
  '@material-ui/core/Autocomplete': Autocomplete,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/TextField': TextField,
};
