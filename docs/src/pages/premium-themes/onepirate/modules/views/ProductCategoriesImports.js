import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/ButtonBase': ButtonBase,
  '@material-ui/core/Container': Container,
  '../components/Typography': Typography,
};
