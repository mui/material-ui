import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, rgbToHex } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/styles': { makeStyles, useTheme, rgbToHex },
};
