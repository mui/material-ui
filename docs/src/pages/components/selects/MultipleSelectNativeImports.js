import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/Select': Select,
};
