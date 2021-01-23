import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Popper': Popper,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Fade': Fade,
  '@material-ui/core/Paper': Paper,
};
