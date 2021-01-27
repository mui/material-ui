import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Card': Card,
  '@material-ui/core/CardActions': CardActions,
  '@material-ui/core/CardContent': CardContent,
  '@material-ui/core/CardMedia': CardMedia,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Typography': Typography,
  'docs/src/modules/utils/i18n': { useTranslate },
};
