import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Hidden': Hidden,
  '@material-ui/core/Container': Container,
  '../components/Typography': Typography,
  '../components/TextField': TextField,
  '../components/Snackbar': Snackbar,
  '../components/Button': Button,
};
