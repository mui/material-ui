import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Popover': Popover,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Button': Button,
};
