import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/CardMedia': CardMedia,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/GitHub': GitHubIcon,
  '@material-ui/icons/Twitter': TwitterIcon,
};
