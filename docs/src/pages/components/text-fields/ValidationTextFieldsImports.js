import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/styles': { makeStyles, createStyles },
};
