import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/core/Autocomplete';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/Autocomplete': { default: Autocomplete, createFilterOptions },
};
