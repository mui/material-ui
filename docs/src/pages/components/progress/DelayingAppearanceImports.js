import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Fade': Fade,
  '@material-ui/core/Button': Button,
  '@material-ui/core/CircularProgress': CircularProgress,
  '@material-ui/core/Typography': Typography,
};
