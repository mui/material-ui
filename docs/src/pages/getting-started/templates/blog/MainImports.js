import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Divider': Divider,
  './Markdown': Markdown,
};
