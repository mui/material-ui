import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Container': Container,
  '@material-ui/core/styles': { withStyles },
  '../components/Typography': Typography,
};
