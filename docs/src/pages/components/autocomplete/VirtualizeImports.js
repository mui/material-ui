import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import { Typography } from '@material-ui/core';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/Autocomplete': Autocomplete,
  '@material-ui/core/useMediaQuery': useMediaQuery,
  '@material-ui/core/ListSubheader': ListSubheader,
  '@material-ui/core/styles': { useTheme, makeStyles },
  'react-window': { VariableSizeList },
  '@material-ui/core': { Typography },
};
