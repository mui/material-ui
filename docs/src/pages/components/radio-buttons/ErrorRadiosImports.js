import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Radio': Radio,
  '@material-ui/core/RadioGroup': RadioGroup,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/FormHelperText': FormHelperText,
  '@material-ui/core/FormLabel': FormLabel,
  '@material-ui/core/Button': Button,
};
