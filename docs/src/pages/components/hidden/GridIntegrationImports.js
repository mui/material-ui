import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Hidden': Hidden,
  '@material-ui/core/withWidth': withWidth,
  '@material-ui/core/Typography': Typography,
};
