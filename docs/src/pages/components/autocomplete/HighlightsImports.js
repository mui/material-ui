import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/Autocomplete': Autocomplete,
  'autosuggest-highlight/parse': parse,
  'autosuggest-highlight/match': match,
};
