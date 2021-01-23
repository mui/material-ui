import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/MenuItem': MenuItem,
};
