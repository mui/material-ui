import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/Autocomplete': Autocomplete,
  '@material-ui/icons/LocationOn': LocationOnIcon,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/styles': { makeStyles, createStyles },
  'autosuggest-highlight/parse': parse,
  'lodash/throttle': throttle,
};
