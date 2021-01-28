import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/Chip': Chip,
};
