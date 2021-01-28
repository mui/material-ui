import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/LinearProgress': LinearProgress,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Box': Box,
};
