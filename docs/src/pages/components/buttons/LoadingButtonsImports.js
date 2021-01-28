import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/lab/LoadingButton';
import SaveIcon from '@material-ui/icons/Save';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/lab/LoadingButton': LoadingButton,
  '@material-ui/icons/Save': SaveIcon,
};
