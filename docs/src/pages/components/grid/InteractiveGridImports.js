import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

export default {
  react: React,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/FormLabel': FormLabel,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/RadioGroup': RadioGroup,
  '@material-ui/core/Radio': Radio,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/styles': { makeStyles, createStyles },
  'docs/src/modules/components/HighlightedCode': HighlightedCode,
};
