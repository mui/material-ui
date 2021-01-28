import * as React from 'react';
import useAutocomplete from '@material-ui/core/useAutocomplete';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/useAutocomplete': useAutocomplete,
  '@material-ui/core/styles': { makeStyles, createStyles },
};
