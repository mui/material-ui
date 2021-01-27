import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Container': Container,
  '../components/Button': Button,
  '../components/Typography': Typography,
};
