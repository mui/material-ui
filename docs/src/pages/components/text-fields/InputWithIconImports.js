import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Input': Input,
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/InputAdornment': InputAdornment,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/Grid': Grid,
  '@material-ui/icons/AccountCircle': AccountCircle,
};
