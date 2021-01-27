import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Paper from '../components/Paper';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Box': Box,
  '@material-ui/core/styles': { withStyles },
  '../components/Paper': Paper,
};
