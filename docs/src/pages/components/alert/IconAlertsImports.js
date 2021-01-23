import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/core/Alert';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Alert': Alert,
  '@material-ui/icons/Check': CheckIcon,
  '@material-ui/icons/CheckCircleOutline': CheckCircleOutlineIcon,
};
